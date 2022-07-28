import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
// import SignUp from "./pages/auth/SignUp";
import { Provider } from "react-redux";
import store from "./store/store";
import FindPassword from "./pages/auth/FindPassword";
import Result from "./components/Result";
import FindId from "./pages/auth/FindId";
import Join from "./pages/user/Join";
import JoinAgree from "./pages/auth/JoinAgree"
import JoinType from "./pages/auth/JoinType";
// import Profile from "./pages/user/profile";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signUp" element={<SignUp />} /> */}
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/result" element={<Result />} />
            <Route path="/findId" element={<FindId/>}/>
            <Route path="/join" element={<Join />} />
            <Route path="/join/agree" element={<JoinAgree />} />
            <Route path="/join/type" element={<JoinType />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
