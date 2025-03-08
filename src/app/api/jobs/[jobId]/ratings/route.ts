import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Get ratings for a job
export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;

    const ratings = await prisma.jobRating.findMany({
      where: { jobId },
      include: {
        user: {
          select: {
            displayName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Error fetching job ratings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add or update a rating
export async function POST(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = params;
    const { rating, comment } = await request.json();

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if user has already rated this job
    const existingRating = await prisma.jobRating.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId: userProfile.id,
        },
      },
    });

    if (existingRating) {
      // If rating value changed, update job counts
      if (existingRating.rating !== rating) {
        await prisma.job.update({
          where: { id: jobId },
          data: {
            likesCount: {
              increment: rating === 1 ? 1 : -1,
            },
            dislikesCount: {
              increment: rating === 0 ? 1 : -1,
            },
          },
        });
      }

      // Update existing rating
      const updatedRating = await prisma.jobRating.update({
        where: {
          jobId_userId: {
            jobId,
            userId: userProfile.id,
          },
        },
        data: {
          rating,
          comment,
        },
        include: {
          user: {
            select: {
              displayName: true,
              avatar: true,
            },
          },
        },
      });

      return NextResponse.json(updatedRating);
    }

    // Create new rating
    const newRating = await prisma.jobRating.create({
      data: {
        job: {
          connect: { id: jobId },
        },
        user: {
          connect: { id: userProfile.id },
        },
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    // Update job rating counts
    await prisma.job.update({
      where: { id: jobId },
      data: {
        likesCount: {
          increment: rating === 1 ? 1 : 0,
        },
        dislikesCount: {
          increment: rating === 0 ? 1 : 0,
        },
      },
    });

    return NextResponse.json(newRating);
  } catch (error) {
    console.error('Error rating job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a rating
export async function DELETE(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = params;

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Get existing rating
    const existingRating = await prisma.jobRating.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId: userProfile.id,
        },
      },
    });

    if (!existingRating) {
      return NextResponse.json({ error: 'Rating not found' }, { status: 404 });
    }

    // Update job rating counts
    await prisma.job.update({
      where: { id: jobId },
      data: {
        likesCount: {
          decrement: existingRating.rating === 1 ? 1 : 0,
        },
        dislikesCount: {
          decrement: existingRating.rating === 0 ? 1 : 0,
        },
      },
    });

    // Delete rating
    await prisma.jobRating.delete({
      where: {
        jobId_userId: {
          jobId,
          userId: userProfile.id,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting rating:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 