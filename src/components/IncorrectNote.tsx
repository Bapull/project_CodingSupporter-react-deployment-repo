import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './styles/incorrectNote.css';

interface NoteData {
  language: string;
  errorType: number;
  mdFile: string;
}

const IncorrectNote: React.FC<{ data: NoteData }> = ({ data }) => {
  return (
    <div className="note-container">
      <ReactMarkdown
        className="note-content"
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 style={{ fontWeight: 'bold' }} {...props} />,
          h2: ({ node, ...props }) => <h2 style={{ fontWeight: 'bold' }} {...props} />,
        }}
      >
        {data.mdFile}
      </ReactMarkdown>
    </div>
  );
};

export default IncorrectNote;
// 입력 전 문ㄱ
