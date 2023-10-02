import React, { useState, useEffect, useRef } from "react";
import "./ListScreen.css";

function ListScreen({ searchParam }) {
  const [questionList, setQuestionList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [offset, setOffset] = useState(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetch(
      `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}&filter=${encodeURIComponent(
        searchQuery
      )}`
    )
      .then((response) => {
        const isResponseOK = response.ok;
        return isResponseOK
          ? response.json()
          : Promise.reject(new Error(`HTTP Error: ${response.status}`));
      })
      .then((data) => {
        setQuestionList(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, [offset, searchQuery]);

  useEffect(() => {
    if (!searchParam && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchParam]);

  const handleSearchChange = (event) => {
    const newFilterValue = event.target.value;
    setSearchQuery(newFilterValue);

    const newUrl = new URL(window.location.href);
    const urlParams = new URLSearchParams(newUrl.search);
    urlParams.set("filter", newFilterValue);

    window.history.replaceState({}, "", `${newUrl.pathname}?${urlParams}`);
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };
  const openDetail = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };
  const shareQuestion = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const shareScreen = (data) => {
    const currentUrl = window.location.href;
    const apiUrl = `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/share?destination_email=tiagoalexandrenunes1@gmail.com&content_url=${currentUrl}`;
    fetch(apiUrl, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Screen share was successful");
        } else {
          console.error("Screen share failed");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  const filteredQuestions = questionList.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="list">
      <h2>Question List</h2>
      <button className="share-screen-button" onClick={shareScreen}>
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
            <tr key={index}>
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
    </div>
  );
}

export default ListScreen;
