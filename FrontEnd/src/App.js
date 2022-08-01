import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Join from "./pages/auth/Join";
import { Provider } from "react-redux";
import store from "./store/store";
import FindPassword from "./pages/auth/find/FindPassword";
import FindId from "./pages/auth/find/FindId";
import SocialLogin from "./pages/auth/SocialLogin";
import MyPage from "./pages/auth/MyPage";
import DrinkLive from "./pages/room/DrinkLive"
import CreateRoom from "./pages/room/CreateRoom";
import Rooms from "./pages/room/Rooms";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/findId" element={<FindId />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/oauth2/redirect" element={<SocialLogin />} />
            <Route path="/user/edit" element={<MyPage />} />
            <Route path="/live" element={<DrinkLive />} />
            <Route path="/createroom" element={<CreateRoom />} />
            <Route path="/rooms" element={<Rooms />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
