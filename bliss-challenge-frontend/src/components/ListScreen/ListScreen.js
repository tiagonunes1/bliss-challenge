import React, { useState, useEffect, useRef } from "react";
import "./ListScreen.css";
import DetailScreen from "../DetailScreen/DetailScreen";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ListScreen({ searchParam }) {
  const [questionList, setQuestionList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [offset, setOffset] = useState(0);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}&filter=${encodeURIComponent(
            searchQuery
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          setQuestionList(data);
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchQuestions();
  }, [offset, searchQuery]);

  useEffect(() => {
    if (!searchParam && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchParam]);

  const handleSearchChange = (e) => {
    const filter = e.target.value;
    setSearchQuery(filter);

    const { search, pathname } = window.location;
    const urlParams = new URLSearchParams(search);
    urlParams.set("filter", filter);

    const newUrl = `${pathname}?${urlParams}`;

    window.history.replaceState({}, "", newUrl);
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const shareQuestion = () => {
    // TODO: Implement shareQuestion functionality
  };

  const sendScreenShareRequest = async () => {
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

  const filteredQuestions = questionList.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (selectedQuestion) => {
    setSelectedQuestion(selectedQuestion);
  };

  const data = { foo: "bar" };

  function handleClickDetail(question) {
    navigate(`/questions/${question.id}`, { state: question });
  }

  return (
    <div className="list">
      <h2>Question List</h2>
      <button className="share-screen-button" onClick={sendScreenShareRequest}>
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
          className="feather feather-share" 
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>&nbsp;
        Share Screen
      </button>
      <div className="search-bar-container">
        <input
          type="text"
          id="search"
          className="search-bar"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={handleSearchChange}
          ref={searchInputRef}
        />
        <button
          id="searchButton"
          className="search-button"
          onClick={handleSearchChange}
        >
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
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          &nbsp;Search
        </button>
      </div>
      <div className="horizontal-cards-container">
        {filteredQuestions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            onClickDetail={handleClickDetail}
            onShareQuestion={shareQuestion}
          />
        ))}
      </div>

      <button className="load-more-button" onClick={loadMore}>
        Load More
      </button>
      {selectedQuestion && <DetailScreen question={selectedQuestion} />}
    </div>
  );
}

export default ListScreen;
