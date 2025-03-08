import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/password';
import { 
  generateAccessToken, 
  generateRefreshToken,
  generateVerificationToken,
  generatePasswordResetToken,
  verifyVerificationToken,
  verifyPasswordResetToken
} from '@/lib/jwt';
import { 
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendWelcomeEmail
} from '@/lib/email';

export interface RegisterUserInput {
  email: string;
  password: string;
  displayName: string;
  username?: string;
  accountType: 'client' | 'creator' | 'both';
}

export interface LoginResult {
  success: boolean;
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export class UserService {
  /**
   * Register a new user
   */
  static async registerUser(input: RegisterUserInput): Promise<{ success: boolean; userId?: string; message?: string }> {
    try {
      const { email, password, displayName, username, accountType } = input;
      
      // Check if email already exists
      const existingUser = await prisma.userProfile.findFirst({
        where: { email: email.toLowerCase() }
      });
      
      if (existingUser) {
        return { success: false, message: 'Email already in use' };
      }
      
      // Generate username if not provided
      const finalUsername = username || this.generateUsername(displayName);
      
      // Check if username already exists
      const existingUsername = await prisma.userProfile.findUnique({
        where: { username: finalUsername }
      });
      
      if (existingUsername) {
        return { success: false, message: 'Username already taken' };
      }
      
      // Hash password
      const hashedPassword = await hashPassword(password);
      
      // Create user
      const user = await prisma.userProfile.create({
        data: {
          email: email.toLowerCase(),
          displayName,
          username: finalUsername,
          role: accountType,
          // Store hashed password in a secure way
          // Note: In a real app, you might want to use a separate table for auth
          // This is simplified for the example
          walletAddress: hashedPassword // Using walletAddress field to store password temporarily
        }
      });
      
      // Generate verification token
      const verificationToken = generateVerificationToken(user.id, user.email);
      
      // Send verification email
      await sendVerificationEmail(user.email, verificationToken, user.displayName);
      
      return { success: true, userId: user.id };
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, message: 'Failed to register user' };
    }
  }
  
  /**
   * Login user
   */
  static async loginUser(email: string, password: string): Promise<LoginResult> {
    try {
      // Find user by email
      const user = await prisma.userProfile.findFirst({
        where: { email: email.toLowerCase() }
      });
      
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }
      
      // Verify password (using walletAddress field as temporary password storage)
      const isPasswordValid = await verifyPassword(password, user.walletAddress || '');
      
      if (!isPasswordValid) {
        return { success: false, message: 'Invalid email or password' };
      }
      
      // Generate tokens
      const accessToken = generateAccessToken(user.id, user.email);
      const refreshToken = generateRefreshToken(user.id, user.email);
      
      return {
        success: true,
        userId: user.id,
        accessToken,
        refreshToken
      };
    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false, message: 'Failed to login' };
    }
  }
  
  /**
   * Verify email
   */
  static async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verify token
      const payload = verifyVerificationToken(token);
      
      if (!payload) {
        return { success: false, message: 'Invalid or expired verification token' };
      }
      
      // Update user
      const user = await prisma.userProfile.update({
        where: { id: payload.userId },
        data: { isVerified: true }
      });
      
      // Send welcome email
      await sendWelcomeEmail(user.email, user.displayName);
      
      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      console.error('Error verifying email:', error);
      return { success: false, message: 'Failed to verify email' };
    }
  }
  
  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Find user by email
      const user = await prisma.userProfile.findFirst({
        where: { email: email.toLowerCase() }
      });
      
      if (!user) {
        // Don't reveal that the email doesn't exist
        return { success: true, message: 'If your email is registered, you will receive a password reset link' };
      }
      
      // Generate password reset token
      const resetToken = generatePasswordResetToken(user.id, user.email);
      
      // Send password reset email
      await sendPasswordResetEmail(user.email, resetToken, user.displayName);
      
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('Error requesting password reset:', error);
      return { success: false, message: 'Failed to request password reset' };
    }
  }
  
  /**
   * Reset password
   */
  static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verify token
      const payload = verifyPasswordResetToken(token);
      
      if (!payload) {
        return { success: false, message: 'Invalid or expired reset token' };
      }
      
      // Hash new password
      const hashedPassword = await hashPassword(newPassword);
      
      // Update user
      await prisma.userProfile.update({
        where: { id: payload.userId },
        data: { walletAddress: hashedPassword }
      });
      
      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, message: 'Failed to reset password' };
    }
  }
  
  /**
   * Generate a username from display name
   */
  private static generateUsername(displayName: string): string {
    // Remove spaces, special characters, and convert to lowercase
    const baseUsername = displayName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 15);
    
    // Add random numbers to ensure uniqueness
    const randomSuffix = Math.floor(Math.random() * 10000);
    
    return `${baseUsername}${randomSuffix}`;
  }
} 