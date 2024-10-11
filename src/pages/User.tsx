import { useEffect, useState } from "react";
import "../styles/user.css";

type User = {
  googleId:string
  id:number
  name:string
  position:number
  profilePicture:string
  useLanguage:"[]"
}
function User() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(()=>{
    fetch('https://localhost:3000/auth/status',{
      method:"GET",
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>setUser(data))
  },[])

  const logout = () => {
    fetch('https://localhost:3000/auth/logout',{
      method:"GET",
      credentials:'include'
    }).then(()=>{window.location.href='https://localhost:5173'})
  }
  return (
    <div className="user">
      <div className="container">
        <h2>name:{user?.name}</h2>
        <img src={user?.profilePicture} alt="프로필사진" />
        <p>역할: {user?.position === 1 ? '튜터' : '튜티'}</p>
        <p>사용 언어: {user?.useLanguage}</p>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
}

export default User;
