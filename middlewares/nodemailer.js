const nodemailer = require("nodemailer");
const MAIL_ID = process.env.MAIL_ID;
const MAIL_PW = process.env.MAIL_PW;

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: MAIL_ID,
    pass: MAIL_PW,
  },
  port: 587,

  tls: {
    rejectUnAuthorized: false,
  },
});

module.exports = {
  smtpTransport,
};
