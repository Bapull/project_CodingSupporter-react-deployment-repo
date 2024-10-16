import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUser, clearUser } from "../redux/userSlice";
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
  const baseUrl = "https://localhost:3000";

  useEffect(() => {
    fetch(`${baseUrl}/user/info`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.info) {
          dispatch(setUser(data.info));
        }
      });
  }, [dispatch]);

  const logout = () => {
    fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    }).then(() => {
      dispatch(clearUser());
      window.location.href = "https://localhost:5173";
    });
  };

  return (
    <div className="user">
      <div className="container">
        {isLoggedIn ? (
          <>
            <h2>name:{user?.name}</h2>
            <img src={user?.profilePicture} alt="프로필사진" />
            <p>역할: {user?.position === 1 ? "튜터" : "튜티"}</p>
            <p>사용 언어: {user?.useLanguage}</p>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <a href="https://localhost:3000/auth/google/login">
            <img
              src="./images/web_neutral_rd_ctn.svg"
              className="google-logo"
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default User;
