import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { ProfileService } from '@/services/profile.service'

// Update portfolio item
export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId, ...data } = await request.json()
    
    if (!itemId) {
      return NextResponse.json({ error: 'Portfolio item ID is required' }, { status: 400 })
    }

    const updatedProfile = await ProfileService.updatePortfolioItem(userId, itemId, data)
    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Delete portfolio item
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId } = await request.json()
    
    if (!itemId) {
      return NextResponse.json({ error: 'Portfolio item ID is required' }, { status: 400 })
    }

    const updatedProfile = await ProfileService.removePortfolioItem(userId, itemId)
    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 