import { useLocation, Link } from "react-router-dom";
import "./styles/navbar.css";

function NavBar() {
  const location = useLocation();

  const getActiveClass = (path: string) => {
    const activeClass = "navbar-active";

    if (location.pathname === path) {
      switch (path) {
        case "/folder":
          return `${activeClass} active folder`;
        case "/user":
          return `${activeClass} active user`;
        case "/setting":
          return `${activeClass} active setting`;
        default:
          return `${activeClass} active feedback`;
      }
    }
    return `${activeClass}`;
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link
          to="/feedback"
          className={`nav-item ${getActiveClass("/feedback")}`}
        >
          <img src="/images/Chat.png" alt="Feedback" className="nav-icon" />
        </Link>
        <Link to="/folder" className={`nav-item ${getActiveClass("/folder")}`}>
          <img src="/images/Folder.png" alt="Folder" className="nav-icon" />
        </Link>
        <Link to="/user" className={`nav-item ${getActiveClass("/user")}`}>
          <img src="/images/User.png" alt="User" className="nav-icon" />
        </Link>
        <Link
          to="/setting"
          className={`nav-item ${getActiveClass("/setting")}`}
        >
          <img src="/images/Setting.png" alt="Setting" className="nav-icon" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
