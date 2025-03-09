import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// Get a single service by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    // Fetch the service from the database
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
            rating: true,
            completedProjects: true,
            description: true,
          },
        },
        pricing: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Format the response
    const formattedService = {
      id: service.id,
      title: service.title,
      description: service.description,
      category: service.category,
      skills: service.skills,
      portfolio: service.portfolio,
      pricing: {
        type: service.pricing?.type || 'fixed',
        minPrice: service.pricing?.minPrice || 0,
        maxPrice: service.pricing?.type === 'range' ? service.pricing?.maxPrice : undefined,
        currency: service.pricing?.currency || 'SOL',
      },
      provider: {
        id: service.provider.id,
        displayName: service.provider.displayName,
        avatar: service.provider.avatar || '',
        rating: service.provider.rating,
        completedProjects: service.provider.completedProjects,
        description: service.provider.description || '',
      },
      stats: {
        likesCount: service.likesCount || 0,
        dislikesCount: service.dislikesCount || 0,
        ratingCount: 0,
      },
    };

    return NextResponse.json({ service: formattedService });
  } catch (error) {
    console.error('Error fetching service:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Update a service
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();

    // Check if the service exists and belongs to the user
    const existingService = await prisma.service.findUnique({
      where: { id },
      include: { provider: true },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    if (existingService.provider.userId !== userId) {
      return NextResponse.json(
        { error: 'You do not have permission to update this service' },
        { status: 403 }
      );
    }

    // Update the service
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        skills: body.skills,
        portfolio: body.portfolio,
        pricing: {
          update: {
            type: body.pricing.type,
            minPrice: body.pricing.minPrice,
            maxPrice: body.pricing.type === 'range' ? body.pricing.maxPrice : null,
            currency: body.pricing.currency || 'SOL',
          }
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Service updated successfully',
      serviceId: id
    });
  } catch (error) {
    console.error('Error updating service:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Delete a service
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Check if the service exists and belongs to the user
    const existingService = await prisma.service.findUnique({
      where: { id },
      include: { provider: true },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    if (existingService.provider.userId !== userId) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this service' },
        { status: 403 }
      );
    }

    // Delete the service (no need to delete related records separately since they're scalar fields)
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 