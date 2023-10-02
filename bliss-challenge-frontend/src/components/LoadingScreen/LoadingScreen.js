import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";
import ListScreen from "../ListScreen/ListScreen";

function LoadingScreen() {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [isResponseOK, setIsResponseOK] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health")
      .then((response) => {
        const isResponseOK = response.ok;
        setLoadingMessage(isResponseOK ? "OK" : "NOT OK");
        setIsResponseOK(isResponseOK);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingMessage("Error");
        setIsResponseOK(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="loading-screen">
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : isResponseOK ? (
        <ListScreen />
      ) : (
        <h2>{loadingMessage}</h2>
      )}
    </div>
  );
}

export default LoadingScreen;
