import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUser, clearUser } from "../redux/userSlice";
import Barchart from "../components/charts/Barchart";
import Piechart from "../components/charts/Piechart";
import Calendar from "../components/charts/Calendar";
import "../styles/user.css";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const reload = import.meta.env.VITE_FRONT_URL;
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  });
  const formattedDate = formatter
    .format(date)
    .replace(/\. /g, "-")
    .replace(".", "");

  console.log(formattedDate);
  useEffect(() => {
    // 유저 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/info`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.info) {
          dispatch(setUser(data.info)); // 유저 정보를 dispatch를 이용해서 리덕스 스토어에 저장
        }
        if (data.info.position === 0 && data.info.useLanguage === "[]") {
          // 역할 0 && 사용언어 없음일 시 처음 유저라고 판단
          window.location.href = `${reload}/first-user`;
        }

        setUser(data.info);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    // 출석 체크
    const fetchPostAttendance = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/attendance`, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchUserInfo();
    fetchPostAttendance();
  }, [dispatch]);

  const fetchLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch(clearUser());
      window.location.href = reload;
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="user">
      {/* 로그인 여부에 따라 다른 화면 표시 */}
      {isLoggedIn ? (
        <div className="wrapper">
          <div className="user-content-left">
            <button onClick={fetchLogout} className="logout-button">
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
