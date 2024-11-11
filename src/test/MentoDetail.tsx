import React from 'react'

type Mento={
  id:string,
  name:string,
  useLanguage:string,
  position:number,
  profilePicture:string,
  googleId:string
}

const MentoDetail = (mento:Mento) => {
  const baseUrl = 'https://localhost:3000'
  const requestChat = () => {
    fetch(`${baseUrl}/chat-room/chat-request?id=${mento.id}`,{
      credentials:'include',
      method:'POST'
    })
  }
  return (
    <div style={{backgroundColor:'white'}}>
      <div>{mento.id}</div>
      <div>{mento.name}</div>
      <div>{mento.useLanguage}</div>
      <button onClick={requestChat}>채팅요청하기</button>
    </div>
  )
}

export default MentoDetail