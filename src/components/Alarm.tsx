import { useState } from "react";
import { useNotification } from "../hooks/notification";

interface AlarmProps {
  chatroom?: {
    id: number;
    receiver: string;
    sender: string;
    noteName: string;
  };
}

const Alarm: React.FC<AlarmProps> = ({ chatroom }) => {
  const { notification, isLoading } = useNotification();
  const [show, setShow] = useState(false);

  const baseUrl = import.meta.env.VITE_BACK_URL;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleMove = (link: string) => {
    if (chatroom) {
      window.location.href = `/chatroom/${chatroom.id}`;
    } else {
      window.location.href = link;
    }
  };

  const getChatRoom = () => {
    fetch(`${baseUrl}/chat-room`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });
      // 삭제 후 알림 목록 갱신 로직 추가 필요
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };

  return (
    <div className="alarm" onClick={() => setShow(!show)}>
      <img src="/images/Bell.png" alt="bell" style={{ width: "20px" }} />
      <div
        className="alarm-list"
        style={{
          scale: `${show ? "1" : "0"}`,
        }}
        onClick={getChatRoom}
      >
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
