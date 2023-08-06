import nodemailer from 'nodemailer';


export enum EMAIL_CONTENT {
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM_NODEMAILER,
    pass: process.env.PASSWORD_FROM_NODEMAILER,
  },
});


function listEmails(emailContent: EMAIL_CONTENT, data: any) {
  switch (emailContent) {
    case EMAIL_CONTENT.REGISTER:
      return {
        subject: 'Welcome to my app',
        text: `Hello ${data.name}, welcome to ${process.env.APP_NAME}`,
      };
    case EMAIL_CONTENT.FORGOT_PASSWORD:
      return {
        subject: 'Forgot password',
        text: `Hello ${data.name}, you forgot your password, here is your code: ${data.code} to reset your password`,
      };
    case EMAIL_CONTENT.RESET_PASSWORD:
      return {
        subject: 'Reset password',
        text: `Hello ${data.name}, your password has been reset. You can now login with your new password`,
      };
  }
}

export function sendEmail(to: string, emailContent: EMAIL_CONTENT, data: any) {
  const { subject, text } = listEmails(emailContent, data);
  const mailOptions = {
    from: process.env.EMAIL_FROM_NODEMAILER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
