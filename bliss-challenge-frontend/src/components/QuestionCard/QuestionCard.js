import React from "react";

function QuestionCard({ question, onClickDetail, onShareQuestion }) {
  return (
    <div onClick={() => onClickDetail(question)} className="question-card">
      <h3>{question.question}</h3>
      <p>ID: {question.id}</p>
      <p>Published: {new Date(question.published_at).toLocaleString()}</p>
      <button className="card-detail" onClick={() => onClickDetail(question)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-info"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
        &nbsp;Detail
      </button>
      <button className="card-share" onClick={() => onShareQuestion(question)}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="15"
          height="15"
          className="main-grid-item-icon"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" x2="21" y1="14" y2="3" />
        </svg>
        &nbsp;Share
      </button>
    </div>
  );
}

export default QuestionCard;
