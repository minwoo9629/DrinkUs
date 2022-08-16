import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import FindPassword from "./pages/auth/find/FindPassword";
import FindId from "./pages/auth/find/FindId";
import Join from "./pages/auth/join/Join";
import JoinAgree from "./pages/auth/join/JoinAgree";
import JoinType from "./pages/auth/join/JoinType";
import SocialLogin from "./pages/auth/SocialLogin";
import MyPage from "./pages/auth/MyPage";
import DrinkLive from "./pages/room/DrinkLive";
import CreateRoom from "./pages/room/CreateRoom";
import RoomDetail from "./pages/room/RoomDetail";
import RoomList from "./pages/room/RoomList";
import EditProfile from "./pages/auth/mypage/EditProfile";
import EditPassword from "./pages/auth/mypage/EditPassword";
import EditInterest from "./pages/auth/mypage/EditInterest";
import MyArticle from "./pages/auth/mypage/MyArticle";
import MySchedule from "./pages/auth/mypage/MySchedule";
import { PersistGate } from "redux-persist/integration/react";
import Admin from "./pages/admin/Admin";
import VideoRoomComponent from "./pages/room/openVidu/VideoRoomComponent";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/error/NotFound";

import Community from "./pages/community/Community";
import firebase from "firebase";

function App() {
  useEffect(async () => {
    console.log("useEffect")
    const config = {
      apiKey: "AIzaSyCeFLVbfX4Lif9cRTFuHXfTnhbJo1rojo8",
      authDomain: "drinkus-1b761.firebaseapp.com",
      projectId: "drinkus-1b761",
      storageBucket: "drinkus-1b761.appspot.com",
      messagingSenderId: "643076771453",
      appId: "1:643076771453:web:21d4711a8a13ded10cab14"
    };
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
  
    await messaging.requestPermission()
      .then(async () => {
        console.log('fcm 허가!');
        const fcmToken = await messaging.getToken({ vapidKey: 'BL81pS7Np99KSOR8APDua0Dx46ye35ZZZ6X37oLhAYe0Xp7g2hcncOPMhTw1TOg7QdcnlFhyu374brHtC4L37do' });
        window.sessionStorage.setItem('FCM_TOKEN', fcmToken)
        console.log(fcmToken);
        //토큰을 받는 함수를 추가!
      })
      .catch(function (err) {
        console.log('fcm에러 : ', err);
      })
    messaging.onTokenRefresh(() => {
      messaging.getToken({ vapidKey: 'BL81pS7Np99KSOR8APDua0Dx46ye35ZZZ6X37oLhAYe0Xp7g2hcncOPMhTw1TOg7QdcnlFhyu374brHtC4L37do' })
        .then(function (refreshedToken) {
          sessionStorage.setItem('FCM_TOKEN', refreshedToken) //토큰이 재 생성될 경우 다시 저장
          console.log('Token refreshed.');
        }).catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    messaging.onMessage((payload) => {
      const title  =  payload.data.content;
      console.log("댓글확인 "+title);
      alert(title);
    })
  }, [])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/community" element={<Community />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join/agree" element={<JoinAgree />} />
              <Route path="/join/type" element={<JoinType />} />
              <Route path="/join" element={<Join />} />
              <Route path="/findId" element={<FindId />} />
              <Route path="/findPassword" element={<FindPassword />} />
              <Route path="/findId" element={<FindId />} />
              <Route path="/join" element={<Join />} />
              <Route path="/join/agree" element={<JoinAgree />} />
              <Route path="/join/type" element={<JoinType />} />
              <Route path="/social/redirect" element={<SocialLogin />} />
              <Route
                path="/live"
                element={<PrivateRoute component={<DrinkLive />} />}
              />
              <Route
                path="/createroom"
                element={<PrivateRoute component={<CreateRoom />} />}
              />
              <Route
                path="/rooms"
                element={<PrivateRoute component={<RoomList />} />}
              />
              <Route
                path="/rooms/:roomId"
                element={<PrivateRoute component={<RoomDetail />} />}
              />

              <Route
                path="/community"
                element={<PrivateRoute component={<Community />} />}
              />
              <Route
                path="/user"
                element={<PrivateRoute component={<MyPage />} />}
              >
                <Route index element={<EditProfile />} />
                <Route path="edit/profile" element={<EditProfile />} />
                <Route path="edit/password" element={<EditPassword />} />
                <Route path="edit/interest" element={<EditInterest />} />
                <Route path="article" element={<MyArticle />} />
                <Route path="schedule" element={<MySchedule />} />
              </Route>
              <Route
                path="/admin"
                element={<PrivateRoute component={<Admin />} />}
              />
              <Route
                path="/room/detail"
                element={<PrivateRoute component={<VideoRoomComponent />} />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
