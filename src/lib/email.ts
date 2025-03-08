import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Initialize Resend if API key is available
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Fallback to nodemailer with SMTP for development or if Resend is not configured
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

// Create a nodemailer transporter as fallback
const transporter = !resend ? nodemailer.createTransport(smtpConfig) : null;

// Email templates
const emailTemplates = {
  verification: (token: string, username: string) => ({
    subject: 'Verify your SolHire account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #8b5cf6; margin-bottom: 5px;">SolHire</h1>
          <p style="color: #666; margin-top: 0;">The marketplace for creative professionals</p>
        </div>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="margin-top: 0;">Verify your email address</h2>
          <p>Hi ${username},</p>
          <p>Thank you for signing up for SolHire! Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #8b5cf6;">${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
        <div style="text-align: center; color: #666; font-size: 12px;">
          <p>If you didn't create an account on SolHire, you can safely ignore this email.</p>
          <p>&copy; ${new Date().getFullYear()} SolHire. All rights reserved.</p>
        </div>
      </div>
    `,
  }),
  
  passwordReset: (token: string, username: string) => ({
    subject: 'Reset your SolHire password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #8b5cf6; margin-bottom: 5px;">SolHire</h1>
          <p style="color: #666; margin-top: 0;">The marketplace for creative professionals</p>
        </div>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="margin-top: 0;">Reset your password</h2>
          <p>Hi ${username},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #8b5cf6;">${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
        <div style="text-align: center; color: #666; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} SolHire. All rights reserved.</p>
        </div>
      </div>
    `,
  }),
  
  welcome: (username: string) => ({
    subject: 'Welcome to SolHire!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #8b5cf6; margin-bottom: 5px;">SolHire</h1>
          <p style="color: #666; margin-top: 0;">The marketplace for creative professionals</p>
        </div>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="margin-top: 0;">Welcome to SolHire!</h2>
          <p>Hi ${username},</p>
          <p>Thank you for joining SolHire! We're excited to have you as part of our community.</p>
          <p>Here are a few things you can do to get started:</p>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Complete your profile to stand out to potential clients</li>
            <li>Browse available projects and submit proposals</li>
            <li>Connect your Solana wallet to receive payments</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to Dashboard</a>
          </div>
        </div>
        <div style="text-align: center; color: #666; font-size: 12px;">
          <p>If you have any questions, please contact our support team.</p>
          <p>&copy; ${new Date().getFullYear()} SolHire. All rights reserved.</p>
        </div>
      </div>
    `,
  }),
};

// Send email function
export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || 'noreply@solhire.net',
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    // Use Resend if available
    if (resend) {
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      
      if (error) {
        console.error('Error sending email with Resend:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }
      
      return { success: true, messageId: data?.id };
    } 
    // Fallback to nodemailer
    else if (transporter) {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
      });
      
      return { success: true, messageId: info.messageId };
    } 
    // No email service configured
    else {
      console.warn('No email service configured. Email not sent.');
      return { success: false, error: 'No email service configured' };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper functions for common email types
export async function sendVerificationEmail(email: string, token: string, username: string) {
  const template = emailTemplates.verification(token, username);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string, username: string) {
  const template = emailTemplates.passwordReset(token, username);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendWelcomeEmail(email: string, username: string) {
  const template = emailTemplates.welcome(username);
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
  });
} 