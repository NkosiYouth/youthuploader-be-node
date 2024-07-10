import { AuthDocument } from "../types";
import AuthModel from "../models/AuthModel";
import TokenService from "./TokenService";
import EmailService from "./EmailService";

class AuthService {
  async createAuthUser(data: Partial<AuthDocument>): Promise<AuthDocument> {
    try {
      const newUser = await AuthModel.create(data);
      return newUser;
    } catch (error: any) { // Explicitly specify 'error' as 'any' type
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async checkAuthUserExistsByEmail(email: string): Promise<boolean> {
    const user = await AuthModel.findOne({ email });
    return !!user;
  }

  async generateMagicLink(email: string): Promise<void> {
    try {
      const user = await AuthModel.findOne({ email });
      const token = TokenService.generateAccessToken(user!);
      const magicLink = `${process.env.CLIENT_URL}/magic-login?token=${token}`;
      await EmailService.sendMagicLinkEmail(user!.firstName, user!.email, magicLink);
    } catch (error) {
      console.log(error);
      throw new Error("Error while sending email!");
    }
  }

  async verifyToken(token: string): Promise<AuthDocument | null> {
    const decoded = TokenService.verifyAccessToken(token) as { email: string } | null;
    if (!decoded) {
      return null;
    }
    const user = await AuthModel.findOne({ email: decoded.email });
    return user;
  }

}

export default new AuthService();
