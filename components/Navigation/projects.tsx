import CustomScrollContainer from "@/utils/CustomScrollContainer";
import React, { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "../Skeleton";
import { Repo } from "@/types";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { customRepos } from "@/data/customRepos";
import {
  RiAndroidFill,
  RiAngularjsFill,
  RiArrowDownSFill,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiCheckFill,
  RiCloseFill,
  RiCss3Fill,
  RiHtml5Fill,
  RiNextjsFill,
  RiReactjsFill,
  RiVuejsFill,
} from "@remixicon/react";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [selectedProject, setSelectedProject] = useState<Repo | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { repos: githubRepos, loading, error } = useGithubRepos();
  const repos = [...customRepos, ...githubRepos];
  const [isDark, setIsDark] = useState(true);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [showContractModal, setShowContractModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Tecnologías disponibles para filtrar
  const technologies = [
    {
      id: "react",
      name: "React",
      icon: RiReactjsFill,
      color: "#A3B3FF",
    },
    {
      id: "android",
      name: "Android",
      icon: RiAndroidFill,
      color: "#34ECD5",
    },

    {
      id: "nextjs",
      name: "Nextjs",
      icon: RiNextjsFill,
      color: "#314158",
    },
    {
      id: "html",
      name: "HTML",
      icon: RiHtml5Fill,
      color: "#E34F26",
    },
    {
      id: "css",
      name: "CSS",
      icon: RiCss3Fill,
      color: "#1572B6",
    },
    {
      id: "vue",
      name: "Vue",
      icon: RiVuejsFill,
      color: "#4FC08D",
    },
    {
      id: "angular",
      name: "Angular",
      icon: RiAngularjsFill,
      color: "#DD0031",
    },
  ];

  // Función para obtener tecnologías de un repo basado SOLO en los topics
  const getRepoTechnologies = (repo: Repo): string[] => {
    const techs: string[] = [];

    // Agregar tecnologías de los topics
    if (repo.topics) {
      repo.topics.forEach((topic) => {
        const topicLower = topic.toLowerCase();
        if (
          technologies.some((tech) => tech.id === topicLower) &&
          !techs.includes(topicLower)
        ) {
          techs.push(topicLower);
        }
      });
    }

    return techs;
  };

  // Filtrar repositorios basado en tecnologías seleccionadas
  const filteredRepos = useMemo(() => {
    if (selectedTechnologies.length === 0) return repos;

    return repos.filter((repo) => {
      const repoTechnologies = getRepoTechnologies(repo);
      return selectedTechnologies.some((tech) =>
        repoTechnologies.includes(tech)
      );
    });
  }, [repos, selectedTechnologies]);

  const toggleTechnology = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const clearFilters = () => {
    setSelectedTechnologies([]);
  };

  const handlePrivateRepoClick = (repo: Repo) => {
    setSelectedRepo(repo);
    setShowModal(true);
  };

  const openModal = (project: Repo, imageIndex = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row bg-[#0F172B]">
      {/* titulo en movil  */}
      <div className="flex items-center p-6 gap-2.5 w-full h-[68px] md:hidden">
        <p className="w-full font-fira-code font-medium text-sm leading-[20px] text-slate-50">
          _projects
        </p>
      </div>
      {/* Sidebar para móvil - oculto por defecto, mostrar con botón hamburguesa */}
      <div className="lg:w-[312px] flex flex-col border-r border-[#314158] bg-[#0F172B] shrink-0 w-full">
        {/* Dropdown Label */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className=" flex items-center px-4 lg:px-6 py-3 gap-3 h-12 border-b border-[#314158] cursor-pointer lg:cursor-default  bg-[#314158] md:bg-transparent "
        >
          <div className="flex items-center gap-3 flex-1">
            {/* Ícono */}
            <div className="md:hidden">
              {/* En móvil: cambia según isOpen */}
              {isOpen ? (
                <RiArrowDownSFill className="w-4 h-4 text-white transition-transform duration-300" />
              ) : (
                <RiArrowRightSFill className="w-4 h-4 text-white transition-transform duration-300" />
              )}
            </div>

            <div className="hidden md:block">
              {/* En pantallas medianas y grandes: siempre hacia abajo */}
              <RiArrowDownSFill className="w-4 h-4 text-white transition-transform duration-300" />
            </div>

            <span className="font-fira-code font-normal text-sm lg:text-base text-[#F8FAFC]">
              {/* Solo en pantallas chicas (sm y md) */}
              <span className="block lg:hidden">personal-info</span>
              {/* Solo en pantallas grandes (lg en adelante) */}
              <span className="hidden lg:block">projects</span>
            </span>
          </div>
        </div>

        {/* Technologies List */}
        <div
          className={`flex-1 p-2 lg:p-3 overflow-y-auto ${
            isOpen ? "block" : "hidden"
          } lg:block`} // En lg siempre visible
        >
          <div className="space-y-2">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center px-2 lg:px-3 gap-4 lg:gap-6 h-7"
              >
                {/* Checkbox */}
                <div
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => toggleTechnology(tech.id)}
                >
                  <div
                    className={`flex items-center justify-center w-full h-full rounded-sm border ${
                      selectedTechnologies.includes(tech.id)
                        ? "bg-[#62748E] border-[#62748E]"
                        : "bg-[#0F172B] border-[#62748E]"
                    }`}
                  >
                    {selectedTechnologies.includes(tech.id) && (
                      <RiCheckFill className="w-3 h-3 text-white " />
                    )}
                  </div>
                </div>

                {/* Technology */}
                <div className="flex items-center gap-2 py-0.5">
                  <tech.icon size={20} className="lg:size-6" />
                  <span className="font-fira-code font-normal text-sm lg:text-base text-white">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Tabs */}
        <div className="hidden sm:flex box-border flex-row items-start p-0 w-full h-12 border-b border-[#314158]">
          <div className="flex items-center min-w-full lg:min-w-[242px] h-12 border-r border-[#314158] px-4 lg:px-6 gap-3">
            <div className="flex items-center gap-1 min-w-[194px] h-6 overflow-hidden">
              <div className="flex items-center gap-3 min-w-[174px] h-6">
                <span className="font-fira-code font-normal text-sm lg:text-base leading-6 text-[#90A1B9] whitespace-nowrap truncate">
                  {selectedTechnologies.length > 0
                    ? selectedTechnologies
                        .map(
                          (id) =>
                            technologies.find((t) => t.id === id)?.name || id
                        )
                        .join(" ; ")
                    : "technologies-info"}
                </span>
              </div>
            </div>

            {/* Botón de cerrar filtros */}
            <div
              className="w-4 h-4 relative cursor-pointer shrink-0"
              onClick={clearFilters}
            >
              <RiCloseFill className="w-4 h-4  text-[#90A1B9]" />
            </div>
          </div>
        </div>

        {/* Scrollable Projects */}
        <CustomScrollContainer>
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
              {loading ? (
                <ProjectSkeleton isDark={isDark} />
              ) : (
                <ProjectCard
                  repos={filteredRepos}
                  handlePrivateRepoClick={handlePrivateRepoClick}
                  isDark={isDark}
                  openModal={openModal}
                  technologies={technologies}
                />
              )}
            </div>
          </div>
        </CustomScrollContainer>
      </div>

      {/* Modals */}
      {showModal && selectedRepo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-2xl p-4 lg:p-6 max-w-md w-full ${
              isDark
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">
              {selectedRepo.name}
            </h3>
            <p
              className={`text-xs lg:text-sm mb-3 lg:mb-4 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Este es un proyecto privado. Para más información, contáctame
              directamente.
            </p>
            <div className="flex space-x-2 lg:space-x-3 flex-col lg:flex-row gap-2">
              <button
                // onClick={handleWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg text-xs lg:text-sm text-white"
              >
                Contactar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 py-2 rounded-lg text-xs lg:text-sm border ${
                  isDark
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modals */}
      {showContractModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-2xl p-4 lg:p-6 max-w-md w-full ${
              isDark
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">
              ¡Trabajemos juntos!
            </h3>
            <p
              className={`text-xs lg:text-sm mb-3 lg:mb-4 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Estoy disponible para proyectos de desarrollo web y móvil.
              ¡Hablemos de tu idea!
            </p>
            <div className="flex space-x-2 lg:space-x-3 flex-col lg:flex-row gap-2">
              <button
                onClick={() => {
                  // handleWhatsApp();
                  setShowContractModal(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg text-xs lg:text-sm text-white"
              >
                WhatsApp
              </button>
              <button
                onClick={() => {
                  // handleGmail();
                  setShowContractModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-xs lg:text-sm text-white"
              >
                Email
              </button>
              <button
                onClick={() => setShowContractModal(false)}
                className={`px-4 py-2 rounded-lg text-xs lg:text-sm border ${
                  isDark
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                <RiCloseFill className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2">
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-2 lg:mx-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 lg:top-4 right-2 lg:right-4 z-10 p-2 lg:p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <RiCloseFill className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative bg-black rounded-lg lg:rounded-2xl overflow-hidden">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.name} - Imagen ${
                  currentImageIndex + 1
                }`}
                className="w-full h-auto max-h-[70vh] lg:max-h-[80vh] object-contain"
              />

              {/* Navigation Arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <RiArrowLeftSFill className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <RiArrowRightSFill className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4">
                <span className="px-2 lg:px-3 py-1 bg-black/50 text-white text-xs lg:text-sm rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </span>
              </div>

              {/* Project Title */}
              <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4">
                <h3 className="text-white text-sm lg:text-lg font-semibold bg-black/50 px-2 lg:px-3 py-1 rounded-full backdrop-blur-sm">
                  _{selectedProject.name}
                </h3>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {selectedProject.images.length > 1 && (
              <div className="flex justify-center space-x-1 sm:space-x-2 lg:space-x-3 mt-3 sm:mt-4 lg:mt-7 overflow-x-auto pb-4 px-2">
                {selectedProject.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 
          w-10 h-10 
          sm:w-12 sm:h-12 
          md:w-14 md:h-14 
          lg:w-16 lg:h-16 
          rounded-md sm:rounded-lg 
          overflow-hidden 
          transition-all duration-200 ${
            index === currentImageIndex
              ? "border-[#615FFF] border-2 sm:border-3 lg:border-4"
              : "border-transparent border-2 opacity-70 hover:opacity-100 hover:border-gray-300"
          }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
