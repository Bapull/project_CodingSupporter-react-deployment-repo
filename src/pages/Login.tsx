import "../styles/login.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  // 로그인 성공 시
  const handleLoginSuccess = (response: any) => {
    const decoded: any = jwtDecode(response.credential);
    console.log("Google User:", decoded);
    // 필요한 사용자 정보 사용 가능 (예: 이름, 이메일 등)
  };

  // 로그인 실패 시
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="login">
      <div className="container-wrap">
        <div className="login-left-img">
          <img src="./images/LoginLeftGIF.gif" alt="gif" className="gif" />
        </div>
        <div className="container">
          <div className="w-100">
            <h3 className="login-title">Login</h3>
          </div>
          <hr />
          <div className="google-login">
            <GoogleOAuthProvider clientId="416302884257-rcohtq3ev9o1lif147detlsm92vjko00.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
