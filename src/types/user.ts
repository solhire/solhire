export type UserRole = 'creator' | 'client' | 'both';

export type UserAvailability = 'available' | 'busy' | 'unavailable';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  client?: string;
  completionDate: string;
  tags: string[];
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  bio: string;
  avatar: string;
  location: string;
  timeZone: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  joinDate: string;
  skills: string[];
  languages: string[];
  portfolio: PortfolioItem[];
  hourlyRate?: number;
  availability: UserAvailability;
  completedProjects: number;
  rating: number;
  walletAddress?: string;
  
  // Privacy settings
  showEmail: boolean;
  showRate: boolean;
  
  // Stats
  totalEarnings?: number;
  responseTime?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInput {
  displayName?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  timeZone?: string;
  email?: string;
  skills?: string[];
  languages?: string[];
  hourlyRate?: number;
  availability?: UserAvailability;
  showEmail?: boolean;
  showRate?: boolean;
}

export interface UploadImageResponse {
  url: string;
  success: boolean;
  error?: string;
} 