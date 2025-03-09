import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import NotificationCenter from '@/components/notifications/NotificationCenter';

// Input validation schema
const searchParamsSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  skills: z.string().optional(),
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  sortBy: z.enum(['newest', 'budget_high', 'budget_low', 'most_proposals']).optional(),
  page: z.string().optional()
});

// Get all jobs with optional filters and search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate input parameters
    const validatedParams = searchParamsSchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!validatedParams.success) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: validatedParams.error.errors },
        { status: 400 }
      );
    }

    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const skillsFilter = searchParams.get('skills')?.split(',').filter(Boolean);
    const minBudget = searchParams.get('minBudget') ? Number(searchParams.get('minBudget')) : undefined;
    const maxBudget = searchParams.get('maxBudget') ? Number(searchParams.get('maxBudget')) : undefined;
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = Number(searchParams.get('page')) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    // Build where clause
    const where: Prisma.JobWhereInput = {
      status: 'open', // Only show open jobs
    };

    // Full-text search on title and description
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    // Changed from hasEvery to hasSome for more flexible skill matching
    if (skillsFilter?.length) {
      where.skills = {
        hasSome: skillsFilter,
      };
    }

    // Apply budget filters
    if (minBudget !== undefined && !isNaN(minBudget)) {
      where.budget = {
        gte: minBudget,
        ...(maxBudget !== undefined && !isNaN(maxBudget) ? { lte: maxBudget } : {}),
      };
    } else if (maxBudget !== undefined && !isNaN(maxBudget)) {
      where.budget = { lte: maxBudget };
    }

    // Build orderBy clause with type safety
    let orderBy: Prisma.JobOrderByWithRelationInput;
    
    switch (sortBy) {
      case 'budget_high':
        orderBy = { budget: 'desc' };
        break;
      case 'budget_low':
        orderBy = { budget: 'asc' };
        break;
      case 'most_proposals':
        orderBy = {
          proposalsList: {
            _count: 'desc'
          }
        };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Get total count for pagination
    const total = await prisma.job.count({ where });

    // Get jobs with pagination and eager loading of related data
    const jobs = await prisma.job.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        client: {
          select: {
            displayName: true,
            avatar: true,
            rating: true,
          },
        },
        _count: {
          select: {
            proposalsList: true
          }
        }
      },
    });

    // Transform the response
    const transformedJobs = jobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      category: job.category,
      budget: job.budget,
      timeframe: job.timeframe,
      skills: job.skills,
      requirements: job.requirements,
      attachments: job.attachments,
      status: job.status,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      client: {
        displayName: job.client.displayName,
        avatar: job.client.avatar,
        rating: job.client.rating,
      },
      proposalCount: job._count.proposalsList
    }));

    return NextResponse.json({
      jobs: transformedJobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page < Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Create a new job
export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        ...data,
        client: {
          connect: { id: userProfile.id },
        },
        status: 'open',
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update a job
export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { jobId, ...updateData } = data;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Verify job ownership
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        clientId: userProfile.id,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    // Update job
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a job
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Verify job ownership
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        clientId: userProfile.id,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    // Delete job
    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Send a message with attachments
const sendMessage = async (job: { conversationId: string }, content: string, files: File[]) => {
  // Upload files first
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.url;
  });

  const attachments = await Promise.all(uploadPromises);

  // Send message with attachments
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversationId: job.conversationId,
      content,
      attachments,
    }),
  });
}; 