const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parseer");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post("/share", (req, res) => {
  const { to, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    service: "",
    auth: {
      user: "",
      pass: "",
    },
  });

  const mailOptions = {
    from: "",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ message: "Email sent sucessfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
