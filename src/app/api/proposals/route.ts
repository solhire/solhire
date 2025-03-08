import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ProposalService } from '@/services/proposal.service';
import { JobService } from '@/services/job.service';
import { ProfileService } from '@/services/profile.service';

// Submit a new proposal
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the user's profile
    const userProfile = await ProfileService.getProfileByUserId(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Parse the request body
    const data = await request.json();
    const { jobId, coverLetter, proposedRate, estimatedDelivery } = data;

    if (!jobId || !coverLetter || !proposedRate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the job exists
    const job = await JobService.getJobById(jobId);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if the user has already submitted a proposal for this job
    const existingProposals = await ProposalService.getProposals({ 
      jobId, 
      creatorId: userProfile.id 
    });
    
    if (existingProposals.length > 0) {
      return NextResponse.json(
        { error: 'You have already submitted a proposal for this job' },
        { status: 409 }
      );
    }

    // Create the proposal
    const proposal = await ProposalService.createProposal(userId, {
      jobId,
      coverLetter,
      price: proposedRate,
      timeframe: estimatedDelivery
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all proposals (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    
    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Get the user's profile
    const userProfile = await ProfileService.getProfileByUserId(userId);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Check if the job exists
    const job = await JobService.getJobById(jobId);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if the user is the job owner
    if (job.clientId !== userProfile.id) {
      // If not the job owner, only return the user's own proposal
      const userProposals = await ProposalService.getProposals({ 
        jobId, 
        creatorId: userProfile.id 
      });
      return NextResponse.json(userProposals);
    }

    // If the user is the job owner, return all proposals for the job
    const proposals = await ProposalService.getProposals({ jobId });
    return NextResponse.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update a proposal (accept or reject)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const data = await request.json();
    const { proposalId, action } = data;

    if (!proposalId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    // Check if the user is the job owner
    if (job.clientId !== userProfile.id) {
      return NextResponse.json(
        { error: 'Only the job owner can update proposal status' },
        { status: 403 }
      );
    }

    let updatedProposal;

    // Process the action
    switch (action) {
      case 'accept':
        updatedProposal = await ProposalService.acceptProposal(proposalId);
        break;
      case 'reject':
        updatedProposal = await ProposalService.rejectProposal(proposalId);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Must be "accept" or "reject"' },
          { status: 400 }
        );
    }

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Withdraw a proposal
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const proposalId = searchParams.get('proposalId');
    
    if (!proposalId) {
      return NextResponse.json(
        { error: 'Proposal ID is required' },
        { status: 400 }
      );
    }

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

    // Withdraw the proposal - using updateProposal to set status to 'withdrawn'
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