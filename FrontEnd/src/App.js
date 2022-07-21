import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Provider } from "react-redux";
import store from "./store/store";
import FindPassword from "./pages/auth/FindPassword";
import Result from "./components/Result";
import FindId from "./pages/auth/FindId";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/result" element={<Result />} />
            <Route path="/findId" element={<FindId/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
