import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const githubRes = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    cache: "no-store",
  });
  const allRepos = await githubRes.json();

  // Mapea igual que en getRepos
  const repoImages: Record<string, string[]> = {
    "bi-infomatica_v1.0.0": ["/images/Bi_INFOMATICA.webp"],
    "Caja-web": [
      "/images/CAJAWEB/caja1.webp",
      "/images/CAJAWEB/caja2.webp",
      "/images/CAJAWEB/caja3.webp",
    ],
    "Carta-Gourmet": [
      "/images/GOURMET/gourmet1.webp",
      "/images/GOURMET/gourmet2.webp",
      "/images/GOURMET/gourmet3.webp",
      "/images/GOURMET/gourmet4.webp",
      "/images/GOURMET/gourmet5.webp",
    ],
    "Colpex2.0App_FireBase": [
      "/images/COLPEX/colpex1.webp",
      "/images/COLPEX/colpex2.webp",
      "/images/COLPEX/colpex3.webp",
      "/images/COLPEX/colpex4.webp",
      "/images/COLPEX/colpex5.webp",
    ],
    SistemaInventario2023_UEHOSPSUPE: [
      "https://i.postimg.cc/cLYjpnCM/P-gina-Web-de-Venta-Tecnolog-a-y-Videojuegos-Cerceta-y-Blanco-Degradado.png",
      "https://i.postimg.cc/C5BcHkyn/2.jpg",
      "https://i.postimg.cc/XYQDWVgJ/3.jpg",
    ],
  };

  const githubRepos = Array.isArray(allRepos)
    ? allRepos
        .filter(
          (repo: any) => repo.owner.login === "MAX-UIDESINGER" && !repo.fork
        )
        .map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          images: repoImages[repo.name] || ["/images/NO_FOTO.webp"], // <-- array por defecto
          language: repo.language || "Desconocido",
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
