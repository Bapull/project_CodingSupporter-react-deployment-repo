/* import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ChatRoom = {
  id: number;
  receiver: string;
  sender: string;
  noteName: string;
};

type DetailProps = {
  chatroom: ChatRoom;
  id: number;
};

const Alarm: React.FC<DetailProps> = () => {
  const baseUrl = import.meta.env.VITE_BACK_URL;
  // 채팅방들의 정보
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  // 유저 아이디
  const [id, setId] = useState(0);
  // 알림 여부
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  // 채팅방 보여주기 여부
  const [showChatRooms, setShowChatRooms] = useState(false);

  // 클릭했을 때 채팅방들 보여주기
  const getChatRoom = async () => {
    try {
      const response = await fetch(`${baseUrl}/chat-room`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setChatRoom(data.data);
      setId(data.myId);
    } catch (error) {
      console.error("Error fetching chat room:", error);
    }
  };

  const toggleChatRooms = () => {
    setShowChatRooms(!showChatRooms);
  };

  // 채팅 오면 알람

  return (
    <div className="alarm">
      {showChatRooms ? (
        <>
          {chatRoom.map((item) => (
            <>
              {item.sender === `${id}` ? (
                <div style={{ backgroundColor: "gray", border: "1px solid" }}>
                  <div>내가 보낸 알림</div>
                  <div>item.id: {item.id}</div>
                  <div>item.receiver: {item.receiver}</div>
                  <div>item.sender: {item.sender}</div>
                  <button onClick={joinChat}>채팅 참가</button>
                </div>
              ) : (
                <div style={{ backgroundColor: "orange", border: "1px solid" }}>
                  <div>받은 알람</div>
                  <div>item.id: {item.id}</div>
                  <div>item.receiver: {item.receiver}</div>
                  <div>item.sender: {item.sender}</div>
                  <button onClick={joinChat}>채팅 참가</button>
                </div>
              )}
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Alarm;
 */
