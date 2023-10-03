import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailScreen.css";

function DetailScreen() {
  const [question, setQuestion] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setQuestion(data);
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchQuestion();
  }, [id]);

  function handleVoteClick(question) {
    console.log(question);
  }

  return (
    <div>
      <h2>Question Details</h2>
      <Link to="/listing">Back to Listing</Link>

      <div className="poll-container">
        {question ? (
          <>
            <div className="poll-image">
              <img src={question.image_url} alt="Poll Image" />
            </div>
            <div className="poll-title">
              <h1>{question.question}</h1>
            </div>
            <div className="poll-options">
              {question.choices.map((choice, index) => (
                <div key={index}>
                  <p>Votes: <strong>{choice.votes}</strong></p> 
                  <button
                    key={index}
                    className="poll-option-button"
                    onClick={() => handleVoteClick(choice)}
                  >
                    {choice.choice}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Question not found</p>
        )}
      </div>
    </div>
  );
}

export default DetailScreen;
