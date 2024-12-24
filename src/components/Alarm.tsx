import { useState } from "react";
import { useNotification } from "../hooks/notification";

type ChatRoom = {
  id: number;
  receiver: string;
  sender: number;
  noteName: string;
};

const Alarm = () => {
  const { notification, isLoading } = useNotification();
  const [show, setShow] = useState(false);
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [id, setId] = useState(0);
  const baseUrl = import.meta.env.VITE_BACK_URL;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getChatRoom = () => {
    fetch(`${baseUrl}/chat-room`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setChatRoom(data.data);
        setId(data.myId);
      });
  };

  const handleMove = (link: string) => {
    window.location.href = link;
  };

  const handleDelete = (id: number) => {
    fetch(`${baseUrl}/notification/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="alarm" onClick={() => setShow(!show)}>
      <img
        src="/images/Bell.png"
        alt="bell"
        style={{ width: "20px" }}
        onClick={getChatRoom}
      />
      <div
        className="alarm-list"
        style={{
          scale: `${show ? "1" : "0"}`,
        }}
      >
        {chatRoom.map((item) => (
          <>
            {id === item.sender ? (
              <div key={item.id} className="alarm-item">
                <p>채팅방을 생성했습니다.</p>
                <div className="alarm-btn-container">
                  <button
                    onClick={() => handleMove(`/mentchat/${item.id}`)}
                    className="move-btn"
                  >
                    참가하기
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ))}
        {notification?.map((item) => (
          <div key={item.id} className="alarm-item">
            <p>{item.message}</p>
            <p>{new Date(item.timestamp).toLocaleString()}</p>

            {/* <p>{item.userId}님이 채팅방에 참여했습니다.</p> */}
            <div className="alarm-btn-container">
              <button
                onClick={() => handleMove(item.link)}
                className="move-btn"
              >
                참가하기
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="delete-btn"
              >
                삭제
              </button>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;
