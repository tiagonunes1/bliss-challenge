import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

function DetailScreen() {
  const { id } = useParams();
  const location = useLocation();
  //const question = location.state?.question;

  const image_url = location.state.image_url;
  const thumb_url = location.state.thumb_url;
  const question = location.state.question;
  const published_at = location.state.published_at;
  const choices = location.state.choices;

  return (
    <div>
      <h2>Question Details</h2>
      <Link to="/listing">Back to Listing</Link>
      <div>
        <h3>Question:</h3>
        {question ? (
          <div>
            <p>ID: {id}</p>
            <p>Question: {question}</p>
            <p>Published At: {published_at}</p>
          </div>
        ) : (
          <p>Question not found</p>
        )}
      </div>
    </div>
  );
}

export default DetailScreen;
