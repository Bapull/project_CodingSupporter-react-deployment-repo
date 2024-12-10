import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import '../styles/folder.css';

interface FolderData {
  message: string;
  folder: {
    [key: string]: string[];
  };
}

const errorTypes: { [key: number]: string } = {
  1: "Logical Error",
  2: "Syntax Error",
  3: "Runtime Error",
  4: "Etc"
};

const Folder: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [folderData, setFolderData] = useState<FolderData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('내 폴더');

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await fetch(`${baseUrl}/incorrect-note/folder`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.status === 401) {
          // 401 에러 발생시 로그인 페이지로 리다이렉트
          navigate('/login');
          return;
        }

        if (!response.ok) throw new Error(`Error: ${response.status}`);
  
        const data = await response.json();
        setFolderData(data);
        console.log(data.folder);
      } catch (error) {
        console.error('폴더 데이터를 가져오는데 실패했습니다:', error);
        // 에러 발생시 사용자에게 알림
        alert('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    };

    if (isLoggedIn) {
      fetchFolderData();
    }
  }, [baseUrl, isLoggedIn, navigate]); // navigate 추가

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLanguageClick = (language: string) => setSelectedLanguage(language);

  return (
    <div className="folder-container">
      <div className="container">
        <div className="folder-sidebar">
          <ul>
            {folderData &&
              Object.keys(folderData.folder).map((language) => (
                <li
                  key={language}
                  onClick={() => handleLanguageClick(language)}
                  className={selectedLanguage === language ? 'active' : ''}
                >
                  {language}
                </li>
              ))}
          </ul>
        </div>
        <div className="folder-content">
          <div className="folder-search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="folder-grid">
            {folderData &&
              folderData.folder[selectedLanguage]?.map((errorNumber, index) => (
                <div key={index} className="folder-card">
                  <img src="/images/Folder-black.png" alt={`folder-${errorNumber}`} />
                  <p>{errorTypes[+errorNumber]}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folder;
