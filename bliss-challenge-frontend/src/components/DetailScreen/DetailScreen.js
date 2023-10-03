import React from "react";

function DetailScreen({ question }) {
  return (
    <div>
      <h2>{question.question}</h2>
      <p>ID: {question.id}</p>
      <p>Question: {question.question}</p>
      <p>Published At: {new Date(question.published_at).toLocaleString()}</p>
    </div>
  );
}

export default DetailScreen;
