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
      pass: "813e8cf8f3c0b6",
    },
  });

  const mailOptions = {
    from: "",
    to,
    subject,
    text,
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
