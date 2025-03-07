import { prisma } from '@/lib/prisma';
import { Proposal, CreateProposalInput, UpdateProposalInput, ProposalFilters } from '@/types/proposal';
import { JobService } from './job.service';

export class ProposalService {
  static async getProposals(filters: ProposalFilters = {}): Promise<Proposal[]> {
    const { jobId, creatorId, status } = filters;

    return prisma.proposal.findMany({
      where: {
        ...(jobId && { jobId }),
        ...(creatorId && { creatorId }),
        ...(status && { status })
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  static async getProposalById(id: string): Promise<Proposal | null> {
    return prisma.proposal.findUnique({
      where: { id }
    });
  }

  static async createProposal(creatorId: string, data: CreateProposalInput): Promise<Proposal> {
    const proposal = await prisma.proposal.create({
      data: {
        ...data,
        creator: {
          connect: { userId: creatorId }
        }
      }
    });

    // Increment the proposals count on the job
    await JobService.incrementProposals(data.jobId);

    return proposal;
  }

  static async updateProposal(id: string, data: UpdateProposalInput): Promise<Proposal> {
    return prisma.proposal.update({
      where: { id },
      data
    });
  }

  static async deleteProposal(id: string): Promise<void> {
    await prisma.proposal.delete({
      where: { id }
    });
  }

  static async acceptProposal(id: string): Promise<Proposal> {
    const proposal = await prisma.proposal.update({
      where: { id },
      data: {
        status: 'accepted'
      },
      include: {
        job: true
      }
    });

    // Update the job status and assign the creator
    await JobService.assignCreator(proposal.jobId, proposal.creatorId);

    // Reject all other proposals for this job
    await prisma.proposal.updateMany({
      where: {
        jobId: proposal.jobId,
        id: { not: id }
      },
      data: {
        status: 'rejected'
      }
    });

    return proposal;
  }

  static async rejectProposal(id: string): Promise<Proposal> {
    return prisma.proposal.update({
      where: { id },
      data: {
        status: 'rejected'
      }
    });
  }

  static async withdrawProposal(id: string): Promise<Proposal> {
    return prisma.proposal.update({
      where: { id },
      data: {
        status: 'withdrawn'
      }
    });
  }
} 