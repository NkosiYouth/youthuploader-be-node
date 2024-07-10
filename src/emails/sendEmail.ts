import sendGridMail from "@sendgrid/mail";

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'yawit@sayouthatwork.com',
    to,
    subject,
    html,
  };
  await sendGridMail.send(mailOptions);
};
