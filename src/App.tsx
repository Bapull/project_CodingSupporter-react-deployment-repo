import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import MenTChat from "./pages/MenTChat";
import Folder from "./pages/Folder";
import User from "./pages/User";
import Setting from "./pages/Setting";
import HeadTitle from "./components/HeadTitle";
import NavBar from "./components/Navbar";

function App() {
  return (
    <Router>
      <HeadTitle />
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/mentchat" element={<MenTChat />} />
        <Route path="/folder" element={<Folder />} />
        <Route path="/user" element={<User />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
