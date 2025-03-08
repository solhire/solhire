import { NextRequest, NextResponse } from 'next/server';
import { UserService, RegisterUserInput } from '@/services/user.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, password, displayName, accountType } = body;
    
    if (!email || !password || !displayName || !accountType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Validate account type
    if (!['client', 'creator', 'both'].includes(accountType)) {
      return NextResponse.json(
        { error: 'Invalid account type' },
        { status: 400 }
      );
    }
    
    // Register user
    const result = await UserService.registerUser(body as RegisterUserInput);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      userId: result.userId
    });
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 