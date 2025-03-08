import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';

// Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const result = await UserService.requestPasswordReset(email);
    
    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'If your email is registered, you will receive a password reset link'
    });
  } catch (error) {
    console.error('Error in reset-password route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Reset password with token
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;
    
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    const result = await UserService.resetPassword(token, password);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error in reset-password route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 