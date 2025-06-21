var nodemailer = require("nodemailer");

// Check for required environment variables for email
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error(
    "ERROR: EMAIL_USER or EMAIL_PASS not defined in environment variables. Mailer will not be properly configured."
  );
  // Depending on application requirements, you might want to throw an error
  // or use a dummy transporter if email is not critical for all functionalities.
  // For now, it will proceed and likely fail when sending email if not set.
}

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., hello.petscan@gmail.com
    pass: process.env.EMAIL_PASS,   // e.g., your_gmail_app_password
  },
});

const transport = (mailOptions) => {
  // Only attempt to send mail if transporter seems configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Nodemailer Error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } else {
    console.log("Mail transporter not configured. Skipping email send.");
    // Optionally, return a rejected promise or handle as an error
    return Promise.reject("Mail transporter not configured.");
  }
};

module.exports = transport;
