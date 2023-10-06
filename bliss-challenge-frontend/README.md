# Bliss Challenge Frontend

This is the front-end portion of the Bliss Challenge project. It's a React-based web application that allows users to view and interact with questions and choices.


![Bliss Challenge app](https://i.imgur.com/9z47JaR.jpg)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Getting Started

Follow the instructions below to get this project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager) should be installed on your computer.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/tiagonunes1/bliss-challenge.git
   cd bliss-challenge/bliss-challenge-frontend

### Install the project dependencies:

```sh
npm install

```

### Usage
Once you have installed the project and its dependencies, you can run the front-end application with the following command:

```sh
npm start

```

### Project Structure
Here's an overview of the project structure:

```sh 
.
├── README.md
├── bliss-challenge-frontend
│   ├── README.md
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.jsx
│       ├── components
│       │   ├── DetailScreen
│       │   │   ├── DetailScreen.css
│       │   │   └── DetailScreen.js
│       │   ├── ListScreen
│       │   │   ├── ListScreen.css
│       │   │   └── ListScreen.js
│       │   ├── LoadingScreen
│       │   │   ├── LoadingScreen.css
│       │   │   └── LoadingScreen.js
│       │   ├── NoConnectivityScreen
│       │   │   ├── NoConnectivityScreen.css
│       │   │   └── NoConnectivityScreen.js
│       │   ├── QuestionCard
│       │   │   └── QuestionCard.js
│       │   └── ShareScreen
│       │       └── ShareScreen.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
```