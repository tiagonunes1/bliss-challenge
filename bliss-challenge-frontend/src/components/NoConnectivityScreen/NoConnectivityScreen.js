import React, { useState, useEffect } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function NoConnectivityScreen() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleNetworkChange = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  return (
    <>
      {!isOnline ? (
        <div className="no-connectivity-screen">
          <p>
            You are currently offline. Please check your internet connection.
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default NoConnectivityScreen;
