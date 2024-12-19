// 팀 연락처, 빠른 문의 등
import { useState } from "react";

const ContactInfo: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const baseUrl = import.meta.env.VITE_BACK_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, content }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="contact-info">
      <div className="contact-info-top-content">
        <div className="contact-info-top-content-item">
          <img src="./images/Mail.png" alt="Mail" />
          <p>bapull@gmail.com</p>
        </div>
        <div className="contact-info-top-content-item">
          <img src="./images/Call.png" alt="Phone" />
          <p>010-1234-5678</p>
        </div>
        <div className="contact-info-top-content-item">
          <img src="./images/Where.png" alt="Location" />
          <p>경상북도 칠곡군 지천면 금송로 60(송정리)</p>
        </div>
      </div>
      <h3 className="contact-info-bottom-content-title">빠른 문의</h3>
      <hr />
      <div className="contact-info-bottom-content">
        <form onSubmit={handleSubmit}>
          <div className="contact-info-bottom-content-item">
            <textarea
              placeholder="Name"
              className="contact-info-bottom-content-item-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Email"
              className="contact-info-bottom-content-item-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="contact-info-bottom-content-item">
            <textarea
              placeholder="Content"
              className="contact-info-bottom-content-item-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="contact-info-bottom-content-item-submit-container">
            <button
              type="submit"
              className="contact-info-bottom-content-item-submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
