import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailScreen.css";

function DetailScreen() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchQuestion = async () => {
    try {
      setLoading(true);
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
      console.error(`Error fetching question: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleVoteClick = async (choice) => {
    try {
      const apiUrl = `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions/${id}/choice/${choice.choice}`;

      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (response.ok) {
        console.log("Vote was successful");
        fetchQuestion();
      } else {
        console.error("Vote failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const sendShare = async () => {
    try {
      const currentUrl = window.location.href;
      const apiUrl = `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/share?destination_email=tiagoalexandrenunes1@gmail.com&content_url=${currentUrl}`;

      const response = await fetch(apiUrl, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Screen share was successful");
      } else {
        console.error("Screen share failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <h2>Question Details</h2>
      <Link to="/">Back to Listing</Link>

      <div className="poll-container">
        {loading ? (
          <p>Loading...</p>
        ) : question ? (
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
                  <p>
                    Votes: <strong>{choice.votes}</strong>
                  </p>
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
            <div>
              <button className="share-button" onClick={() => sendShare()}>
                Share
              </button>
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
