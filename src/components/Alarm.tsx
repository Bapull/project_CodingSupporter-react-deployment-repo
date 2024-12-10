import useSWR from "swr";
import { useState } from "react";
import { useNotification } from "../hooks/notification";

const Alarm = () => {
  const { notification, isLoading } = useNotification();
  const [show, setShow] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleMove = (link: string) => {
    window.location.href = link;
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="alarm" onClick={() => setShow(!show)}>
      <img src="/images/Bell.png" alt="bell" style={{ width: "20px" }} />
      <div
        className="alarm-list"
        style={{
          scale: `${show ? "1" : "0"}`,
        }}
      >
        {notification?.map((item) => (
          <div key={item.id} className="alarm-item">
            <p>{item.message}</p>

            {/* <p>{item.userId}님이 채팅방에 참여했습니다.</p> */}
            <button onClick={() => handleMove(item.link)} className="move-btn">
              참가하기
            </button>
            <p>{new Date(item.timestamp).toLocaleString()}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;
