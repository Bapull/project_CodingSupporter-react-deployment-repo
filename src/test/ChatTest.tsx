import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Socket,io } from 'socket.io-client';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  room:string;
  message:string;
  sender:string;
}
const ChatTest = () => {
  const {state:noteName} = useLocation()
  
  const {room}= useParams()
  const [socket,setSocket] = useState<Socket>()
  const [message,setMessage] = useState<string>('')
  const [messages,setMessages] = useState<Message[]>([])
  const [note, setNote] = useState('')
  const user = useSelector((state: RootState) => state.user.user);

  const baseUrl = import.meta.env.VITE_BACK_URL;
  
  useEffect(()=>{
    // 오답노트 불러오기
    fetch(`${baseUrl}/incorrect-note/s3?note-name=${noteName}`,{
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>setNote(data.mdFile))
    // 기존에 저장된 채팅 내역 불러오기
    fetch(`${baseUrl}/message/${room}`,{
      credentials:'include'
    })
    .then((res)=>res.json())
    .then(data=>setMessages(data.data))

  },[room])

  
  const joinRoom = ()=>{
    if(!socket) return
    socket.emit('join_room',{
      room:room,
      sender:user?.name,
      message:''
    })
  }
  
  useEffect(()=>{
    setSocket(io(`${baseUrl}`,{
      transports:['websocket'],
      withCredentials:true
    }))
    
    return ()=>{
      if(socket) socket.disconnect()
    }
  },[])

  useEffect(()=>{
    if(!socket) return
    socket.on('message',(message)=>{
      setMessages((prev)=>[...prev,message])
    })
    joinRoom()
  },[socket])

  const handleSendMessage = ()=>{
    if(!socket) return
    socket.emit('message',{room,message,sender:user?.name})
    
    setMessage('')
  }
  
  const handleLeaveRoom = ()=>{
    if(!socket) {
      window.location.href = '/'
      return
    }
    socket.emit('leave_room',{
      room:room,
      sender:user?.name,
      message:''
    })
    socket.disconnect()
    setTimeout(() => {
      // 위에 emit이랑 disconnect가 비동기 작업이지만, promise객체를 반환하지 않아서,
      // await을 사용할 수 없다. 그래서 window.location.href를 비동기로 만들어서 
      // 소켓을 끊기 전에 메인으로 가는 상황을 방지했다.
      window.location.href = '/'  
    }, 100);
    
  }
  return (
    <div style={{backgroundColor:'white'}}>
      <h1>현재 방: {room}</h1>
      <button onClick={handleLeaveRoom}>방 나가기</button>
      <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>메시지 보내기</button>
      <div style={{
        display:'flex',
        flexDirection:'row'
      }}>
        <ReactMarkdown
        className="note-content"
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 style={{ fontWeight: 'bold' }} {...props} />,
          h2: ({ node, ...props }) => <h2 style={{ fontWeight: 'bold' }} {...props} />,
        }}
      >
        {note}
      </ReactMarkdown>
        <ul>
        {messages.map((message,index)=>(
          <li key={index}>{message.sender}: {message.message}</li>
        ))}
        </ul>
      </div>
      
    </div>
  )
}

export default ChatTest