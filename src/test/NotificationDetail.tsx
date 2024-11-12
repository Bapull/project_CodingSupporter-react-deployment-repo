import { useNavigate } from 'react-router-dom'

type Notification = {
  id:number,
  receiver:string,
  sender:string,
  content:string
}
type DetailProps = {
  noti:Notification,
  id:number
}
const NotificationDetail: React.FC<DetailProps> = ({noti, id}) => {
  console.log(id)
  const nav = useNavigate()
  const joinChat = () => {
    nav(`/chat-test/${noti.id}`)
  }
  if(noti.sender === `${id}`){
    return (
      <div style={{backgroundColor:'gray', border:'1px solid'}}>
        <div>내가 보낸 알림</div>
        <div>item.id: {noti.id}</div>
        <div>item.receiver: {noti.receiver}</div>
        <div>item.sender: {noti.sender}</div>
        <div>item.content: {noti.content}</div>
        <button onClick={joinChat}>채팅 참가</button>
      </div>
    )
  }else{
    return (
      <div style={{backgroundColor:'orange', border:'1px solid'}}>
        <div>받은 알람</div>
        <div>item.id: {noti.id}</div>
        <div>item.receiver: {noti.receiver}</div>
        <div>item.sender: {noti.sender}</div>
        <div>item.content: {noti.content}</div>
        <button onClick={joinChat}>채팅 참가</button>
      </div>
    )
  }
}

export default NotificationDetail