import React, { useState, useEffect } from "react";

function DetailScreen() {
  const [questionDetail, setQuestionDetail] = useState([]);

  useEffect(() => {
    fetch(
      `https://private-anon-4009a38254-blissrecruitmentapi.apiary-mock.com/questions/`
    )
      .then((response) => {
        const isResponseOK = response.ok;
        return isResponseOK
          ? response.json
          : Promise.reject(new Error(`HTTP Error: ${response.status}`));
      })
      .then((data) => {
        setQuestionDetail(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });
  return (
  <div className="detail-container">
    
  </div>
  );
}

export default DetailScreen;
