export interface Repository {
  id: string;
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  url: string;
  languages: Record<string, number> | null;
  frameworks: string[];
  techStack: string[];
  topics: string[];
  stars: number;
  forks: number;
  openIssuesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeedItem {
  id: string;
  userId: string;
  repositoryId: string;
  fitScore: number;
  explanation: string;
  roadmap: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  repository: Repository;
}

export interface FeedResponse {
  success: boolean;
  message: string;
  data: FeedItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
