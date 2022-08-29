importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

const firebaseConfig = {
  
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = "알림";
  const notificationOptions = {
    body: payload.data.content,
  };
  console.log("payload" + payload.data.content);
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
