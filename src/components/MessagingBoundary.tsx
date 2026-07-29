'use client'
import React from 'react'

export default class MessagingBoundary extends React.Component<React.PropsWithChildren,{failed:boolean}>{
 state={failed:false}
 static getDerivedStateFromError(){return{failed:true}}
 componentDidCatch(error:unknown){console.error('Messaging panel error',error)}
 render(){
  if(this.state.failed)return <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><p className="font-bold">Messages are temporarily unavailable</p><p className="mt-1">Your dashboard and trade records are safe. Refresh to reconnect messaging.</p><button onClick={()=>this.setState({failed:false})} className="mt-3 rounded-xl bg-amber-900 px-4 py-2 font-bold text-white">Reconnect</button></div>
  return this.props.children
 }
}
