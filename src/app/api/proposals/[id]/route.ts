import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ProposalService } from '@/services/proposal.service';
import { JobService } from '@/services/job.service';

// Accept a proposal
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const proposal = await ProposalService.getProposalById(params.id);
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Verify that the user is the job owner
    const job = await JobService.getJobById(proposal.jobId);
    if (!job || job.clientId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedProposal = await ProposalService.acceptProposal(params.id);
    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error accepting proposal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Reject a proposal
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const proposal = await ProposalService.getProposalById(params.id);
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Verify that the user is the job owner
    const job = await JobService.getJobById(proposal.jobId);
    if (!job || job.clientId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedProposal = await ProposalService.rejectProposal(params.id);
    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error rejecting proposal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Withdraw a proposal
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const proposal = await ProposalService.getProposalById(params.id);
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Verify that the user is the proposal creator
    if (proposal.creatorId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedProposal = await ProposalService.withdrawProposal(params.id);
    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error withdrawing proposal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 