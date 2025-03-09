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
        skills: true,
        portfolio: true,
        stats: true,
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
      skills: service.skills.map(skill => skill.name),
      portfolio: service.portfolio.map(item => item.imageUrl),
      pricing: {
        type: service.pricingType,
        minPrice: service.minPrice,
        maxPrice: service.pricingType === 'range' ? service.maxPrice : undefined,
        currency: service.currency,
      },
      provider: {
        id: service.provider.id,
        displayName: service.provider.displayName,
        avatar: service.provider.avatar,
        rating: service.provider.rating,
        completedProjects: service.provider.completedProjects,
        description: service.provider.description,
      },
      stats: {
        likesCount: service.stats.likesCount,
        dislikesCount: service.stats.dislikesCount,
        ratingCount: service.stats.ratingCount,
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
        pricingType: body.pricing.type,
        minPrice: body.pricing.minPrice,
        maxPrice: body.pricing.type === 'range' ? body.pricing.maxPrice : null,
        currency: body.pricing.currency,
        // Skills and portfolio will be updated separately
      },
    });

    // Update skills if provided
    if (body.skills && Array.isArray(body.skills)) {
      // Delete existing skills
      await prisma.serviceSkill.deleteMany({
        where: { serviceId: id },
      });

      // Add new skills
      await Promise.all(
        body.skills.map(async (skillName: string) => {
          await prisma.serviceSkill.create({
            data: {
              serviceId: id,
              name: skillName,
            },
          });
        })
      );
    }

    // Update portfolio if provided
    if (body.portfolio && Array.isArray(body.portfolio)) {
      // Delete existing portfolio items
      await prisma.servicePortfolio.deleteMany({
        where: { serviceId: id },
      });

      // Add new portfolio items
      await Promise.all(
        body.portfolio.map(async (imageUrl: string) => {
          await prisma.servicePortfolio.create({
            data: {
              serviceId: id,
              imageUrl,
            },
          });
        })
      );
    }

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

    // Delete related records first
    await prisma.serviceSkill.deleteMany({
      where: { serviceId: id },
    });

    await prisma.servicePortfolio.deleteMany({
      where: { serviceId: id },
    });

    await prisma.serviceStats.deleteMany({
      where: { serviceId: id },
    });

    // Delete the service
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