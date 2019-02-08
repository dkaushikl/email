const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const common = require("../../config/keys");
const Email = require("email-templates");

// const templates = require("../../Alert Schedule.html");

// @route   POST api/email
// @desc    POST Send Email
// @access  Public
router.post("/", (req, res) => {

  const email = new Email({
    message: {
      from: "techlession@gmail.com"
    },
    // uncomment below to send emails in development/test env:
    // send: true,
    transport: {
      jsonTransport: true
    }
  });

  const dataToSend = req.body.data;
  const smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: common.FROM_EMAIL,
      pass: common.FROM_EMAIL_PASSWORD
    }
  };
  const transporter = nodemailer.createTransport(smtpConfig);

  email
    .send({
      template: "mars",
      message: {
        to: req.body.to
      },
      locals: {
        name: req.body.data
      }
    })
    .then(tem => {
      console.log(tem)
      transporter.sendMail(
        tem.originalMessage,
        (error, data) => {
          if (error) {
            console.log("Error to send email", error);
            res.send("Failed");
            res.send({
              status: 'Failed',
              message: "Email failed to send, Please try again."
            });
          } else {
            console.log(data)
            res.send({
              status: 'Success',
              message: "Email sent successfully"
            });
          }
        }
      );
    })
    .catch(console.error);
});

module.exports = router;
