import "../styles/login.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const handleLoginSuccess = (response: any) => {
    const decoded: any = jwtDecode(response.credential);
    console.log("Google User:", decoded);
    // 필요한 사용자 정보 사용 가능 (예: 이름, 이메일 등)
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="login">
      <div className="container">
        <div className="w-100">
          <h3 className="login-title">Login</h3>
        </div>
        <hr />
        <div className="google-login">
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
        {/* <div className="w-100">
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
