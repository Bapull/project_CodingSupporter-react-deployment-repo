import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home">
      <div className="container">
        <div className="navigate-login-btn">
          <label onClick={handleLogin} className="login-btn">
            Login
          </label>
        </div>
        <h1 className="title">Welcome, Project Name!</h1>
        <div className="content">
          <h3>콘텐트</h3>
          <p>저희는 코딩에 어려움을 겪는 분들을 위해</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
