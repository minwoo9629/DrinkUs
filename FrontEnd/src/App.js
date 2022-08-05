import "./App.css";
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
import Profile from "./pages/auth/Profile";
import Reports from "./pages/auth/Reports";
import SocialLogin from "./pages/auth/SocialLogin";
import MyPage from "./pages/auth/MyPage";
import DrinkLive from "./pages/room/DrinkLive";
import CreateRoom from "./pages/room/CreateRoom";
import Rooms from "./pages/room/Rooms";
import Daily from "./pages/Daily";
import RoomDetail from "./pages/room/RoomDetail";
import Calendar from "./pages/calendarcommunity/Calendar";
// import CalendarList from "./pages/calendarcommunity/CalendarList";
import CreateCalendar from "./pages/calendarcommunity/CreateCalendar";
import EditProfile from "./pages/auth/mypage/EditProfile";
import EditPassword from "./pages/auth/mypage/EditPassword";
import EditInterest from "./pages/auth/mypage/EditInterest";
import MyArticle from "./pages/auth/mypage/MyArticle";
import MySchedule from "./pages/auth/mypage/MySchedule";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Routes>
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/oauth2/redirect" element={<SocialLogin />} />
              <Route path="/live" element={<DrinkLive />} />
              <Route path="/createroom" element={<CreateRoom />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/rooms/1" element={<RoomDetail />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/calendar/list" element={<CalendarList />} /> */}
              <Route path="/calendar/create" element={<CreateCalendar />} />
              <Route path="/user" element={<MyPage />}>
                <Route index element={<EditProfile />} />
                <Route path="edit/profile" element={<EditProfile />} />
                <Route path="edit/password" element={<EditPassword />} />
                <Route path="edit/interest" element={<EditInterest />} />
                <Route path="article" element={<MyArticle />} />
                <Route path="schedule" element={<MySchedule />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
