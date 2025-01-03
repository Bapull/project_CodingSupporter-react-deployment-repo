import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

import "../styles/feedback.css";
import IncorrectNote from "../components/IncorrectNote";
import Loading from "../components/Loading";

interface NoteData {
  id: number;
  language: string;
  errorType: number;
  mdFile: string;
}

interface MentorData {
  id: number;
  name: string;
  position: number;
  useLanguage: string;
  profilePicture: string;
  isActive: boolean;
}

const randomMessages = [
  "성장의 기록을 남기고,<br />앞으로 나아가는 발판으로 삼으세요.",
  "실수는 성공의 디딤돌입니다.<br />함께 해결해 나가요!",
  "고민했던 흔적을 남기고,<br />더 나은 코드를 향해 나아가세요.",
  "작은 실수가 모여 큰 성장이 됩니다.<br />함께 해결해요!",
  "코드 여정에서 만난 문제들,<br />여기서 해결하며 경험으로 쌓아가세요.",
];

const Feedback: React.FC = () => {
  const [code, setCode] = useState("");
  const [question, setQuestion] = useState("");
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([] as MentorData[]);
  const [showMentors, setShowMentors] = useState(false);
  const [randomMessage, setRandomMessage] = useState(randomMessages[0]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACK_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = randomMessages.indexOf(randomMessage);
      const nextIndex = (currentIndex + 1) % randomMessages.length;
      setRandomMessage(randomMessages[nextIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, [randomMessage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getRandomMessage = () => {
    return randomMessage;
  };

  // 코드와 질문을 보내고 데이터 수신
  const handleSubmitQuestion = async () => {
    setSubmitLoading(true);
    const formattedCode = `\`\`\`\n${code}\n\`\`\``;
    try {
      const response = await fetch(`${baseUrl}/incorrect-note/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code: formattedCode, question }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setNoteData(data.data);
      setLanguage(data.data.language);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  // 오답노트 저장 요청
  const handleSave = async () => {
    try {
      const response = await fetch(`${baseUrl}/incorrect-note/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      alert('Note saved successfully!');
      return data.noteId; // 노트 ID 반환
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
      return null;
    }
  };

  // 멘토 검색
  const handleSearchMento = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/auth/mento?language=${language}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setMentors(data.info);
      setShowMentors(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleMentorClick = async (mentorId: number) => {
    const savedId = await handleSave();
    if (!savedId) return;

    const response = await fetch(`${baseUrl}/chat-room/chat-request?mento-id=${mentorId}&note-id=${savedId}`, {
      credentials: 'include',
      method: 'POST',
    });

    if (response.ok) {
      alert('채팅 요청이 완료되었습니다.');
    } else {
      alert('채팅 요청에 실패했습니다.');
    }
  };

  return (
    <div className="feedback">
      {submitLoading && <Loading />}
      <div className="container">
        <div className="incorrect-note-section">
          {noteData ? (
            <>
              <IncorrectNote data={noteData} />
              <button className="save-button" onClick={handleSave}>
                Save Note
              </button>
              <button
                className="search-mento-button"
                onClick={handleSearchMento}
              >
                아직 찾지 못하셨나요?
              </button>
            </>
          ) : (
            <div className="random-message-container">
              <img
                src="/video/Feedback-code-checking.gif"
                alt="Feedback Code Checking GIF"
                className="feedback-code-checking-gif"
              />
              <div className="random-message" dangerouslySetInnerHTML={{ __html: getRandomMessage() }} />
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="question-section">
          {showMentors ? (
            <div className="mentor-list">
              {mentors.map((mentor) => {
                const languages = JSON.parse(mentor.useLanguage);
                return (
                  <div className="mentor-card" key={mentor.id} onClick={() => handleMentorClick(mentor.id)}>
                    <img className="mentor-img" src={mentor.profilePicture} alt={mentor.name} />
                    <p>{mentor.name}</p>
                    <p>{languages.join(', ')}</p>
                    <div className="mentor-active">{mentor.isActive ? '🟢' : '⚫'}</div>
                  </div>
                );
              })}
              <div className="mentor-button">
                <button onClick={handleSearchMento}>▼ Load More</button>
                <button onClick={() => setShowMentors(false)}>Back to Question</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="error-code">Code</h2>
              <textarea
                className="error-code-input"
                placeholder="Enter code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
              <h2 className="error-question">Question</h2>
              <textarea
                className="error-question-input"
                placeholder="Enter question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              <button 
                className="submit-button" 
                onClick={noteData ? () => {
                  setNoteData(null);
                  setCode("");
                  setQuestion("");
                } : handleSubmitQuestion}
              >
                {noteData ? "New Question" : "Submit"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
