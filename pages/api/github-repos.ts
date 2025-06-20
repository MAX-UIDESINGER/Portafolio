import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const githubRes = await fetch('https://api.github.com/user/repos', {
    headers: {
     Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    cache: "no-store",
  });
  const allRepos = await githubRes.json();

  // Mapea igual que en getRepos
  const repoImages: Record<string, string> = {
    "bi-infomatica_v1.0.0": "/images/Bi_INFOMATICA.webp",
    "Caja-web": "/images/CARTA_DIGITAL.webp",
    "Carta-Gourmet": "/images/CARTA_GOURMET.webp",
    "Colpex2.0App_FireBase": "/images/COLPEX_APP.webp",
    "SistemaInventario2023_UEHOSPSUPE": "/images/HOSPISUPE.webp",
  };

  const githubRepos = Array.isArray(allRepos)
    ? allRepos
      .filter((repo: any) => repo.owner.login === 'MAX-UIDESINGER' && !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        image: repoImages[repo.name] || '/images/NO_FOTO.webp',
        language: repo.language || 'Desconocido',
        homepage: repo.homepage,
        topics: repo.topics,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        isPrivate: repo.private,
        productionUrl: undefined,
      }))
    : [];

  res.status(200).json(githubRepos);
}