import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a random password
 */
export function generateRandomPassword(length = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

/**
 * Check password strength
 * Returns an object with a score (0-4) and feedback
 */
export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string;
} {
  // Initialize score
  let score = 0;
  const feedback: string[] = [];
  
  // Check length
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long.');
  } else {
    score += 1;
  }
  
  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters.');
  }
  
  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters.');
  }
  
  // Check for numbers
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers.');
  }
  
  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add special characters.');
  }
  
  // Normalize score to 0-4 range
  const normalizedScore = Math.min(4, Math.floor(score / 5 * 4));
  
  // Generate feedback message based on score
  let feedbackMessage = '';
  
  if (normalizedScore === 0) {
    feedbackMessage = 'Very weak password. ' + feedback.join(' ');
  } else if (normalizedScore === 1) {
    feedbackMessage = 'Weak password. ' + feedback.join(' ');
  } else if (normalizedScore === 2) {
    feedbackMessage = 'Moderate password. ' + (feedback.length ? feedback.join(' ') : 'Consider making it stronger.');
  } else if (normalizedScore === 3) {
    feedbackMessage = 'Strong password. ' + (feedback.length ? feedback.join(' ') : '');
  } else {
    feedbackMessage = 'Very strong password!';
  }
  
  return {
    score: normalizedScore,
    feedback: feedbackMessage.trim(),
  };
} 