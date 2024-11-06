import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationDetail from './NotificationDetail'
type Notification = {
  id:number,
  receiver:string,
  sender:string,
  content:string
}

const Notification = () => {
  const baseUrl = 'https://localhost:3000'
  const [notification, setNotification] = useState<Notification[]>([])
  const [id, setId] = useState(0)
  const nav = useNavigate()
  const getNotification = () => {
    fetch(`${baseUrl}/notification`,{
      credentials:'include'
    }).then(res=>res.json())
    .then((data)=>{
      setNotification(data.data)
      console.log(data.message)
      setId(data.myId)
    })
  }
  
  return (
    <div style={{backgroundColor:'white'}}>
      <button onClick={getNotification}>알림 불러오기</button>
      {notification.map((item)=><NotificationDetail noti={item} id={id}/>)}
    </div>
    
  )
}

export default Notification