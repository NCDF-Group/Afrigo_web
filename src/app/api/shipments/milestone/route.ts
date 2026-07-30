import { jsonError,requireUser } from '@/lib/serverAuth'
import { sendTransactionalEmail } from '@/lib/transactionalEmail'
import { rateLimit } from '@/lib/rateLimit'

const milestones:Record<string,number>={Assigned:5,'Picked Up':20,'In Transit':45,'Customs Clearance':70,Cleared:85,Delivered:100}
const sequence=Object.keys(milestones)
export async function POST(request:Request){
 try{
  rateLimit(request,'shipment-milestone',30)
  const{user,admin}=await requireUser(request),input=await request.json(),ref=admin.db.collection('shipments').doc(String(input.shipmentId||'')),shipment=await ref.get(),data=shipment.data(),status=String(input.status||'')
  if(!shipment.exists||data?.exporterId!==user.id)return Response.json({ok:false,error:'Shipment not found'},{status:404})
  if(!(status in milestones))return Response.json({ok:false,error:'Invalid shipment milestone'},{status:400})
  const current=milestones[data?.status]||0,next=milestones[status]
  if(next<=current)return Response.json({ok:false,error:'Shipment milestones cannot move backward or repeat'},{status:409})
  if(sequence.indexOf(status)!==sequence.indexOf(data?.status)+1)return Response.json({ok:false,error:`Complete ${sequence[sequence.indexOf(data?.status)+1]||'the next milestone'} first`},{status:409})
  const contractRef=admin.db.collection('contracts').doc(String(data?.contractId||'')),contract=await contractRef.get()
  if(!contract.exists||contract.data()?.paymentStatus!=='paid')return Response.json({ok:false,error:'A paid contract is required before shipment updates'},{status:409})
  const now=new Date(),updates={status,progress:next,trackingNumber:String(input.trackingNumber||data?.trackingNumber||'').slice(0,100),carrier:String(input.carrier||data?.carrier||'DHL').slice(0,100),updatedAt:now}
  await admin.db.runTransaction(async transaction=>{transaction.update(ref,updates);if(status==='Delivered')transaction.update(contractRef,{status:'completed',completedAt:now,payoutStatus:contract.data()?.payoutStatus||'pending',updatedAt:now})})
  const profiles=await Promise.all([admin.db.collection('users').doc(data.buyerId).get(),admin.db.collection('users').doc(data.supplierId).get()]),emails=profiles.map(profile=>String(profile.data()?.email||'')).filter(Boolean),notice=await sendTransactionalEmail(emails,`Shipment ${shipment.id.slice(0,8)}: ${status}`,`<p>Your Afrigo shipment is now <strong>${status}</strong>.</p>`)
  await admin.db.collection('activityLogs').add({actorId:user.id,type:'shipment_update',label:`Shipment ${status}`,detail:shipment.id,role:'Exporter',notificationSent:notice.sent,createdAt:now})
  return Response.json({ok:true,status,contractCompleted:status==='Delivered',notificationSent:notice.sent})
 }catch(error){return jsonError(error)}
}
