import { randomUUID } from 'crypto'
import { jsonError, requireUser } from '@/lib/serverAuth'
import { rateLimit } from '@/lib/rateLimit'

const allowed=new Set(['image/jpeg','image/png','image/webp','application/pdf'])
const safe=(value:string)=>value.replace(/[^a-zA-Z0-9._-]/g,'_').slice(-120)

export async function POST(request:Request){
 try{
  rateLimit(request,'chat-attachment',12)
  const {user,admin}=await requireUser(request),form=await request.formData(),conversationId=String(form.get('conversationId')||''),file=form.get('file')
  if(!(file instanceof File)||!allowed.has(file.type)||file.size>10*1024*1024)return Response.json({ok:false,error:'Attach a PDF, JPEG, PNG, or WebP file up to 10 MB'},{status:400})
  const conversationRef=admin.db.collection('conversations').doc(conversationId),conversation=await conversationRef.get(),data=conversation.data()
  if(!conversation.exists||!data?.participantIds?.includes(user.id))return Response.json({ok:false,error:'Conversation access denied'},{status:403})
  const bucket=admin.storage.bucket()
  if(!bucket.name)return Response.json({ok:false,error:'Firebase Storage has not been initialized for this project'},{status:503})
  const path=`chat/${conversationId}/${randomUUID()}-${safe(file.name)}`,buffer=Buffer.from(await file.arrayBuffer())
  await bucket.file(path).save(buffer,{resumable:false,contentType:file.type,metadata:{cacheControl:'private,max-age=0',metadata:{ownerId:user.id,conversationId}}})
  const now=new Date(),messageRef=conversationRef.collection('messages').doc(),senderName=String(user.user_metadata.display_name||user.email||'User').slice(0,100)
  await admin.db.runTransaction(async(tx:any)=>{tx.set(messageRef,{type:'attachment',senderId:user.id,senderName,senderRole:user.user_metadata.role,message:file.name,fileName:file.name,fileType:file.type,fileSize:file.size,storagePath:path,createdAt:now});tx.update(conversationRef,{lastMessage:`Attachment: ${file.name}`,lastSenderId:user.id,lastMessageAt:now,updatedAt:now})})
  return Response.json({ok:true})
 }catch(error:any){
  if(/bucket|storage|404|not found/i.test(error?.message||''))return Response.json({ok:false,error:'Firebase Storage is not initialized. Open Storage in Firebase Console and complete Get Started.'},{status:503})
  return jsonError(error)
 }}

export async function GET(request:Request){
 try{
  const {user,admin}=await requireUser(request),url=new URL(request.url),conversationId=url.searchParams.get('conversationId')||'',messageId=url.searchParams.get('messageId')||''
  const conversation=await admin.db.collection('conversations').doc(conversationId).get()
  if(!conversation.exists||!conversation.data()?.participantIds?.includes(user.id))return Response.json({ok:false,error:'Conversation access denied'},{status:403})
  const message=await conversation.ref.collection('messages').doc(messageId).get(),path=message.data()?.storagePath
  if(!message.exists||!path)return Response.json({ok:false,error:'Attachment not found'},{status:404})
  const [signedUrl]=await admin.storage.bucket().file(path).getSignedUrl({action:'read',expires:Date.now()+10*60*1000})
  return Response.redirect(signedUrl)
 }catch(error){return jsonError(error)}
}
