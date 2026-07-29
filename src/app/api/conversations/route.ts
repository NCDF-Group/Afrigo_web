import { FieldValue } from 'firebase-admin/firestore'
import { jsonError, requireUser } from '@/lib/serverAuth'
import { rateLimit } from '@/lib/rateLimit'
import { sendTransactionalEmail } from '@/lib/transactionalEmail'

const clean=(value:unknown,max=2000)=>String(value||'').trim().slice(0,max)
const safeId=(value:unknown)=>clean(value,180).replace(/[^a-zA-Z0-9_-]/g,'')

async function notify(admin:any,participantIds:string[],senderId:string,senderName:string,preview:string,conversationId:string){
  const recipients=participantIds.filter(id=>id!==senderId)
  if(!recipients.length)return
  const profiles=await Promise.all(recipients.map(id=>admin.db.collection('users').doc(id).get()))
  const emails=profiles.map(item=>item.data()?.email).filter(Boolean)
  const tokens=[...new Set(profiles.flatMap(item=>item.data()?.notificationTokens||[]).filter(Boolean))] as string[]
  await Promise.allSettled([
    emails.length?sendTransactionalEmail(emails,`New message from ${senderName}`,`<p>You have a new Afrigo message.</p><p>${preview.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[c]!))}</p>`):Promise.resolve(),
    tokens.length?admin.messaging.sendEachForMulticast({tokens,notification:{title:`New message from ${senderName}`,body:preview},webpush:{fcmOptions:{link:`${process.env.NEXT_PUBLIC_SITE_URL||'https://afrigo.netlify.app'}/dashboard?conversation=${conversationId}`}}}):Promise.resolve()
  ])
}

export async function POST(request:Request){
 try{
  rateLimit(request,'conversations',60)
  const {user,admin}=await requireUser(request),input=await request.json(),action=clean(input.action,40),now=new Date(),db=admin.db
  let conversationId=safeId(input.conversationId)
  if(action==='open-contract'){
   const contractId=safeId(input.contractId),contract=await db.collection('contracts').doc(contractId).get(),data=contract.data()
   if(!contract.exists)return Response.json({ok:false,error:'Contract not found'},{status:404})
   const participantIds=[data?.buyerId,data?.supplierId,data?.exporterId].filter(Boolean)
   if(!participantIds.includes(user.id))return Response.json({ok:false,error:'You are not a party to this contract'},{status:403})
   conversationId=contractId
   await db.collection('conversations').doc(conversationId).set({kind:'contract',contractId,title:`Contract ${contractId.slice(0,8)}`,participantIds,typing:{},createdAt:data?.createdAt||now,updatedAt:now},{merge:true})
   return Response.json({ok:true,conversation:{id:conversationId,title:`Contract ${contractId.slice(0,8)}`}})
  }
  if(action==='open-rfq'){
   const rfqId=safeId(input.rfqId),rfq=await db.collection('rfqs').doc(rfqId).get(),data=rfq.data()
   if(!rfq.exists||data?.status!=='Open')return Response.json({ok:false,error:'This RFQ is not open for inquiries'},{status:409})
   const role=user.user_metadata.role
   const sellerId=role==='Seller'?user.id:safeId(input.sellerId)
   if(role!=='Seller'&&!(role==='Buyer'&&data?.buyerId===user.id))return Response.json({ok:false,error:'Only this Buyer and Sellers may open an inquiry'},{status:403})
   if(!sellerId)return Response.json({ok:false,error:'Seller is required'},{status:400})
   conversationId=`rfq_${rfqId}_${sellerId}`
   const participantIds=[data?.buyerId,sellerId].filter(Boolean)
   await db.collection('conversations').doc(conversationId).set({kind:'rfq',rfqId,title:`RFQ: ${clean(data?.title,100)}`,participantIds,typing:{},createdAt:now,updatedAt:now},{merge:true})
   return Response.json({ok:true,conversation:{id:conversationId,title:`RFQ: ${clean(data?.title,100)}`}})
  }
  const ref=db.collection('conversations').doc(conversationId),snapshot=await ref.get(),conversation=snapshot.data()
  if(!snapshot.exists||!conversation?.participantIds?.includes(user.id))return Response.json({ok:false,error:'Conversation not found or access denied'},{status:403})
  if(action==='message'){
   const message=clean(input.message)
   if(!message)return Response.json({ok:false,error:'Message is required'},{status:400})
   const messageRef=ref.collection('messages').doc(),senderName=clean(user.user_metadata.display_name||user.email,100)
   await db.runTransaction(async(tx:any)=>{tx.set(messageRef,{type:'text',senderId:user.id,senderName,senderRole:user.user_metadata.role,message,createdAt:now});tx.update(ref,{lastMessage:message,lastSenderId:user.id,lastMessageAt:now,updatedAt:now,[`archivedBy.${user.id}`]:false})})
   void notify(admin,conversation.participantIds,user.id,senderName,message.slice(0,140),conversationId)
  }else if(action==='mark-read')await ref.update({[`readAtBy.${user.id}`]:now})
  else if(action==='archive')await ref.update({[`archivedBy.${user.id}`]:Boolean(input.archived),updatedAt:now})
  else if(action==='register-token'){
   const token=clean(input.token,4096)
   if(!token)return Response.json({ok:false,error:'Notification token is required'},{status:400})
   await db.collection('users').doc(user.id).set({notificationTokens:FieldValue.arrayUnion(token),updatedAt:now},{merge:true})
  }else return Response.json({ok:false,error:'Unsupported conversation action'},{status:400})
  return Response.json({ok:true})
 }catch(error){return jsonError(error)}
}
