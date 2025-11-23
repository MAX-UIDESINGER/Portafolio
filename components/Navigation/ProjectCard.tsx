import Image from "next/image";
import { Repo } from "../../types/index";
import { useEffect, useState } from "react";
import {
  RiExpandDiagonalFill,
  RiExternalLinkLine,
  RiEyeOffFill,
  RiGithubFill,
} from "@remixicon/react";

interface ProyectosProps {
  repos: Repo[];
  handlePrivateRepoClick: (repo: Repo) => void;
  isDark: boolean;
  openModal: (repo: Repo) => void;
  technologies: Array<{
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
  }>;
}

const ProjectCard = ({
  repos,
  handlePrivateRepoClick,
  isDark,
  openModal,
  technologies,
}: ProyectosProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const alreadyAnimated = localStorage.getItem("hasAnimated");
    if (!alreadyAnimated) {
      setHasAnimated(true);
      localStorage.setItem("hasAnimated", "true");
    }
  }, []);
  const getRepoPrimaryTechnology = (repo: Repo) => {
    // Buscar en los topics
    if (repo.topics) {
      for (const topic of repo.topics) {
        const tech = technologies.find((t) => t.id === topic.toLowerCase());
        if (tech) return tech;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      {repos.map((repo, index) => {
        const primaryTech = getRepoPrimaryTechnology(repo);
        return (
          <div
            key={repo.id}
            className="flex flex-col items-start gap-4 w-full bg-transparent"
          >
            <div
              className={`w-full flex items-center text-base leading-6 text-[#615FFF] whitespace-nowrap overflow-hidden ${
                hasAnimated ? "animate-typing border-r-2 border-[#90A1B9]" : ""
              }`}
              style={{
                animation: hasAnimated
                  ? "typing 2s steps(30, end) forwards, blink 0.7s step-end 3" // 👈 parpadea 3 veces y desaparece
                  : "",
              }}
            >
              <span className="font-bold mr-3">Project {index + 1}</span>
              <span className="text-[#90A1B9] truncate"> // _{repo.name}</span>
            </div>

            {/* El resto del código permanece igual */}
            <div className="flex flex-col items-start p-0 w-full relative rounded-xl overflow-hidden border border-[#1D293D]">
              {/* Imagen */}
              <div className="relative w-full h-[145px]">
                <Image
                  src={repo.images[0]}
                  alt={repo.name}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(repo)}
                  priority
                  fetchPriority="high"
                />

                {/* Botón de lenguaje */}
                {primaryTech && (
                  <div
                    className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-md shadow-md"
                    style={{
                      backgroundColor: primaryTech.color,
                    }}
                  >
                    <primaryTech.icon size={24} color={"#0F172B"} />
                  </div>
                )}

                {/* Botón de maximizar */}
                {repo.images.length > 1 && (
                  <button
                    onClick={() => openModal(repo)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 rounded-t-xl opacity-0 hover:opacity-100 hover:bg-black/40 transition-all"
                  >
                    <RiExpandDiagonalFill className="w-7 h-7 text-white" />
                  </button>
                )}

                {/* Contador de imágenes adicionales */}
                {repo.images.length > 1 && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                      + {repo.images.length} más
                    </span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="flex flex-col p-8 gap-5 bg-[#020618] rounded-b-xl">
                {/* Descripción */}
                <p
                  className={`w-full font-fira-code font-[450] text-lg leading-[27px] text-[#90A1B9] line-clamp-3 ${
                    hasAnimated ? "animate-fadeInUp" : ""
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {repo.description ||
                    "Proyecto desarrollado con tecnologías modernas y mejores prácticas de desarrollo."}
                </p>

                {/* Etiquetas de tecnologías usadas en el proyecto */}
                <div className="flex flex-wrap gap-2 ">
                  {repo.topics &&
                    repo.topics.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded-full border ${
                          isDark
                            ? "bg-gray-800/50 border-gray-700/50 text-gray-300"
                            : "bg-gray-100/50 border-gray-300/50 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {/* Botones */}
                <div
                  className={`flex gap-3 flex-wrap ${
                    hasAnimated ? "animate-fadeInUp" : ""
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {repo.isPrivate ? (
                    <>
                      <button
                        onClick={() => handlePrivateRepoClick(repo)}
                        className="flex flex-row justify-center items-center px-[12px] py-[10px] gap-2 w-[125px] h-10 rounded-lg font-fira-code font-[450] text-sm  bg-[#FFB86A]   hover:bg-[#FFD6A7]  text-[#020618] transition-colors"
                      >
                        <RiEyeOffFill className="w-4 h-4" />
                        <span>Detalles</span>
                      </button>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-row justify-center items-center px-[12px] py-[10px] gap-2 w-[125px] h-10 rounded-lg  font-fira-code font-[450] text-sm bg-[#615FFF]   hover:bg-[#615ef5] text-white transition-colors"
                        >
                          <RiExternalLinkLine className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      {(repo.homepage || repo.productionUrl) && (
                        <a
                          href={repo.homepage || repo.productionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-row justify-center items-center px-[12px] py-[10px] gap-2 w-[125px] h-10 rounded-lg 
            font-fira-code font-[450] text-sm bg-[#615FFF]  text-white transition-colors"
                        >
                          <RiExternalLinkLine className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}

                      {repo.url && (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-row justify-center items-center px-[12px] py-[10px] gap-2 w-[125px] h-10 rounded-lg 
            font-fira-code font-[450] text-sm bg-[#45556C] hover:bg-[#546680] text-[#F8FAFC] transition-colors"
                        >
                          <RiGithubFill className="w-4 h-4" />
                          <span>Código</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;
