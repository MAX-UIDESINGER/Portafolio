
export interface Repo {
  productionUrl: any;
  isPrivate: any;
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  language: string;
  homepage?: string;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
}