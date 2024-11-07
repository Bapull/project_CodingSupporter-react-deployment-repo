import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FirstUser = () => {
  const baseUrl = "https://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/info`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // console.log("Fetched data:", data.info);

        if (data.info.position >= 1 && data.info.useLanguage !== "[]") {
          navigate("/user");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return (
    <div className="first-user">
      <div className="container">FirstUser</div>
    </div>
  );
};

export default FirstUser;
