import "../styles/menTChat.css";
import { useLocation } from "react-router-dom";
import IncorrectNote from "../components/IncorrectNote";

function MenTChat() {
  const location = useLocation();

  return (
    <div className="mentor-chat">
      <div className="wrapper">
        <div className="mentor-chat-content-left">
          {/* <IncorrectNote data={noteData} /> */}아 몰랑 여긴 코드
        </div>
        <div className="mentor-chat-content-right">ddd</div>
      </div>
    </div>
  );
}

export default MenTChat;
