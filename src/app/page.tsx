'use client'

import { useCallback,useState } from 'react'
import LogoIntro from '@/components/LogoIntro'
import BusinessHomepage from '@/components/BusinessHomepage'

export default function Home() {
  const [showIntro,setShowIntro]=useState(true)
  const finishIntro=useCallback(()=>setShowIntro(false),[])
  return <>{showIntro&&<LogoIntro onComplete={finishIntro}/>}<BusinessHomepage/></>
}
