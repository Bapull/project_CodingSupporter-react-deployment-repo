import "../styles/menTChat.css";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  room: string;
  message: string;
  sender: string;
  senderId: number;
};

function MenTChat() {
  const { state: noteName } = useLocation();

  const { room } = useParams();
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [note, setNote] = useState("");
  const user = useSelector((state: RootState) => state.user.user);

  const baseUrl = import.meta.env.VITE_BACK_URL;

  useEffect(() => {
    // 오답노트 불러오기
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/incorrect-note/s3?note-name=${noteName}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setNote(data.mdFile);
        console.log(data.mdFile);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    // 기존에 저장된 채팅 내역 불러오기
    const fetchMessage = async () => {
      const response = await fetch(`${baseUrl}/message/${room}`, {
        credentials: "include",
      });
      const data = await response.json();
      setMessages(data.data);
    };

    fetchNote();
    fetchMessage();
  }, [room]);

  const joinRoom = () => {
    if (!socket) return;
    socket.emit("join_room", {
      room: room,
      sender: user?.name,
      message: "",
    });
  };

  useEffect(() => {
    setSocket(
      io(`${baseUrl}`, {
        transports: ["websocket"],
        withCredentials: true,
      })
    );
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", handleMessage);

    joinRoom();

    // Clean up the event listener on component unmount
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!socket) return;
    socket.emit("message", {
      room,
      message,
      sender: user?.name,
      senderId: user?.id,
    });
    setMessage("");
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-messages-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleLeaveRoom = () => {
    if (!socket) return;
    socket.emit("leave_room", { room, sender: user?.name, message: "" });
    socket.disconnect();
    setTimeout(() => {
      // 위에 emit이랑 disconnect가 비동기 작업이지만, promise객체를 반환하지 않아서,
      // await을 사용할 수 없다. 그래서 window.location.href를 비동기로 만들어서
      // 소켓을 끊기 전에 메인으로 가는 상황을 방지했다.
      window.location.href = "/";
    }, 100);
  };

  return (
    <div className="mentor-chat">
      <div className="wrapper">
        <div className="mentor-chat-content-left">
          <ReactMarkdown
            className="note-content"
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 style={{ fontWeight: "bold" }} {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 style={{ fontWeight: "bold" }} {...props} />
              ),
            }}
          >
            {note}
          </ReactMarkdown>
        </div>
        <div className="mentor-chat-content-right">
          <div className="mentor-chat-header">
            {/* <h1 className="mentor-chat-header-title">현재 방: {room}</h1> */}
            <button className="leave-button" onClick={handleLeaveRoom}>
              방 나가기
            </button>
          </div>
          <div className="chat-messages-container">
            <ul>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={
                    message.sender === user?.name
                      ? "user-message"
                      : message.sender === "server"
                      ? "server-message"
                      : "mentor-message"
                  }
                >
                  <p className="message-sender">{message.sender}</p>
                  <p className="message-content">{message.message}</p>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // @ts-ignore
              // 크롬에서 2번 입력되는 버그 때문에 onKeyDown 대신 onKeyPress 사용
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     handleSendMessage();
              //   }
              // }}
            />
            <button className="chat-send-button" type="submit">
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MenTChat;
