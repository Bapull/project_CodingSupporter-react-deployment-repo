import "../styles/login.css";

function Login() {
  return (
    <div className="login">
      <div className="container">
        {/* 로그인 버튼 클릭 시 구글 로그인 페이지로 이동 */}
        <a href="https://localhost:3000/auth/google/login">
          <img src="./images/web_neutral_rd_ctn.svg" className="google-logo" />
        </a>
        {/* <div className="w-100">
          <h3 className="login-title">Login</h3>
        </div>
        <div className="google-login"></div>
        <div className="w-100">
          <input type="text" className="email" placeholder="Email@exam.com" />
          <input type="text" className="passwd" placeholder="Password" />
        </div>
        <div>
          <label className="sign-up">Sign Up</label>
          <button className="login-btn">Login</button>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
