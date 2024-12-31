import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../redux/userSlice";
import "../styles/firstUser.css";

// 하고싶은 로직구현 -> 처음에 언어상태와 포지션 상태를 불러와서 이미 선택되어 있는 상태를 보여주고 그 상태를 변경할 수 있도록 구현
// 역할 선택, 언어 선택
// 역할 선택 학생 -> user페이지 이동
//         멘토 -> 언어 선택 (언어 선택 페이지는 멘토의 언어 수정에도 사용)

// 역할 선택 후 -> 다음 버튼 누르면 버튼 선택 못하게 막고, 언어 선택 보여주기

const FirstUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const navigate = useNavigate();

  const [language, setLanguage] = useState<string[]>([]);
  const [position, setPosition] = useState<number>(0);
  const [isnext, setIsnext] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([
    "UNITY",
    "C",
    "C++",
    "C#",
    "SQL PL/SQL",
    "OBJECTIVE-C",
    "SWIFT",
    "RUBY",
    "PYTHON",
    "PHP",
    "HTML",
    "CSS",
    "JAVA",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "PERL",
    "ASP",
    "JSP",
    "GO",
  ]); // 배열 값

  // 언어 선택 여부 확인
  const onClickLanguage = (checked: any, item: string) => {
    if (checked) {
      setLanguage([...language, item]);
    } else {
      setLanguage(language.filter((lang) => lang !== item));
    }
  };

  // 다음 버튼을 누르면 역할 변경
  const onClickNext = () => {
    if (position !== user.position) {
      fetch(`${baseUrl}/user/position`, {
        method: "PATCH",
        credentials: "include",
      });
      // console.log("역할변경");
    } else {
      // console.log("변경 안 됨");
    }
    setIsnext(true);
    console.log("선택완료");
  };

  // 새로운 값을 입력할 때마다 배열에 추가
  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems((prevItems) => [...prevItems, inputValue.toUpperCase()]);
      setInputValue(""); // 입력창 초기화
    }
  };

  // Enter 키를 눌렀을 때 값 추가
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  // 다음 화면으로 이동
  const onClickStart = () => {
    // 언어 전달
    if (language.length > 0) {
      fetch(`${baseUrl}/user/language`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          useLanguage: JSON.stringify(language),
        }),
      });

      dispatch(updateUser({ useLanguage: JSON.stringify(language) }));
      console.log(JSON.stringify(language));
      setTimeout(() => {
        navigate("/user");
      }, 100);
    } else {
      alert("언어를 선택해주세요");
    }
  };

  return (
    <div className="first-user">
      {isLoggedIn ? (
        <div className="container">
          <div
            className="content-position"
            style={{
              opacity: `${isnext ? "0.5" : "1"}`,
            }}
          >
            <h1
              className="position-title"
              style={{
                color: `${isnext ? "#808080" : "#121212"}`,
                fontSize: `${isnext ? "1.2rem" : "2rem"}`,
              }}
            >
              역할을 선택해주세요
            </h1>
            <div
              className="position-group"
              style={{
                margin: `${isnext ? "0" : "5%"}`,
              }}
            >
              <button
                id="0"
                className="position-button"
                onClick={(e) => setPosition(parseInt(e.currentTarget.id))}
                style={{
                  backgroundColor: `${position === 0 ? "#121212" : "#f0f3fa"}`,
                  color: `${position === 0 ? "#f0f3fa" : "#121212"}`,
                  scale: `${isnext ? "0.5" : "1"}`,
                  opacity: `${isnext ? "0.5" : "1"}`,
                }}
                disabled={isnext}
              >
                학생
              </button>
              <button
                id="1"
                className="position-button"
                onClick={(e) => setPosition(parseInt(e.currentTarget.id))}
                style={{
                  backgroundColor: `${position === 1 ? "#121212" : "#f0f3fa"}`,
                  color: `${position === 1 ? "#f0f3fa" : "#121212"}`,
                  scale: `${isnext ? "0.5" : "1"}`,
                  opacity: `${isnext ? "0.5" : "1"}`,
                }}
                disabled={isnext}
              >
                선생
              </button>
            </div>
            <div
              className="next-button-wrapper"
              style={{
                marginTop: `${isnext ? "0" : "21%"}`,
                marginBottom: `${isnext ? "0" : "7%"}`,
                height: `${isnext ? "0" : "auto"}`,
                opacity: `${isnext ? "0" : "1"}`,
              }}
            >
              <button
                className="next-button"
                onClick={onClickNext}
                style={{
                  scale: `${isnext ? "0" : "1"}`,
                }}
              >
                다음
              </button>
            </div>
          </div>
          <div className="content-language">
            <h1
              className="language-title"
              style={{
                color: `${isnext ? "#121212" : "#808080"}`,
                fontSize: `${isnext ? "2rem" : "1.2rem"}`,
                opacity: `${isnext ? "1" : "0.5"}`,
              }}
            >
              언어를 선택해주세요
            </h1>
            <div className="language-group">
              {items.map((item, index) => (
                <div className="checkbox" key={index}>
                  <input
                    className="language-checkbox"
                    type="checkbox"
                    id={item}
                    onClick={(e) =>
                      onClickLanguage(e.currentTarget.checked, item)
                    }
                  />
                  <label
                    htmlFor={item}
                    style={{
                      scale: `${isnext ? "1" : "0"}`,
                      opacity: `${isnext ? "1" : "0"}`,
                    }}
                  >
                    {item}
                  </label>
                </div>
              ))}
              <input
                type="textarea"
                className="other-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="기타"
                style={{
                  display: `${isnext ? "inline-block" : "none"}`,
                }}
              />
            </div>
          </div>
          <button
            className="start-button"
            onClick={onClickStart}
            style={{
              display: `${isnext ? "inline-block" : "none"}`,
            }}
          >
            시작하기
          </button>
        </div>
      ) : (
        <a href="https://localhost:3000/auth/google/login">
          <img src="./images/web_neutral_rd_ctn.svg" className="google-logo" />
        </a>
      )}
    </div>
  );
};

export default FirstUser;
