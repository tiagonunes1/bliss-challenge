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
    </div>
  );
}

export default QuestionCard;
