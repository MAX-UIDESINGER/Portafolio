export interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  images: string[];
  language: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  isPrivate: boolean;
  productionUrl: string;
}
