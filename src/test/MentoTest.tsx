import { useRef, useState } from 'react'
import MentoDetail from './MentoDetail';

type Mento={
  id:string,
  name:string,
  useLanguage:string,
  position:number,
  profilePicture:string,
  googleId:string
}

const MentoTest = () => {
  const mentoLanguageRef = useRef<HTMLInputElement>(null);
  const [mentos, setMentos] = useState<Mento[]>([])
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const getMento = () => {
    fetch(`${baseUrl}/auth/mento?language=${mentoLanguageRef.current?.value}`,{
      credentials:'include'
    }).then(res=>res.json())
    .then((data)=>data.info)
    .then((info)=>setMentos(info))
  }
  return (
    <div>
      <input ref={mentoLanguageRef} type="text" placeholder='멘토의 언어 입력'/>
      <button onClick={getMento}>mento 호출</button>
      {mentos.map((item)=>{
        return <MentoDetail {...item}/>
      })}
    </div>
  )
}

export default MentoTest