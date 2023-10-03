import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import DetailScreen from "./components/DetailScreen/DetailScreen";

describe("App Component", () => {
  it("renders LoadingScreen by default", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByTestId("loading-screen")).toBeInTheDocument();
  });

  it("renders DetailScreen for /questions/:id route", () => {
    render(
      <Router initialEntries={["/questions/123"]}>
        <App />
      </Router>
    );

    expect(screen.getByTestId("detail-screen")).toBeInTheDocument();
  });
});
