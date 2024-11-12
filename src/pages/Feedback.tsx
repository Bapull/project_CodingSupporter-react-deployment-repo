import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

import '../styles/feedback.css';
import IncorrectNote from '../components/IncorrectNote';

interface NoteData {
  language: string;
  errorType: number;
  mdFile: string;
}

const randomMessages = [
  '성장의 기록을 남기고,<br />앞으로 나아가는 발판으로 삼으세요.',
  '실수는 성공의 디딤돌입니다.<br />함께 해결해 나가요!',
  '고민했던 흔적을 남기고,<br />더 나은 코드를 향해 나아가세요.',
  '작은 실수가 모여 큰 성장이 됩니다.<br />함께 해결해요!',
  '코드 여정에서 만난 문제들,<br />여기서 해결하며 경험으로 쌓아가세요.',
];

const Feedback: React.FC = () => {
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACK_URL;

  // 유저 인증 및 로그인 상태 확인
  useEffect(() => {
    fetch(`${baseUrl}/user/info`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.info) {
          console.log(data.info);
          dispatch(setUser(data.info)); // 유저 정보를 dispatch를 이용해서 리덕스 스토어에 저장
        } else {
          alert('로그인이 필요합니다.');
          navigate('/login'); // 로그인 페이지로 이동
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 오답 노트가 없을 때 랜덤 메시지 반환
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    return randomMessages[randomIndex];
  };

  // POST 요청: 코드와 질문을 보내고 데이터 수신
  const handleSubmitQuestion = async () => {
    const formattedCode = `\`\`\`\n${code}\n\`\`\``;
    try {
      const response = await fetch(`${baseUrl}/incorrect-note/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code: formattedCode, question }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setNoteData(data.data); // noteData를 설정할 때 data.data를 사용
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  // 오답노트 저장 요청
  const handleSave = async () => {
    try {
      const response = await fetch(`${baseUrl}/incorrect-note/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      alert('Note saved successfully!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="feedback">
      <div className="container">
        <div className="incorrect-note-section">
          {/* 오답노트 메시지와 내용 표시 */}
          {noteData ? (
            <>
              <IncorrectNote data={noteData} />
              {/* 오답노트 저장 버튼 */}
              <button className="save-button" onClick={handleSave}>
                Save Note
              </button>
              <button className="search-mento-button">아직 찾지 못하셨나요?</button>
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

          <button className="submit-button" onClick={handleSubmitQuestion}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
