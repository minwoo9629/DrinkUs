import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Join from "./pages/auth/Join";
import { Provider } from "react-redux";
import store from "./store/store";
import FindPassword from "./pages/auth/FindPassword";
import FindId from "./pages/auth/FindId";
import SocialLogin from "./pages/auth/SocialLogin";
import MyPage from "./pages/auth/MyPage";
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
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
