"use client";
import Hero from "@/components/Hero";
import { customRepos } from "@/data/customRepos";
import { useGithubRepos } from "@/hooks/useGithubRepos";

export default function Home() {
  const { repos: githubRepos, loading } = useGithubRepos();
  const allRepos = [...customRepos, ...githubRepos];

  return (
    <main className="overflow-hidden">
      <Hero repos={allRepos} loading={loading} />
    </main>
  );
}
