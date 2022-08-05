import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import FindPassword from "./pages/auth/find/FindPassword";
import Result from "./components/Result";
import FindId from "./pages/auth/find/FindId";
import Join from "./pages/auth/Join";
import JoinAgree from "./pages/auth/JoinAgree"
import JoinType from "./pages/auth/JoinType";
import Profile from "./pages/auth/Profile";
import Reports from "./pages/auth/Reports";
import SocialLogin from "./pages/auth/SocialLogin";
import MyPage from "./pages/auth/MyPage";
import DrinkLive from "./pages/room/DrinkLive"
import CreateRoom from "./pages/room/CreateRoom";
import Rooms from "./pages/room/Rooms";
import Daily from "./pages/Daily";
import RoomDetail from './pages/room/RoomDetail'
import Calendar from "./pages/calendarcommunity/Calendar";
// import CalendarList from "./pages/calendarcommunity/CalendarList";
import CreateCalendar from "./pages/calendarcommunity/CreateCalendar";
function App() {
  return (
    <Provider store={store}>
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
            <Route path="/result" element={<Result />} />
            <Route path="/findId" element={<FindId/>}/>
            <Route path="/join" element={<Join />} />
            <Route path="/join/agree" element={<JoinAgree />} />
            <Route path="/join/type" element={<JoinType />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/oauth2/redirect" element={<SocialLogin />} />
            <Route path="/user/edit" element={<MyPage />} />
            <Route path="/live" element={<DrinkLive />} />
            <Route path="/createroom" element={<CreateRoom />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/rooms/1" element={<RoomDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route path="/calendar/list" element={<CalendarList />} /> */}
            <Route path="/calendar/create" element={<CreateCalendar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
