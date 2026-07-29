import { jsonError,requireUser } from '@/lib/serverAuth'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(request:Request){
 try{
  rateLimit(request,'purchase',10)
  const{user,admin}=await requireUser(request)
  if(user.user_metadata.role!=='Buyer')return Response.json({ok:false,error:'Buyer role required'},{status:403})
  const input=await request.json(),lotId=String(input.lotId||''),quantity=Number(input.quantity),db=admin.db,lotRef=db.collection('lots').doc(lotId),contractRef=db.collection('contracts').doc()
  if(!lotId||!Number.isFinite(quantity)||quantity<=0)return Response.json({ok:false,error:'Choose a valid quantity'},{status:400})
  await db.runTransaction(async transaction=>{
   const lot=await transaction.get(lotRef),data=lot.data()
   if(!lot.exists||data?.status!=='active'||Number(data?.quantity)<quantity)throw new Error('This inventory quantity is no longer available')
   if(data?.ownerId===user.id)throw new Error('You cannot purchase your own inventory')
   const price=Number(data?.price)
   if(!Number.isFinite(price)||price<=0)throw new Error('The Seller inventory price is invalid')
   const remaining=Number(data.quantity)-quantity,now=new Date()
   transaction.set(contractRef,{inventoryLotId:lot.id,productTitle:data.title,quantity,buyerId:user.id,supplierId:data.ownerId,amount:price*quantity,currency:data.currency||'NGN',status:'pending',paymentStatus:'not_started',payoutStatus:'pending',source:'marketplace',createdAt:now,updatedAt:now})
   transaction.update(lotRef,{quantity:remaining,status:remaining===0?'archived':'active',reservedForContractId:contractRef.id,updatedAt:now})
  })
  await db.collection('activityLogs').add({actorId:user.id,type:'purchase_created',label:'Reserved Seller inventory',detail:contractRef.id,role:'Buyer',createdAt:new Date()})
  return Response.json({ok:true,contractId:contractRef.id})
 }catch(error){return jsonError(error)}
}
