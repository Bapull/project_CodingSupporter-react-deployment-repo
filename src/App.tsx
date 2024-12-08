import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Provider는 간단히 말하자면 상태를 적용시킬 범위를 지정해줍니다.
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import MenTChat from "./pages/MenTChat";
import Folder from "./pages/Folder";
import User from "./pages/User";
import FirstUser from "./pages/FirstUser";
import Setting from "./pages/Settings";
import HeadTitle from "./components/HeadTitle";
import NavBar from "./components/Navbar";
// import Alarm from "./components/Alarm";

// {테스트 페이지}
import UserTest from "./test/UserTest";
import ChatTest from "./test/ChatTest";
import MentoTest from "./test/MentoTest";
import ChatRoom from "./test/ChatRoom";
import Notification from "./test/Notification";
import GetNoteName from "./test/GetNoteName";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <HeadTitle />
        <NavBar />
        {/* <Alarm /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/mentchat/:room" element={<MenTChat />} />
          <Route path="/folder" element={<Folder />} />
          <Route path="/user" element={<User />} />
          <Route path="/first-user" element={<FirstUser />} />
          <Route path="/setting" element={<Setting />} />
          {/* {테스트 페이지} */}
          <Route path="/user-test" element={<UserTest />} />
          <Route path="/chat-test/:room" element={<ChatTest />} />
          <Route path="/mento-test" element={<MentoTest />} />
          <Route path="/chatroom-test" element={<ChatRoom />} />
          <Route path="/notification-test" element={<Notification />} />
          <Route path="/getname-test" element={<GetNoteName />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
