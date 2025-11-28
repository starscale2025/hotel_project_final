const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendStatusMail = async (email, name, status) => {
  let subject = "";
  let message = "";

  if (status === "confirmed") {
    subject = "Your Booking is Confirmed ✔️";
    message = `<h2>Dear ${name},</h2>
    <p>Your room booking has been successfully <b>confirmed</b>.</p>
    <p>We look forward to hosting you.</p>`;
  }

  if (status === "rejected") {
    subject = "Booking Status Update ❌";
    message = `<h2>Dear ${name},</h2>
    <p>Unfortunately, your room booking has been <b>rejected</b>.</p>
    <p>Please contact support for more help.</p>`;
  }

  return transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: message
  });
};

module.exports = { sendStatusMail };
