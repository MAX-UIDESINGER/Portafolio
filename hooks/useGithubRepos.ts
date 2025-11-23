"use client";
import useSWR from "swr";
import { Repo } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGithubRepos() {
  const { data, error, isLoading } = useSWR<Repo[]>(
    "/api/github-repos", // tu endpoint
    fetcher,
    {
      revalidateOnFocus: true, // refresca si vuelves a la pestaña
      dedupingInterval: 60000, // evita llamar más de 1 vez por minuto
    }
  );

  return {
    repos: data || [],
    loading: isLoading,
    error,
  };
}
