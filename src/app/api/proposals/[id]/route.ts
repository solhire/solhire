import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ProposalService } from '@/services/proposal.service';
import { JobService } from '@/services/job.service';
import { ProfileService } from '@/services/profile.service';

// Get a specific proposal by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const proposalId = context.params.id;
    
    // Get the user's profile
    const userProfile = await ProfileService.getProfileByUserId(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Get the proposal
    const proposal = await ProposalService.getProposalById(proposalId);
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Get the job
    const job = await JobService.getJobById(proposal.jobId);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if the user is authorized to view this proposal
    // (either the job owner or the proposal creator)
    if (job.clientId !== userProfile.id && proposal.creatorId !== userProfile.id) {
      return NextResponse.json(
        { error: 'Unauthorized to view this proposal' },
        { status: 403 }
      );
    }

    return NextResponse.json(proposal);
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Accept a proposal
export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const proposalId = context.params.id;

    // Get the user's profile
    const userProfile = await ProfileService.getProfileByUserId(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Get the proposal
    const proposal = await ProposalService.getProposalById(proposalId);
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Get the job
    const job = await JobService.getJobById(proposal.jobId);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Verify that the user is the job owner
    if (job.clientId !== userProfile.id) {
      return NextResponse.json(
        { error: 'Only the job owner can accept proposals' },
        { status: 403 }
      );
    }

    // Accept the proposal
    const updatedProposal = await ProposalService.acceptProposal(proposalId);
    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error accepting proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update a proposal
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const proposalId = context.params.id;
    const data = await request.json();

    // Get the user's profile
    const userProfile = await ProfileService.getProfileByUserId(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Get the proposal
    const proposal = await ProposalService.getProposalById(proposalId);
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Check if the user is the proposal creator
    if (proposal.creatorId !== userProfile.id) {
      return NextResponse.json(
        { error: 'Only the proposal creator can update the proposal' },
        { status: 403 }
      );
    }

    // Check if the proposal can be updated (not already accepted or rejected)
    if (proposal.status !== 'pending') {
      return NextResponse.json(
        { error: 'Cannot update a proposal that is not pending' },
        { status: 400 }
      );
    }

    // Update the proposal
    const updatedProposal = await ProposalService.updateProposal(proposalId, data);
    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete/withdraw a proposal
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const proposalId = context.params.id;

    // Get the user's profile
    const userProfile = await ProfileService.getProfileByUserId(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Get the proposal
    const proposal = await ProposalService.getProposalById(proposalId);
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Check if the user is the proposal creator
    if (proposal.creatorId !== userProfile.id) {
      return NextResponse.json(
        { error: 'Only the proposal creator can withdraw the proposal' },
        { status: 403 }
      );
    }

    // Check if the proposal can be withdrawn (not already accepted)
    if (proposal.status === 'accepted') {
      return NextResponse.json(
        { error: 'Cannot withdraw an accepted proposal' },
        { status: 400 }
      );
    }

    // Withdraw the proposal
    await ProposalService.updateProposal(proposalId, { status: 'withdrawn' });

    return NextResponse.json(
      { message: 'Proposal withdrawn successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error withdrawing proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 