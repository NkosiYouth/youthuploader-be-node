import { sendEmail } from "../emails/sendEmail";
import { magicLinkEmailTemplate, welcomeEmailTemplate } from "../emails/templates";

class EmailService {
  async sendWelcomeEmail(name: string, email: string): Promise<void> {
    const subject = "Welcome to Our Service";
    const html = welcomeEmailTemplate(name);
    await sendEmail(email, subject, html);
  }

  async sendMagicLinkEmail(name: string, email: string, link: string): Promise<void> {
    const subject = "Your Magic Login Link";
    const html = magicLinkEmailTemplate(name, link);
    await sendEmail(email, subject, html);
  }
}

export default new EmailService();
