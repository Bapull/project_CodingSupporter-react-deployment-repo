import React, { useEffect, useState } from 'react'
import { Socket,io } from 'socket.io-client';

type Message = {
  room:string;
  message:string;
  sender:string;
}
const ChatTest = () => {
  const [socket,setSocket] = useState<Socket>()
  const [message,setMessage] = useState<string>('')
  const [messages,setMessages] = useState<Message[]>([])
  const [room,setRoom] = useState<string>('')
  useEffect(()=>{
    setSocket(io('https://localhost:3000',{
      transports:['websocket']
    }))

    return ()=>{
      if(socket) socket.disconnect()
    }
  },[])

  useEffect(()=>{
    if(!socket) return
    socket.on('join_room',(message)=>{
      setRoom(message)
    })
    socket.on('leave_room',(message)=>{
      setRoom('')
    })
    socket.on('message',(message)=>{
      setMessages((prev)=>[...prev,message])
    })
  },[socket])

  const handleSendMessage = ()=>{
    if(!socket) return
    socket.emit('message',{room,message,sender:''})
    setMessage('')
  }
  const handleJoinRoom = (room:string)=>{
    if(!socket) return
    socket.emit('join_room',room)
  }
  const handleLeaveRoom = ()=>{
    if(!socket) return
    socket.emit('leave_room',room)
  }
  return (
    <div style={{backgroundColor:'white'}}>
      <h1>현재 방: {room}</h1>
      <button onClick={()=>handleJoinRoom('방1')}>방1 참여하기</button>
      <button onClick={()=>handleJoinRoom('방2')}>방2 참여하기</button>
      <button onClick={handleLeaveRoom}>방 나가기</button>
      <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>메시지 보내기</button>
      <ul>
        {messages.map((message,index)=>(
          <li key={index}>{message.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default ChatTest