import '../styles/feedback.css';

function Feedback() {
  return (
    <div className="feedback">
      <div className="container">
        <div className="incorrect-note-section"></div>
        <div className="divider"></div>
        <div className="question-section">
          <h2 className="error-name">Error Type</h2>
          <textarea className="error-name-input" placeholder="Enter error type..."></textarea>

          <h2 className="error-code">Code</h2>
          <textarea className="error-code-input" placeholder="Enter code..."></textarea>

          <h2 className="error-question">Question</h2>
          <textarea className="error-question-input" placeholder="Enter question..."></textarea>
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
