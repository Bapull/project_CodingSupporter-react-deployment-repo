import { useEffect, useRef, useState } from "react";
import "../styles/user.css";

type User = {
  googleId:string
  id:number
  name:string
  position:number
  profilePicture:string
  useLanguage:string
}
type GraphInfo = {
  [key:string]: number;
}
type Note = {
  language:string
  errorType:string
  mdFile:string
}
function UserTest() {
  const baseUrl = 'https://localhost:3000'

  // input value를 가져오기위한 ref
  const nameRef = useRef<HTMLInputElement>(null)
  const lanRef = useRef<HTMLInputElement>(null)
  const [note, setNote] = useState<Note>({
    language:'',
    errorType:'',
    mdFile:''
  })
  const [user, setUser] = useState<User>({
    googleId:'',
    id:0,
    name:'',
    position:-1,
    profilePicture:'',
    useLanguage:'[]'
  })
  // 출석정보 저장할 배열
  const [attendance, setAttendance] = useState([])
  // 그래프 정보(언어별로 몇 개의 오답노트가 있는지)
  const [graphInfo, setGraphInfo] = useState<GraphInfo>({})
  // 유저 정보 호출
  useEffect(()=>{
    fetch(`${baseUrl}/user/info`,{
      method:"GET",
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.message)
      setUser(data.info)})
  },[])
  // 로그아웃
  const logout = () => {
    fetch(`${baseUrl}/auth/logout`,{
      method:"GET",
      credentials:'include'
    }).then(()=>{window.location.href='https://localhost:5173'})
  }
  // 출석체크
  const check = () => {
    fetch(`${baseUrl}/user/attendance`,{
      method:"POST",
      credentials:'include'
    })
  }
  // 출석정보 전체 호출
  const checkcheck = () => {
    setGraphInfo({})
    fetch(`${baseUrl}/user/attendance`,{
      credentials:'include'
    }).then(res=>res.json())
    .then(data=>data.attendance)
    .then(res=>setAttendance(res))
  }
  // 랜덤 오답노트 생성
  const incorrectNote = () =>{
    const randomErrorType = (Math.round(Math.random()*10))%4+1
    const randomLanguage = (Math.round(Math.random()*10))%4
    const languages = ['Java','Python','C','TypeScript']
    fetch(`${baseUrl}/incorrect-note`,{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
          mentoId: 1,
          studentId: user?.id,
          errorType: randomErrorType,
          language: languages[randomLanguage],
          noteName: "1",
          chatName: "1"
      })
    })
  }
  // 그래프 정보 호출(언어별로 몇 개의 오답노트가 있는지)
  const graph = () =>{
    setAttendance([])
    fetch(`${baseUrl}/user/graph`,{
      credentials:'include'
    })
    .then(res=>res.json())
    .then(res=>res.data)
    .then(data=>setGraphInfo(data))
  }
  // 이름 변경
  const changeName = () => {
    fetch(`${baseUrl}/user/name`,{
      method:'PATCH',
      credentials:'include',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name:nameRef.current?.value
      })
    })
  }
  // 유저의 useLanguage가 배열로 되는지 확인
  console.log(JSON.parse(user?.useLanguage));
  // 언어변경
  const changeLan = () => {
    fetch(`${baseUrl}/user/language`,{
      method:'PATCH',
      credentials:'include',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        useLanguage:lanRef.current?.value
      })
    })
  }
  // 언어별로 있는 에러타입 종류
  const folder = () => {
    fetch(`${baseUrl}/incorrect-note/folder`,{
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  }
  // 언어랑 에러타입을 특정해서 파일명으로 이루어진 배열 호출
  // 콘솔에 표시됨
  const getInco = () => {
    const randomErrorType = (Math.round(Math.random()*10))%4+1
    const randomLanguage = (Math.round(Math.random()*10))%4
    const languages = ['Java','Python','C','TypeScript']

    fetch(`${baseUrl}/incorrect-note?language=${languages[randomLanguage]}&error-type=${randomErrorType}`,{
      credentials:'include'
    }).then(res=>res.json())
    .then(data=>console.log('에러타입:',randomErrorType,'언어:',languages[randomLanguage], data))
  }
  // 역할 변경
  const changePosition = () => {
    fetch(`${baseUrl}/user/position`,{
      method:'PATCH',
      credentials:'include'
    })
  }
  const generateIncorrectNote = () => {
    fetch(`${baseUrl}/incorrect-note/generate`,{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        code:`
        #include <stdio.h>
        int main() {
        int a = 10;
        printf(\"%f\",a);
        return 0;}`,
        error:"warning: format '%f' expects argument of type 'double', but argument 2 has type 'int' [-Wformat=]"
      })
    }).then(res=>res.json())
    .then(data=>setNote(data.data))
  }
  const saveNote = () => {
    fetch(`${baseUrl}/incorrect-note/save`,{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note)
    }).then(res=>res.json())
    .then(data=>console.log(data))
  }
  return (
    <div className="user">
      <div className="container">
        <h2>name:{user?.name}</h2>
        <img src={user?.profilePicture} alt="프로필사진" />

        <p>역할: {user?.position === 1 ? '튜터' : '튜티'}</p>

        <p>사용 언어: {user?.useLanguage}</p>

        <button onClick={logout}>로그아웃</button>
        <div>---------------------------------</div>
        <button onClick={check}>출첵</button>
        <button onClick={checkcheck}>출석 정보 불러오기</button>
        {attendance.map((item)=>{
          return <div>{item}</div>
        })}
        <div>---------------------------------</div>
        <button onClick={incorrectNote}>랜덤 오답노트 생성</button>
        <button onClick={graph}>그래프 정보 불러오기</button>
        <button onClick={getInco}>특정 오답노트 요청</button>
        <div>---------------------------------</div>
        <div>
        {Object.keys(graphInfo).map((key)=>{
          return <div>{key}:{graphInfo[key]}</div>
        })}
        <div>---------------------------------</div>
        <div><input ref={nameRef} type="text"/>
        <button onClick={changeName}>유저이름변경</button></div>
        <div>---------------------------------</div>
        <div><input ref={lanRef} type="text" />
        <button onClick={changeLan}>유저언어변경</button></div>
        <div>---------------------------------</div>
        <button onClick={folder}>폴더정보 불러오기</button>
        <div>---------------------------------</div>
        <button onClick={changePosition}>역할 변경</button>
        <div>---------------------------------</div>
        <button onClick={generateIncorrectNote}>gpt 오답노트 생성</button>
        <button onClick={saveNote}>오답노트 저장</button>
      </div>
      
      </div>
    </div>
  );
}

export default UserTest;
