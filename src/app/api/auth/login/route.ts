import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Login user
    const result = await UserService.loginUser(email, password);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 401 }
      );
    }
    
    // Set refresh token as HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      accessToken: result.accessToken,
      userId: result.userId,
    });
    
    // Set cookie in the response
    response.cookies.set({
      name: 'solhire_refresh_token',
      value: result.refreshToken!,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 