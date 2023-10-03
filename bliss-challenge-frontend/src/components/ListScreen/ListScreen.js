import React, { useState, useEffect, useRef } from "react";
import "./ListScreen.css";
import DetailScreen from "../DetailScreen/DetailScreen";

function ListScreen({ searchParam }) {
  const [questionList, setQuestionList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [offset, setOffset] = useState(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}&filter=${encodeURIComponent(searchQuery)}`
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
  
  const openDetail = () => {
    // TODO: Implement openDetail functionality
  };
  const shareQuestion = () => {
    // TODO: Implement openDetail functionality
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

  return (
    <div className="list">
      <h2>Question List</h2>
      <button className="share-screen-button" onClick={sendScreenShareRequest}>
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
          Search
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Question</th>
            <th>Published</th>
            <th>Detail</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question, index) => (
            <tr key={index} onClick={() => handleRowClick(selectedQuestion)}>
              <td>{question.id}</td>
              <td>{question.question}</td>
              <td>{new Date(question.published_at).toLocaleString()}</td>
              <td>
                <button className="detail-button" onClick={openDetail}>
                  Detail
                </button>
              </td>
              <td>
                <button className="share-button" onClick={shareQuestion}>
                  Share Question
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="load-more-button" onClick={loadMore}>
        Load More
      </button>
      {selectedQuestion && <DetailScreen question={selectedQuestion} />}
    </div>
  );
}

export default ListScreen;
