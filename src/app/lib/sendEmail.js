// lib/sendEmail.js
import nodemailer from 'nodemailer';

// 1) Configure your SMTP transporter. 
//    Here, we read SMTP credentials from environment variables.
//    In development, you can use a service like Mailtrap or a Gmail account (less secure).
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,            // e.g., "smtp.mailtrap.io" or "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT),    // e.g., 587 (TLS) or 465 (SSL)
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_USER,          // e.g., Mailtrap username or Gmail address
    pass: process.env.SMTP_PASS,          // e.g., Mailtrap password or Gmail app password
  },
});

// 2) Verify transporter configuration (optional but useful in dev)
transporter.verify((err, success) => {
  if (err) {
    console.error('🚨 SMTP configuration error:', err);
  } else {
    console.log('✅ SMTP transporter ready');
  }
});

/**
 * sendResetEmail
 *
 * @param {string} toEmail  The user's email address (e.g., "user@example.com")
 * @param {string} resetLink  The full URL they should click (e.g., "http://localhost:3000/reset-password?token=...")
 */
export async function sendResetEmail(toEmail, resetLink) {
  // 3) Compose your email options
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'no-reply@yourdomain.com',
    to: toEmail,
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Password Reset Request</h2>
        <p>If you requested to reset your password, click the link below. Otherwise, you can safely ignore this message.</p>
        <p>
          <a 
            href="${resetLink}" 
            style="display: inline-block; margin: 12px 0; padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 4px;"
          >
            Reset Password
          </a>
        </p>
        <p style="font-size: 0.9em; color: #555;">
          (If the button doesn't work, copy and paste this URL into your browser: <br/> 
          <code>${resetLink}</code>)
        </p>
        <hr/>
        <p style="font-size: 0.8em; color: #888;">If you did not request a password reset, no further action is required.</p>
      </div>
    `,
  };

  // 4) Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✉️  Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('🚨 Error sending email:', err);
    throw err;
  }
}
