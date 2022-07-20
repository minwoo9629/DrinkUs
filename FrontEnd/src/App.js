import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
// import SignUp from "./pages/auth/SignUp";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signUp" element={<SignUp />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
