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
import Reports from "./pages/Reports";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/result" element={<Result />} />
            <Route path="/findId" element={<FindId/>}/>
            <Route path="/join" element={<Join />} />
            <Route path="/join/agree" element={<JoinAgree />} />
            <Route path="/join/type" element={<JoinType />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
