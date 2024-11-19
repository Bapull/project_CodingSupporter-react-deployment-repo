import { useRef } from "react";

type Mento={
  id:string,
  name:string,
  useLanguage:string,
  position:number,
  profilePicture:string,
  googleId:string
}

const MentoDetail = (mento:Mento) => {
  const inputRef = useRef<HTMLInputElement|null>(null)
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const requestChat = () => {
    fetch(`${baseUrl}/chat-room/chat-request?mento-id=${mento.id}&note-id=${inputRef.current?.value}`,{
      credentials:'include',
      method:'POST'
    })
  }
  return (
    <div style={{backgroundColor:'white'}}>
      <div>{mento.id}</div>
      <div>{mento.name}</div>
      <div>{mento.useLanguage}</div>
      <div style={{color:'gray'}}>멘토랑 공유할 오답노트의 아이디 입력 <input type="text" ref={inputRef}/></div>
      <button onClick={requestChat}>채팅요청하기</button>
    </div>
  )
}

export default MentoDetail