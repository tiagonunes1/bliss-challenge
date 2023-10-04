const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parseer");

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});