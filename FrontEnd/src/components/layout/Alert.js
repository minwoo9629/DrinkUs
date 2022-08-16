import React from "react";
import { firebaseApp } from "./firebase";

const firebaseMessaging = firebaseApp.messaging();

firebaseMessaging
  .requestPermission()
  .then(() => {
    return firebaseMessaging.getToken(); //등록 토큰 받기
  })
  .then(function (token) {
    console.log(token); //토큰 출력
  })
  .catch(function (error) {
    console.log("FCM Error : ", error);
  });

firebaseMessaging.onMessage((payload) => {
  console.log(payload.notification.title);
  console.log(payload.notification.body);
});

function Alert() {
  return (
    <div className="App">
      <h1>FCM TEST</h1>
    </div>
  );
}

export default Alert;
