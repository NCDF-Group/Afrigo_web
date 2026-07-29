import { getMessaging,getToken } from 'firebase/messaging'
import { firebaseApp } from './firebaseClient'
import { authenticatedFetch } from './apiClient'

export async function enableMessageNotifications(){
 if(!firebaseApp||!('Notification'in window)||!('serviceWorker'in navigator))throw new Error('Browser notifications are unavailable on this device')
 const permission=await Notification.requestPermission()
 if(permission!=='granted')throw new Error('Notification permission was not granted')
 const vapidKey=process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
 if(!vapidKey)throw new Error('Web push is ready, but NEXT_PUBLIC_FIREBASE_VAPID_KEY must be added in Netlify')
 const registration=await navigator.serviceWorker.register('/firebase-messaging-sw.js')
 const token=await getToken(getMessaging(firebaseApp),{vapidKey,serviceWorkerRegistration:registration})
 if(!token)throw new Error('This browser could not create a notification token')
 await authenticatedFetch('/api/conversations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'register-token',token})})
 return true
}
