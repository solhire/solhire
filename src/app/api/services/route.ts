import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// Input validation schema
const searchParamsSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  skills: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sortBy: z.enum(['newest', 'price_high', 'price_low', 'most_liked', 'best_rated']).optional(),
  page: z.string().optional()
});

// Service creation schema
const serviceCreateSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  category: z.string(),
  skills: z.array(z.string()),
  portfolio: z.array(z.string()),
  pricing: z.object({
    type: z.enum(['fixed', 'hourly', 'range']),
    minPrice: z.number().positive(),
    maxPrice: z.number().positive().optional(),
    currency: z.string().default('SOL')
  })
});

// Get all services with optional filters and search
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
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = Number(searchParams.get('page')) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ServiceWhereInput = {
      availability: 'available',
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

    if (skillsFilter?.length) {
      where.skills = {
        hasSome: skillsFilter,
      };
    }

    // Apply price filters
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.pricing = {
        OR: [
          {
            type: { in: ['fixed', 'hourly'] },
            minPrice: {
              gte: minPrice,
              ...(maxPrice ? { lte: maxPrice } : {})
            }
          },
          {
            type: 'range',
            minPrice: { gte: minPrice || 0 },
            ...(maxPrice ? { maxPrice: { lte: maxPrice } } : {})
          }
        ]
      };
    }

    // Build orderBy clause
    let orderBy: Prisma.ServiceOrderByWithRelationInput;
    
    switch (sortBy) {
      case 'price_high':
        orderBy = { pricing: { minPrice: 'desc' } };
        break;
      case 'price_low':
        orderBy = { pricing: { minPrice: 'asc' } };
        break;
      case 'most_liked':
        orderBy = { likesCount: 'desc' };
        break;
      case 'best_rated':
        orderBy = {
          ratings: {
            _avg: {
              rating: 'desc'
            }
          }
        };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Get total count for pagination
    const total = await prisma.service.count({ where });

    // Get services with pagination and eager loading of related data
    const services = await prisma.service.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        provider: {
          select: {
            displayName: true,
            avatar: true,
            rating: true,
            completedProjects: true,
          },
        },
        pricing: true,
        _count: {
          select: {
            ratings: true
          }
        },
      },
    });

    // Transform the response
    const transformedServices = services.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      category: service.category,
      skills: service.skills,
      portfolio: service.portfolio,
      availability: service.availability,
      pricing: {
        type: service.pricing?.type,
        minPrice: service.pricing?.minPrice,
        maxPrice: service.pricing?.maxPrice,
        currency: service.pricing?.currency,
      },
      provider: {
        displayName: service.provider.displayName,
        avatar: service.provider.avatar,
        rating: service.provider.rating,
        completedProjects: service.provider.completedProjects,
      },
      stats: {
        likesCount: service.likesCount,
        dislikesCount: service.dislikesCount,
        ratingCount: service._count.ratings,
      },
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));

    return NextResponse.json({
      services: transformedServices,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page < Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Create a new service
export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate input data
    const validatedData = serviceCreateSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid service data', details: validatedData.error.errors },
        { status: 400 }
      );
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Create service with pricing
    const service = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        skills: data.skills,
        portfolio: data.portfolio,
        provider: {
          connect: { id: userProfile.id },
        },
        pricing: {
          create: {
            type: data.pricing.type,
            minPrice: data.pricing.minPrice,
            maxPrice: data.pricing.maxPrice,
            currency: data.pricing.currency,
          },
        },
      },
      include: {
        pricing: true,
        provider: {
          select: {
            displayName: true,
            avatar: true,
            rating: true,
          },
        },
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update a service
export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { serviceId, ...updateData } = data;

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Verify service ownership
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        providerId: userProfile.id,
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found or unauthorized' }, { status: 404 });
    }

    // Update service and pricing
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...updateData,
        ...(updateData.pricing && {
          pricing: {
            update: updateData.pricing,
          },
        }),
      },
      include: {
        pricing: true,
        provider: {
          select: {
            displayName: true,
            avatar: true,
            rating: true,
          },
        },
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a service
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Verify service ownership
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        providerId: userProfile.id,
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found or unauthorized' }, { status: 404 });
    }

    // Delete service (this will cascade delete pricing due to the schema relation)
    await prisma.service.delete({
      where: { id: serviceId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 