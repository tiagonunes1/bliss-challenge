import React from "react";

function QuestionCard({ question, onClickDetail, onShareQuestion }) {
  return (
    <div onClick={() => onClickDetail(question)} className="question-card">
      <h3>{question.question}</h3>
      <p>ID: {question.id}</p>
      <p>Published: {new Date(question.published_at).toLocaleString()}</p>
    </div>
  );
}

export default QuestionCard;
