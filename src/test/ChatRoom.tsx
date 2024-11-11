import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatRoomDetail from './ChatRoomDetail'
type ChatRoom = {
  id:number,
  receiver:string,
  sender:string
}

const ChatRoom = () => {
  const baseUrl = 'https://localhost:3000'
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([])
  const [id, setId] = useState(0)
  const nav = useNavigate()
  const getChatRoom = () => {
    fetch(`${baseUrl}/chat-room`,{
      credentials:'include'
    }).then(res=>res.json())
    .then((data)=>{
      setChatRoom(data.data)
      console.log(data.message)
      setId(data.myId)
    })
  }
  
  return (
    <div style={{backgroundColor:'white'}}>
      <button onClick={getChatRoom}>채팅방 불러오기</button>
      {chatRoom.map((item)=><ChatRoomDetail chatroom={item} id={id}/>)}
    </div>
    
  )
}

export default ChatRoom