import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import '../styles/folder.css';

// 폴더 타입 정의
interface FolderData {
  message: string;
  folder: {
    [key: string]: string[];
  };
}

function Folder() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [folderData, setFolderData] = useState<FolderData | null>(null);

  const baseUrl = import.meta.env.VITE_BACK_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setLoading(false);
      fetchFolderData();
    }
  }, [isLoggedIn, navigate]);

  const fetchFolderData = async () => {
    try {
      const response = await fetch(`${baseUrl}/incorrect-note/folder`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setFolderData(data);
      console.log(data.folder);
    } catch (error) {
      console.error('폴더 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="folder">
      <div className="container">
        {folderData && (
          <div>
            {Object.entries(folderData.folder).map(([category, items]) => (
              <div key={category}>
                <h2>{category}</h2>
                <ul>
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Folder;
