type Mento={
  id:string,
  name:string,
  useLanguage:string,
  position:number,
  profilePicture:string,
  googleId:string
}

const MentoDetail = (mento:Mento) => {
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const requestChat = () => {
    fetch(`${baseUrl}/notification/chat-request?id=${mento.id}`,{
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