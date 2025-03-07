import { prisma } from '@/lib/prisma';
import { Job, CreateJobInput, UpdateJobInput, JobFilters } from '@/types/job';

export class JobService {
  static async getJobs(filters: JobFilters = {}): Promise<Job[]> {
    const {
      category,
      skills,
      minBudget,
      maxBudget,
      status,
      clientId,
      creatorId
    } = filters;

    return prisma.job.findMany({
      where: {
        ...(category && { category }),
        ...(skills?.length && { skills: { hasEvery: skills } }),
        ...(minBudget && { budget: { gte: minBudget } }),
        ...(maxBudget && { budget: { lte: maxBudget } }),
        ...(status && { status }),
        ...(clientId && { clientId }),
        ...(creatorId && { creatorId })
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  static async getJobById(id: string): Promise<Job | null> {
    return prisma.job.findUnique({
      where: { id }
    });
  }

  static async createJob(clientId: string, data: CreateJobInput): Promise<Job> {
    return prisma.job.create({
      data: {
        ...data,
        client: {
          connect: { userId: clientId }
        }
      }
    });
  }

  static async updateJob(id: string, data: UpdateJobInput): Promise<Job> {
    return prisma.job.update({
      where: { id },
      data
    });
  }

  static async deleteJob(id: string): Promise<void> {
    await prisma.job.delete({
      where: { id }
    });
  }

  static async assignCreator(jobId: string, creatorId: string): Promise<Job> {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        creator: {
          connect: { userId: creatorId }
        },
        status: 'in_progress',
        startedAt: new Date()
      }
    });
  }

  static async completeJob(jobId: string): Promise<Job> {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'completed',
        completedAt: new Date()
      }
    });
  }

  static async cancelJob(jobId: string): Promise<Job> {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'cancelled'
      }
    });
  }

  static async incrementViews(jobId: string): Promise<void> {
    await prisma.job.update({
      where: { id: jobId },
      data: {
        views: {
          increment: 1
        }
      }
    });
  }

  static async incrementProposals(jobId: string): Promise<void> {
    await prisma.job.update({
      where: { id: jobId },
      data: {
        proposals: {
          increment: 1
        }
      }
    });
  }
} 