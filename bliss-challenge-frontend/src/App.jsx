import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import DetailScreen from "./components/DetailScreen/DetailScreen";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/questions/:id" element={<DetailScreen />} />
          <Route path="*" element={<LoadingScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
