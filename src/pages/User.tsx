import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUser, clearUser } from "../redux/userSlice";
import Barchart from "../components/charts/Barchart";
import Piechart from "../components/charts/Piechart";
import Calendar from "../components/charts/Calendar";
import "../styles/user.css";

type User = {
  googleId: string;
  id: number;
  name: string;
  position: number;
  profilePicture: string;
  useLanguage: "[]";
};

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const baseUrl = import.meta.env.VITE_BACK_URL;

  // 유저 정보 불러오기
  useEffect(() => {
    fetch(`${baseUrl}/user/info`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.info) {
          dispatch(setUser(data.info)); // 유저 정보를 dispatch를 이용해서 리덕스 스토어에 저장
        }
      });
  }, [dispatch]);

  // 로그아웃
  const logout = async () => {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    })
    if(response.ok){
      dispatch(clearUser());// 유저 정보를 dispatch를 이용해서 리덕스 스토어에서 삭제
      window.location.href = import.meta.env.VITE_FRONT_URL;
    }
       
  };

  return (
    <div className="user">
      {/* 로그인 여부에 따라 다른 화면 표시 */}
      {isLoggedIn ? (
        <div className="wrapper">
          <div className="user-content-left">
            <button onClick={logout} className="logout-button">
              로그아웃
            </button>
            <div className="content-left-top">
              <img
                src={user?.profilePicture}
                alt="프로필사진"
                className="profile-image"
              />
              <h2 className="profile-name">{user?.name}</h2>
            </div>
            <div className="content-left-middle">
              <p className="profile-part">
                {user?.position === 1 ? "멘토" : "학생"}
              </p>
              <p className="profile-language">자주 쓰는 언어</p>
              {user?.useLanguage && (
                <ul className="profile-language-list">
                  {JSON.parse(user.useLanguage).map(
                    (language: string, index: number) => (
                      <li key={index} className="profile-language-list-content">
                        {language}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="user-content-right">
            <Barchart />
            <Piechart />
            <p className="attendance-title">Attendance</p>
            <Calendar />
          </div>
        </div>
      ) : (
        <a href={`${baseUrl}/auth/google/login`}>
          <img src="./images/web_neutral_rd_ctn.svg" className="google-logo" />
        </a>
      )}
    </div>
  );
}

export default User;
