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
      <ReactMarkdown className="note-content" remarkPlugins={[remarkGfm]}>
        {data.mdFile}
      </ReactMarkdown>
    </div>
  );
};

export default IncorrectNote;
