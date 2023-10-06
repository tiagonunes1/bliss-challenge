import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailScreen.css";

function DetailScreen() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { id } = useParams();

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
      const apiUrl = `http://private-anon-43da49f333-blissrecruitmentapi.apiary-mock.com/questions/${id}`;

      const payload = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          id: question.id,
         question: question.question,
          image_url: question.image_url,
          thumb_url: question.thumb_url,
          published_at: question.published_at,
          choices: question.choices.map((c) =>
            c.choice === choice.choice ? { ...c, votes: c.votes + 1 } : c
          ),
        }),
      };

      const response = await fetch(apiUrl, payload);

      if (response.ok) {
        fetchQuestion();
        setSuccessMessage("Vote successful!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Vote failed");
        setSuccessMessage("Vote failed!");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSuccessMessage("Network failed!");
    }
  };

  const handleShareClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendShare = async () => {
    try {
      const currentUrl = window.location.href;
      const apiUrl = `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=${currentUrl}`;

      const response = await fetch(apiUrl, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Screen share was successful");
        setShowModal(false);
        setSuccessMessage("Share sent successfully!");
      } else {
        console.error("Screen share failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="detail-container">
      <h2>Question Details</h2>
      <Link to="/" className="back-link">
        Back to Listing
      </Link>

      <div className="poll-container">
        {loading ? (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        ) : question ? (
          <>
            <div className="poll-image">
              <img src={question.image_url} alt="Poll Image" />
            </div>
            <div className="poll-details">
              <h1 className="poll-title">{question.question}</h1>
              {successMessage && (
                <div className="success-message">
                  <p>{successMessage}</p>
                </div>
              )}

              <div className="poll-options">
                {question.choices.map((choice, index) => (
                  <div key={index} className="poll-option">
                    <button
                      key={index}
                      className="poll-option-button"
                      onClick={() => handleVoteClick(choice)}
                    >
                      {choice.choice}
                    </button>
                    <p className="votes-count">Votes: {choice.votes}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="share-button-detail" onClick={handleShareClick}>
              Share
            </button>
          </>
        ) : (
          <p className="error-message">Question not found</p>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Share via Email</h2>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={sendShare}>Share</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailScreen;
