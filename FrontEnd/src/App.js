import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
// import SignUp from "./pages/auth/SignUp";
import Join from "./pages/user/Join";
import JoinAgree from "./pages/user/JoinAgree"
import JoinType from "./pages/user/JoinType";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signUp" element={<SignUp />} /> */}
          <Route path="/join" element={<Join />} />
          <Route path="/join/agree" element={<JoinAgree />} />
          <Route path="/join/type" element={<JoinType />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
