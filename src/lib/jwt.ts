import jwt from 'jsonwebtoken';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'solhire-jwt-secret-key-development';

// Token types
export type TokenType = 'access' | 'refresh' | 'verification' | 'passwordReset';

// Token payload interface
export interface TokenPayload {
  userId: string;
  email: string;
  type: TokenType;
  [key: string]: any; // Allow additional properties
}

// Token expiration times (in seconds)
const tokenExpiration: Record<TokenType, number> = {
  access: 60 * 60, // 1 hour
  refresh: 60 * 60 * 24 * 7, // 7 days
  verification: 60 * 60 * 24, // 24 hours
  passwordReset: 60 * 60, // 1 hour
};

/**
 * Generate a JWT token
 */
export function generateToken(
  payload: Omit<TokenPayload, 'exp'>,
  type: TokenType
): string {
  const expiresIn = tokenExpiration[type];
  
  return jwt.sign(
    { ...payload, type },
    JWT_SECRET,
    { expiresIn }
  );
}

/**
 * Verify a JWT token
 */
export function verifyToken<T extends TokenPayload>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Generate an access token
 */
export function generateAccessToken(userId: string, email: string): string {
  return generateToken({ userId, email, type: 'access' }, 'access');
}

/**
 * Generate a refresh token
 */
export function generateRefreshToken(userId: string, email: string): string {
  return generateToken({ userId, email, type: 'refresh' }, 'refresh');
}

/**
 * Generate a verification token
 */
export function generateVerificationToken(userId: string, email: string): string {
  return generateToken({ userId, email, type: 'verification' }, 'verification');
}

/**
 * Generate a password reset token
 */
export function generatePasswordResetToken(userId: string, email: string): string {
  return generateToken({ userId, email, type: 'passwordReset' }, 'passwordReset');
}

/**
 * Verify an access token
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  const payload = verifyToken<TokenPayload>(token);
  if (!payload || payload.type !== 'access') {
    return null;
  }
  return payload;
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload | null {
  const payload = verifyToken<TokenPayload>(token);
  if (!payload || payload.type !== 'refresh') {
    return null;
  }
  return payload;
}

/**
 * Verify a verification token
 */
export function verifyVerificationToken(token: string): TokenPayload | null {
  const payload = verifyToken<TokenPayload>(token);
  if (!payload || payload.type !== 'verification') {
    return null;
  }
  return payload;
}

/**
 * Verify a password reset token
 */
export function verifyPasswordResetToken(token: string): TokenPayload | null {
  const payload = verifyToken<TokenPayload>(token);
  if (!payload || payload.type !== 'passwordReset') {
    return null;
  }
  return payload;
} 