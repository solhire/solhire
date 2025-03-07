export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface Proposal {
  id: string;
  coverLetter: string;
  price: number;
  timeframe: string;
  status: ProposalStatus;
  jobId: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProposalInput {
  coverLetter: string;
  price: number;
  timeframe: string;
  jobId: string;
}

export interface UpdateProposalInput {
  coverLetter?: string;
  price?: number;
  timeframe?: string;
  status?: ProposalStatus;
}

export interface ProposalFilters {
  jobId?: string;
  creatorId?: string;
  status?: ProposalStatus;
} 