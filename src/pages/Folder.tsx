import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

import "../styles/folder.css";

function Folder() {
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState([]);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACK_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="folder">
      <div className="container">Folder</div>
    </div>
  );
}

export default Folder;
