import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { UploadService } from '@/services/upload.service';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string || 'uploads';
    const maxSize = Number(formData.get('maxSize')) || 5; // Default 5MB

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Upload the file
    const fileUrl = await UploadService.uploadFile(file, path, maxSize);

    return NextResponse.json({ url: fileUrl, success: true });
  } catch (error) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
} 