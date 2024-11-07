// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import "../styles/firstUser.css";
// import styled from "styled-components";

// const ClickButton = styled.button`
//   background-color: #121212;
// `;

// const FirstUser = () => {
//   const user = useSelector((state: RootState) => state.user.user);
//   const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
//   const [language, setLanguage] = useState([]);
//   const [position, setPosition] = useState(0);
//   const baseUrl = "https://localhost:3000";
//   const navigate = useNavigate();

//   // 하고싶은 로직구현 -> 처음에 언어상태와 포지션 상태를 불러와서 이미 선택되어 있는 상태를 보여주고 그 상태를 변경할 수 있도록 구현
//   // 역할 선택, 언어 선택
//   // 역할 선택 학생 -> user페이지 이동
//   //         멘토 -> 언어 선택 (언어 선택 페이지는 멘토의 언어 수정에도 사용)

//   const onClickLanguage = (language: string) => {
//     setLanguage(language);
//   };

//   const onClickPosition = (position: number) => {
//     setPosition(position);
//   };

//   const onClickStart = () => {};

//   return (
//     <div className="first-user">
//       <div className="container">
//         <div className="content-language">
//           <h1>언어를 선택해주세요</h1>
//           <div className="language-buttons">
//             <button>Java</button>
//             <button>Python</button>
//             <button>C</button>
//             <button>TypeScript</button>
//           </div>
//         </div>
//         <div className="content-position">
//           <h1>역할을 선택해주세요</h1>
//           <div className="position-buttons">
//             <button>학생</button>
//             <button>선생</button>
//           </div>
//         </div>
//         <button className="start-button" onClick={onClickStart}>
//           시작하기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FirstUser;
