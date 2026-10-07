const nodemailer = require('nodemailer');
const axios = require('axios');

const sendEmail = async (options) => {
  // 1. Use Resend API if key is present (Bypasses Gmail SMTP authentication issues)
  if (process.env.RESEND_API_KEY) {
    try {
      const fromAddress = process.env.RESEND_FROM_EMAIL || 'OMVIK System <onboarding@resend.dev>';
      const response = await axios.post(
        'https://api.resend.com/emails',
        {
          from: fromAddress,
          to: Array.isArray(options.email) ? options.email : [options.email],
          subject: options.subject,
          text: options.message,
          html: options.html,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Email sent via Resend API successfully. ID:', response.data.id);
      return response.data;
    } catch (resendError) {
      console.error('Resend API failed, falling back to Nodemailer SMTP:', resendError.response ? resendError.response.data : resendError.message);
    }
  }

  // 2. Fallback to Nodemailer SMTP / Gmail
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('gmail')) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '',
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  const message = {
    from: `"${process.env.FROM_NAME || 'OMVIK System'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent via Nodemailer SMTP:', info.messageId);
  return info;
};

module.exports = sendEmail;
