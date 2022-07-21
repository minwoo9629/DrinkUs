import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/auth/Login";
// import SignUp from "./pages/auth/SignUp";
import Join from "./pages/user/Join";
import JoinAgree from "./pages/user/JoinAgree"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signUp" element={<SignUp />} /> */}
          <Route path="/join" element={<Join />} />
          <Route path="/join/agree" element={<JoinAgree />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
