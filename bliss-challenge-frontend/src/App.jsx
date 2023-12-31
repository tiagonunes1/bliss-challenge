import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import DetailScreen from "./components/DetailScreen/DetailScreen";
import NoConnectivityScreen from "./components/NoConnectivityScreen/NoConnectivityScreen";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NoConnectivityScreen />
      <Router>
        <Routes>
          <Route path="/questions/:id" element={<DetailScreen />} />
          <Route path="*" element={<LoadingScreen />} />
          <Route path="/no-connectivity" component={NoConnectivityScreen} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
