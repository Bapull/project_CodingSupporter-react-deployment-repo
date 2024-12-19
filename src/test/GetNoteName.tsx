import React, { useRef, useState } from 'react'

const GetNoteName = () => {
const ref = useRef<HTMLInputElement>(null)
const [name, setName] = useState()
const onClick = () => {
    fetch(`https://localhost:3000/chat-room/${ref.current?.value}`,{
        credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>setName(data.data.noteName))
}
  return (
    <div>
      <input type="text" ref={ref}/>
        <button onClick={onClick}>getname</button>
        <div>찾은 노트이름: {name}</div>
    </div>
  )
}

export default GetNoteName
