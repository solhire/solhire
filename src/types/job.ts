export type JobStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';

export type JobCategory = 
  | 'development'
  | 'design'
  | 'marketing'
  | 'writing'
  | 'video'
  | 'music'
  | 'other';

export interface Job {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
  budget: number;
  timeframe: string;
  skills: string[];
  requirements: string[];
  clientId: string;
  creatorId?: string;
  status: JobStatus;
  attachments?: string[];
  
  // Stats
  views: number;
  proposals: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  category: JobCategory;
  budget: number;
  timeframe: string;
  skills: string[];
  requirements: string[];
  attachments?: string[];
}

export interface UpdateJobInput {
  title?: string;
  description?: string;
  category?: JobCategory;
  budget?: number;
  timeframe?: string;
  skills?: string[];
  requirements?: string[];
  status?: JobStatus;
  attachments?: string[];
}

export interface JobFilters {
  category?: string;
  skills?: string[];
  minBudget?: number;
  maxBudget?: number;
  status?: JobStatus;
  clientId?: string;
  creatorId?: string;
} 