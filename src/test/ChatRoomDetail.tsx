import React from 'react'
import { useNavigate } from 'react-router-dom'

type ChatRoom = {
  id:number,
  receiver:string,
  sender:string
}
type DetailProps = {
  chatroom:ChatRoom,
  id:number
}
const ChatRoomDetail: React.FC<DetailProps> = ({chatroom, id}) => {
  console.log(id)
  const nav = useNavigate()
  const joinChat = () => {
    nav(`/chat-test/${chatroom.id}`)
  }
  if(chatroom.sender === `${id}`){
    return (
      <div style={{backgroundColor:'gray', border:'1px solid'}}>
        <div>내가 보낸 알림</div>
        <div>item.id: {chatroom.id}</div>
        <div>item.receiver: {chatroom.receiver}</div>
        <div>item.sender: {chatroom.sender}</div>
        <button onClick={joinChat}>채팅 참가</button>
      </div>
    )
  }else{
    return (
      <div style={{backgroundColor:'orange', border:'1px solid'}}>
        <div>받은 알람</div>
        <div>item.id: {chatroom.id}</div>
        <div>item.receiver: {chatroom.receiver}</div>
        <div>item.sender: {chatroom.sender}</div>
        <button onClick={joinChat}>채팅 참가</button>
      </div>
    )
  }
}

export default ChatRoomDetail