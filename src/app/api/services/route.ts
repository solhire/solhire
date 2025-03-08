import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Get all services with optional filters and search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const skillsFilter = searchParams.get('skills')?.split(',');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = Number(searchParams.get('page')) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {
      availability: 'available', // Only show available services
    };

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
        hasEvery: skillsFilter,
      };
    }

    // Build pricing filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.pricing = {
        OR: [
          // Fixed price
          {
            type: 'fixed',
            minPrice: minPrice !== undefined ? { gte: minPrice } : undefined,
            ...(maxPrice !== undefined ? { minPrice: { lte: maxPrice } } : {}),
          },
          // Hourly rate
          {
            type: 'hourly',
            minPrice: minPrice !== undefined ? { gte: minPrice } : undefined,
            ...(maxPrice !== undefined ? { minPrice: { lte: maxPrice } } : {}),
          },
          // Price range
          {
            type: 'range',
            AND: [
              minPrice !== undefined ? { minPrice: { gte: minPrice } } : {},
              maxPrice !== undefined ? { maxPrice: { lte: maxPrice } } : {},
            ],
          },
        ],
      };
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' };
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
    }

    // Get total count for pagination
    const total = await prisma.service.count({ where });

    // Get services with pagination
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
          },
        },
        pricing: true,
      },
    });

    return NextResponse.json({
      services,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    const { pricing: pricingData, ...serviceData } = data;

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
        ...serviceData,
        provider: {
          connect: { id: userProfile.id },
        },
        pricing: {
          create: pricingData,
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
    const { serviceId, pricing: pricingData, ...serviceData } = data;

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
        ...serviceData,
        pricing: {
          update: pricingData,
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

    // Delete service (this will cascade delete pricing and ratings)
    await prisma.service.delete({
      where: { id: serviceId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 