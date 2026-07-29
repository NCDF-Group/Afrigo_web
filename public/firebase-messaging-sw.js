importScripts('https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/12.6.0/firebase-messaging-compat.js')
firebase.initializeApp({
 apiKey:'AIzaSyC6vjjnDyzHV5H98CKwu_cIb1gC6EJWS7M',
 authDomain:'afrigo-62e9b.firebaseapp.com',
 projectId:'afrigo-62e9b',
 storageBucket:'afrigo-62e9b.firebasestorage.app',
 messagingSenderId:'238875658843',
 appId:'1:238875658843:web:a4e509edaa716c9e838d7e'
})
firebase.messaging().onBackgroundMessage(payload=>{
 const notification=payload.notification||{}
 self.registration.showNotification(notification.title||'New Afrigo message',{body:notification.body||'Open Afrigo to view it',icon:'/favicon.ico',data:{url:payload.fcmOptions?.link||'/dashboard'}})
})
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow(event.notification.data?.url||'/dashboard'))})
