const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, text }) => {
  const msg = { to, from, subject, text };
  return sendgrid.send(msg);
};

module.exports = { sendEmail };