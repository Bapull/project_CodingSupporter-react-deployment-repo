import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './styles/incorrectNote.css';

interface NoteData {
  language: string;
  errorType: number;
  mdFile: string;
}

const IncorrectNote: React.FC<{ data: NoteData }> = ({ data }) => {
  console.log('Raw Markdown:', data.mdFile); // Markdown 원본 확인

  return (
    <div className="note-container">
      <pre className="test">{data.mdFile}</pre>
      <ReactMarkdown className="note-content" remarkPlugins={[remarkGfm]}>
        {data.mdFile}
      </ReactMarkdown>
    </div>
  );
};

export default IncorrectNote;
