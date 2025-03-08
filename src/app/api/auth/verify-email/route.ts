import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    const result = await UserService.verifyEmail(token);
    
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
    console.error('Error in verify-email route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 