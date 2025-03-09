import { NextResponse } from 'next/server';
import { initSocket, NextApiResponseWithSocket } from '@/lib/socket';

export async function GET(req: Request, res: NextApiResponseWithSocket) {
  try {
    const io = initSocket(res);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Socket initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize socket connection' },
      { status: 500 }
    );
  }
} 