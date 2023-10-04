import React from "react";

function QuestionCard({ question, onClickDetail, onShareQuestion }) {
  return (
    <div className="question-card">
      <h3>{question.question}</h3>
      <p>ID: {question.id}</p>
      <p>Published: {new Date(question.published_at).toLocaleString()}</p>
      <button onClick={() => onClickDetail(question)}>Detail</button>
      <button onClick={() => onShareQuestion(question)}>Share Question</button>
    </div>
  );
}

export default QuestionCard;
