'use client'
import { useEffect,useMemo,useState } from 'react'
import { firebaseAuth } from '@/lib/firebaseClient'
import { authenticatedFetch } from '@/lib/apiClient'
import { enableMessageNotifications } from '@/lib/notificationsClient'
import ContractChat,{type ChatTarget} from './ContractChat'

export default function ChatInbox(){
 const[items,setItems]=useState<any[]>([])
 const[search,setSearch]=useState('')
 const[archived,setArchived]=useState(false)
 const[chat,setChat]=useState<ChatTarget|null>(null)
 const[notice,setNotice]=useState('')
 const uid=firebaseAuth?.currentUser?.uid||''

 useEffect(()=>{
  if(!uid)return
  let active=true
  const load=async()=>{
   try{
    const result=await authenticatedFetch('/api/conversations')
    if(active)setItems(result.conversations||[])
   }catch(cause:any){if(active)setNotice(cause.message)}
  }
  void load()
  const timer=window.setInterval(()=>void load(),3000)
  return()=>{active=false;window.clearInterval(timer)}
 },[uid])

 const visible=useMemo(()=>items.filter(item=>Boolean(item.archived)===archived&&`${item.title||''} ${item.lastMessage||''}`.toLowerCase().includes(search.toLowerCase())),[items,search,archived])
 const isUnread=(item:any)=>Boolean(item.lastSenderId&&item.lastSenderId!==uid&&Number(item.lastMessageAt)>Number(item.readAt))
 const unread=items.filter(isUnread).length
 const archive=async(item:any,value:boolean)=>{
  try{
   await authenticatedFetch('/api/conversations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive',conversationId:item.id,archived:value})})
   setItems(current=>current.map(entry=>entry.id===item.id?{...entry,archived:value}:entry))
  }catch(cause:any){setNotice(cause.message)}
 }

 return <div className="mt-6 rounded-2xl border bg-slate-50/70 p-4">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
   <div><h3 className="font-black text-[var(--afrigo-primary-green)]">Messages {unread>0&&<span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{unread}</span>}</h3><p className="text-xs text-slate-500">Contract and RFQ conversations</p></div>
   <div className="flex flex-wrap gap-2"><button onClick={()=>void enableMessageNotifications().then(()=>setNotice('Browser notifications enabled')).catch(error=>setNotice(error.message))} className="rounded-xl border bg-white px-3 py-2 text-xs font-bold transition hover:-translate-y-0.5">Enable notifications</button><button onClick={()=>setArchived(value=>!value)} className="rounded-xl border bg-white px-3 py-2 text-xs font-bold">{archived?'Active chats':'Archived'}</button></div>
  </div>
  <input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search conversations" aria-label="Search conversations" className="mt-3 w-full rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:border-[var(--afrigo-primary-green)]"/>
  {notice&&<p className="mt-2 text-xs text-slate-600">{notice}</p>}
  <div className="mt-3 grid gap-2">{visible.map(item=><div key={item.id} className={`flex items-center gap-3 rounded-xl border bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md ${isUnread(item)?'border-[var(--afrigo-secondary-gold)]':''}`}>
   <button onClick={()=>setChat({id:item.id,title:item.title||'Conversation'})} className="min-w-0 flex-1 text-left"><div className="flex items-center gap-2"><span className="truncate text-sm font-bold">{item.title||'Conversation'}</span>{isUnread(item)&&<span className="h-2 w-2 rounded-full bg-red-500"/>}</div><p className={`truncate text-xs ${isUnread(item)?'font-semibold text-slate-800':'text-slate-500'}`}>{item.lastMessage||'No messages yet'}</p></button>
   <button onClick={()=>void archive(item,!archived)} aria-label={archived?'Restore conversation':'Archive conversation'} className="rounded-lg border px-2 py-1 text-xs">{archived?'Restore':'Archive'}</button>
  </div>)}{!visible.length&&<p className="py-4 text-center text-sm text-slate-500">No {archived?'archived ':''}conversations found.</p>}</div>
  {chat&&<ContractChat conversation={chat} onClose={()=>setChat(null)}/>}
 </div>
}
