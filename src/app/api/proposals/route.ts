import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ProposalService } from '@/services/proposal.service';
import { CreateProposalInput } from '@/types/proposal';

// Get proposals with optional filters
export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const creatorId = searchParams.get('creatorId');
    const status = searchParams.get('status');

    const proposals = await ProposalService.getProposals({
      jobId: jobId || undefined,
      creatorId: creatorId || undefined,
      status: status as any || undefined
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create a new proposal
export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json() as CreateProposalInput;
    const proposal = await ProposalService.createProposal(userId, data);
    return NextResponse.json(proposal);
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update a proposal
export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { proposalId, ...updateData } = data;

    if (!proposalId) {
      return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
    }

    // Verify proposal ownership
    const proposal = await ProposalService.getProposalById(proposalId);
    if (!proposal || proposal.creatorId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedProposal = await ProposalService.updateProposal(proposalId, updateData);
    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 