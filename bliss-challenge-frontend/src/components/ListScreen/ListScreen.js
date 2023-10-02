import React, { useState, useEffect } from "react";
import "./ListScreen.css";

function ListScreen() {
  const [questionList, setQuestionList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(
      `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}&filter=${searchQuery}`
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
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

  const filteredQuestions = questionList.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="list">
      <h2>Question List</h2>
      <div className="search-bar-container">
        <input
          type="text"
          id="search"
          className="search-bar"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={handleSearchChange}
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
              <td><button className="detail-button" onClick={openDetail}>Detail</button></td>
              <td><button className="share-button" onClick={shareQuestion}>Share</button></td>
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
