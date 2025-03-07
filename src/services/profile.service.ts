import { prisma } from '@/lib/prisma'
import { UserProfile, UpdateProfileInput } from '@/types/user'

export class ProfileService {
  static async getProfileByUserId(userId: string): Promise<UserProfile | null> {
    return prisma.userProfile.findUnique({
      where: { userId },
      include: { portfolio: true }
    })
  }

  static async getProfileByUsername(username: string): Promise<UserProfile | null> {
    return prisma.userProfile.findUnique({
      where: { username },
      include: { portfolio: true }
    })
  }

  static async createProfile(data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    return prisma.userProfile.create({
      data,
      include: { portfolio: true }
    })
  }

  static async updateProfile(userId: string, data: UpdateProfileInput): Promise<UserProfile> {
    return prisma.userProfile.update({
      where: { userId },
      data,
      include: { portfolio: true }
    })
  }

  static async deleteProfile(userId: string): Promise<void> {
    await prisma.userProfile.delete({
      where: { userId }
    })
  }

  static async isUsernameAvailable(username: string, excludeUserId?: string): Promise<boolean> {
    const existingProfile = await prisma.userProfile.findFirst({
      where: {
        username,
        NOT: excludeUserId ? { userId: excludeUserId } : undefined
      }
    })
    return !existingProfile
  }

  // Portfolio management
  static async addPortfolioItem(userId: string, data: {
    title: string;
    description: string;
    image: string;
    category: string;
    client?: string;
    completionDate: string;
    tags: string[];
  }): Promise<UserProfile> {
    return prisma.userProfile.update({
      where: { userId },
      data: {
        portfolio: {
          create: data
        }
      },
      include: { portfolio: true }
    })
  }

  static async removePortfolioItem(userId: string, itemId: string): Promise<UserProfile> {
    return prisma.userProfile.update({
      where: { userId },
      data: {
        portfolio: {
          delete: { id: itemId }
        }
      },
      include: { portfolio: true }
    })
  }

  static async updatePortfolioItem(
    userId: string,
    itemId: string,
    data: Partial<{
      title: string;
      description: string;
      image: string;
      category: string;
      client?: string;
      completionDate: string;
      tags: string[];
    }>
  ): Promise<UserProfile> {
    return prisma.userProfile.update({
      where: { userId },
      data: {
        portfolio: {
          update: {
            where: { id: itemId },
            data
          }
        }
      },
      include: { portfolio: true }
    })
  }
} 