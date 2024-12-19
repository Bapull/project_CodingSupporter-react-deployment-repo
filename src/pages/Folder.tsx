import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import IncorrectNote from '../components/IncorrectNote';
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

interface NoteFile {
  id: number;
  noteName: string;
}

interface NoteData {
  id: number;
  mentoId: number;
  studentId: number;
  errorType: number;
  language: string;
  noteName: string;
  chatName: string | null;
  mdFile: string;
}

const Folder: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [folderData, setFolderData] = useState<FolderData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('내 폴더');
  const [selectedError, setSelectedError] = useState<string | null>(null);
  const [files, setFiles] = useState<NoteFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<NoteData | null>(null);
  const [isViewModal, setIsViewModal] = useState(false);

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

  // 폴더 데이터 가져오기
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
  
        if (!response.ok) throw new Error(`Error: ${response.status}`);
  
        const data = await response.json();
        setFolderData(data);
      } catch (error) {
        console.error('폴더 데이터를 가져오는데 실패했습니다:', error);
        alert('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    };

    if (isLoggedIn) {
      fetchFolderData();
    }
  }, [baseUrl, isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 언어 선택
  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
    setSelectedError(null);
    setFiles([]);
  };

  // 뒤로가기 함수 추가
  const handleBack = () => {
    setSelectedError(null);
    setFiles([]);
  };

  // 에러타입 폴더 클릭
  const handleFolderClick = async (errorNumber: string) => {
    try {
      const response = await fetch(`${baseUrl}/incorrect-note?language=${selectedLanguage}&error-type=${errorNumber}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setFiles(data.notes);
      setSelectedError(errorNumber);
    } catch (error) {
      console.error('파일 목록을 가져오는데 실패했습니다:', error);
      alert('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleFileClick = async (fileName: string) => {
    try {
      const encodedFileName = encodeURIComponent(fileName);
      const response = await fetch(`${baseUrl}/incorrect-note/s3?note-name=${encodedFileName}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setSelectedFile(data);
      setIsViewModal(true);
    } catch (error) {
      console.error('파일을 가져오는데 실패했습니다:', error);
      alert('파일을 불러오는데 실패했습니다. 다시 시도해주세요.');
    }
  }

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
          
          {/* 에러 타입 폴더들 (선택된 에러가 없을 때만 표시) */}
          {!selectedError && (
            <div className="folder-grid">
              {folderData &&
                folderData.folder[selectedLanguage]?.map((errorNumber, index) => (
                  <div key={index} className="folder-card" onClick={() => handleFolderClick(errorNumber)}>
                    <img src="/images/Folder-black.png" alt={`folder-${errorNumber}`} />
                    <p>{errorTypes[+errorNumber]}</p>
                  </div>
                ))}
            </div>
          )}
          
          {/* 선택된 에러 타입의 파일 목록 */}
          {selectedError && files.length > 0 && (
            <div className="files-grid">
              <div className="files-header">
                <button onClick={handleBack} className="back-button">
                  ←
                </button>
                <h3>{errorTypes[+selectedError]} 노트 목록</h3>
              </div>
              <div className="files-container">
                {files.map((file, index) => (
                  <div key={index} className="file-card" onClick={() => handleFileClick(file.noteName)}>
                    <p>{file.noteName.slice(5).replace('.md', '')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 노트 모달창 */}
          {isViewModal && selectedFile && (
            <div className="modal-container" onClick={() => setIsViewModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setIsViewModal(false)}>X</button>
                <IncorrectNote data={selectedFile} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Folder;
