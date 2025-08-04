const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // <-- Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// POST route to handle contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    logger: true,
    debug: true
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error.response || error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
