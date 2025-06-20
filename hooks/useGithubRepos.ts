"use client";
import { useEffect, useState } from "react";
import { Repo } from "@/types";

export function useGithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      const res = await fetch("/api/github-repos");
      const data = await res.json();
      setRepos(data);
      setLoading(false);
    }
    fetchRepos();
  }, []);

  return { repos, loading };
}