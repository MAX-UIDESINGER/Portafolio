// hooks/useGithubCode.ts
import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const useGithubCode = (username: string = "MAX-UIDESINGER") => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [snippets, setSnippets] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // 🔹 Obtener todos los repositorios del usuario
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!res.ok) throw new Error("Error al obtener los repositorios");
        const reposData = await res.json();
        setRepos(reposData);

        // 🔹 Obtener README.md de cada repo como snippet
        const snippetsData: Record<number, string> = {};

        await Promise.all(
          reposData.map(async (repo: any) => {
            try {
              const readmeRes = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/readme`
              );
              if (!readmeRes.ok) return;

              const readmeData = await readmeRes.json();
              const decoded = atob(readmeData.content);
              snippetsData[repo.id] = decoded;
            } catch {
              snippetsData[repo.id] = "// No code available";
            }
          })
        );

        setSnippets(snippetsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  // 🔹 Ahora devolvemos snippets además de repos, loading y error
  return { repos, snippets, loading, error };
};
