importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCeFLVbfX4Lif9cRTFuHXfTnhbJo1rojo8",
    authDomain: "drinkus-1b761.firebaseapp.com",
    projectId: "drinkus-1b761",
    storageBucket: "drinkus-1b761.appspot.com",
    messagingSenderId: "643076771453",
    appId: "1:643076771453:web:21d4711a8a13ded10cab14"
  };
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = '알림';
    const notificationOptions = {
      body: payload.data.content,
    };
    console.log("payload"+payload.data.content);
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});