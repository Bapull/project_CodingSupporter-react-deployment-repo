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

import Home from './pages/Home';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import MenTChat from './pages/MenTChat';
import Folder from './pages/Folder';
import User from './pages/User';
import Setting from './pages/Settings';
import HeadTitle from './components/HeadTitle';
import NavBar from './components/Navbar';
import UserTest from "./test/UserTest";
import ChatTest from "./test/ChatTest";
function App() {
  return (
    <Provider store={store}>
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
          {/* {테스트 페이지} */}
          <Route path="/user-test" element={<UserTest />} />
          <Route path="/chat-test" element={<ChatTest />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
