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
	const title  =  payload.data.title;
	const options  = {
		body: payload.data.message,
	};
    console.log(payload);
	return self.registration.showNotification(title, options);
})