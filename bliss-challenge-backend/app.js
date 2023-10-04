const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post("/share", (req, res) => {
  const { to, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6d7c97bd727cb4",
      pass: "83721964",
    },
  });

  const mailOptions = {
    from: "f642452c8a-2c26b6+1@inbox.mailtrap.io",
    to: "tiagonunes.63.gpsi@gmail.com",
    subject: "Page share",
    text: "This is the email body text.",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: "Failed to send email" });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ message: "Email sent sucessfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
