import { useLocation, useNavigate } from "react-router-dom";
import "./styles/headTitle.css";

function HeadTitle() {
  const location = useLocation();
  const navigate = useNavigate();

  // 경로에 따른 타이틀 반환
  const getTitle = (path: string) => {
    switch (path) {
      case "/home":
        return "Home";
      case "/login":
        return "Login";
      case "/feedback":
        return "Feedback";
      case "/mentchat":
        return "MenTChat";
      case "/folder":
        return "Folder";
      case "/user":
        return "User";
      case "/setting":
        return "Setting";
      case "/first-user":
        return "FirstUser";
      default:
        return "Page Not Found";
    }
  };

  // 경로에 따른 원의 색상과 네온 효과 반환
  const getCircleStyle = (path: string) => {
    switch (path) {
      case "/home":
        return {
          borderColor: "#fffac3",
          boxShadow:
            "0 0 10px rgba(255, 234, 0, 0.8), 0 0 20px rgba(255, 234, 0, 0.6), 0 0 30px rgba(255, 234, 0, 0.4)",
        };
      case "/login":
        return {
          borderColor: "#fffac3",
          boxShadow:
            "0 0 10px rgba(255, 234, 0, 0.8), 0 0 20px rgba(255, 234, 0, 0.6), 0 0 30px rgba(255, 234, 0, 0.4)",
        };
      case "/feedback":
        return {
          borderColor: "#fffac3",
          boxShadow:
            "0 0 10px rgba(255, 234, 0, 0.8), 0 0 20px rgba(255, 234, 0, 0.6), 0 0 30px rgba(255, 234, 0, 0.4)",
        };
      case "/mentchat":
        return {
          borderColor: "#fffac3",
          boxShadow:
            "0 0 10px rgba(255, 234, 0, 0.8), 0 0 20px rgba(255, 234, 0, 0.6), 0 0 30px rgba(255, 234, 0, 0.4)",
        };
      case "/folder":
        return {
          borderColor: "#ffb3b3",
          boxShadow:
            "0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.6), 0 0 30px rgba(255, 0, 0, 0.4)",
        };
      case "/user":
        return {
          borderColor: "#bcccff",
          boxShadow:
            "0 0 10px rgba(0, 98, 255, 0.8), 0 0 20px rgba(0, 98, 255, 0.6), 0 0 30px rgba(0, 98, 255, 0.4)",
        };
      case "/setting":
        return {
          borderColor: "#c3ffc1",
          boxShadow:
            "0 0 10px rgba(17, 255, 0, 0.8), 0 0 20px rgba(17, 255, 0, 0.6), 0 0 30px rgba(17, 255, 0, 0.4)",
        };
      case "/first-user":
        return {
          borderColor: "#bcccff",
          boxShadow:
            "0 0 10px rgba(0, 98, 255, 0.8), 0 0 20px rgba(0, 98, 255, 0.6), 0 0 30px rgba(0, 98, 255, 0.4)",
        };
      default:
        return {
          borderColor: "#ffffff", // 기본값 (흰색)
          boxShadow:
            "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)",
        };
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="head-title">
      <img
        src="/images/Logo.png"
        className="title-logo"
        style={getCircleStyle(location.pathname)} // 경로에 따른 스타일 적용
        onClick={handleHome}
      />
      <h1>{getTitle(location.pathname)}</h1>
    </div>
  );
}

export default HeadTitle;
