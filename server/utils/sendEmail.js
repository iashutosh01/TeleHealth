const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: `"TeleHealth" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    console.log("📧 Sending email to:", to);
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
