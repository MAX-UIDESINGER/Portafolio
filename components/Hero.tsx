"use client";
import { useEffect, useState } from "react";
import AboutMe from "./Navigation/AboutMe";
import Projects from "./Navigation/projects";
import Contact from "./Navigation/Contact";
import Inicio from "./Navigation/Inicio";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import NotFound from "./NotFound";

const Hero = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { repos: githubRepos, loading, error } = useGithubRepos();
  // 🔑 Estado para conexión a internet
  const [isOnline, setIsOnline] = useState(true); // siempre empieza en true para evitar mismatch

  useEffect(() => {
    // solo se ejecuta en cliente
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="h-screen bg-[#020618] text-[#90A1B9] font-mono overflow-hidden">
      <div className="h-full flex flex-col p-3 md:p-4 lg:p-9">
        {/* Mobile Menu  */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-[#0F172B] border border-[#314158] rounded-lg m-3 flex flex-col">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center h-14 border-b border-[#314158] px-4">
                <span className="text-[#90A1B9] font-mono font-medium text-base">
                  Pool Martin
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#90A1B9] hover:text-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 flex flex-col p-4">
                <div className="mb-6">
                  <p className="text-[#90A1B9] font-mono text-base mb-3">
                    # navigate:
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setActiveSection("inicio");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-[#90A1B9] hover:text-white font-mono text-base py-2 border-b border-[#314158]"
                    >
                      _hello
                    </button>

                    <button
                      onClick={() => {
                        setActiveSection("about");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-[#90A1B9] hover:text-white font-mono text-base py-2 border-b border-[#314158]"
                    >
                      _about-me
                    </button>

                    <button
                      onClick={() => {
                        setActiveSection("projects");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-[#90A1B9] hover:text-white font-mono text-base py-2 border-b border-[#314158]"
                    >
                      _projects
                    </button>

                    <button
                      onClick={() => {
                        setActiveSection("contact");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-[#90A1B9] hover:text-white font-mono text-base py-2 border-b border-[#314158]"
                    >
                      _contact-me
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="border-t border-[#314158] h-14 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#90A1B9] font-mono font-medium text-base">
                    find me in:
                  </span>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#314158] rounded"></div>
                    <div className="w-6 h-6 bg-[#314158] rounded"></div>
                    <div className="w-6 h-6 bg-[#314158] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Container */}
        <div className="bg-[#0F172B] border border-[#314158] rounded-lg overflow-hidden flex flex-col h-full">
          {/* Header */}
          <header className="flex justify-between items-center h-14 border-b border-[#314158]">
            {/* Desktop Header */}
            <div className="flex-row p-0 gap-32 flex-none order-0 flex-grow-0 hidden lg:flex items-center h-14 w-full">
              <div className="flex flex-row justify-center items-center p-4 gap-2.5 w-[183px] h-14 flex-none order-0 flex-grow-0">
                <span className="w-[135px] h-6 font-mono font-normal text-base leading-6 text-[#90A1B9] flex-none order-0 flex-grow-0">
                  Pool Martin
                </span>
              </div>

              <div className="flex h-14 flex-1">
                {/* Hello */}
                <div className="flex flex-col min-w-[110px] h-14 border-x border-[#314158]">
                  <button
                    onClick={() => setActiveSection("inicio")}
                    className="flex justify-center items-center h-14"
                  >
                    <span
                      className={`font-mono font-medium text-base ${
                        activeSection === "inicio"
                          ? "text-white"
                          : "text-[#90A1B9]"
                      }`}
                    >
                      _hello
                    </span>
                  </button>
                  {activeSection === "inicio" && (
                    <div className="border-b-2 border-[#FFB86A]" />
                  )}
                </div>

                {/* About */}
                <div className="flex flex-col min-w-[140px] h-14 border-r border-[#314158]">
                  <button
                    onClick={() => setActiveSection("about")}
                    className="flex justify-center items-center h-14"
                  >
                    <span
                      className={`font-mono font-medium text-base ${
                        activeSection === "about"
                          ? "text-white"
                          : "text-[#90A1B9]"
                      }`}
                    >
                      _about-me
                    </span>
                  </button>
                  {activeSection === "about" && (
                    <div className="border-b-2 border-[#FFB86A]" />
                  )}
                </div>

                {/* Projects */}
                <div className="flex flex-col min-w-[140px] h-14 border-r border-[#314158]">
                  <button
                    onClick={() => setActiveSection("projects")}
                    className="flex justify-center items-center h-14"
                  >
                    <span
                      className={`font-mono font-medium text-base ${
                        activeSection === "projects"
                          ? "text-white"
                          : "text-[#90A1B9]"
                      }`}
                    >
                      _projects
                    </span>
                  </button>
                  {activeSection === "projects" && (
                    <div className="border-b-2 border-[#FFB86A]" />
                  )}
                </div>
              </div>

              {/* Desktop Contact */}
              <div className="flex flex-col min-w-[160px] h-14 border-l border-[#314158]">
                <button
                  onClick={() => setActiveSection("contact")}
                  className="flex justify-center items-center h-14"
                >
                  <span
                    className={`font-mono font-medium text-base ${
                      activeSection === "contact"
                        ? "text-white"
                        : "text-[#90A1B9]"
                    }`}
                  >
                    _contact-me
                  </span>
                </button>
                {activeSection === "contact" && (
                  <div className="border-b-2 border-[#FFB86A]" />
                )}
              </div>
            </div>

            {/* Mobile Header */}
            <div className="flex lg:hidden justify-between items-center w-full px-4">
              <span className="text-[#90A1B9] font-mono font-medium text-base">
                Pool Martin
              </span>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-[#90A1B9] hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Main Content - Área flexible que crece */}
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!isOnline || error ? (
              <NotFound />
            ) : (
              <>
                {activeSection === "inicio" && <Inicio />}
                {activeSection === "about" && <AboutMe />}
                {activeSection === "projects" && <Projects />}
                {activeSection === "contact" && <Contact />}
              </>
            )}
          </div>

          {/* Footer - Altura fija */}
          <footer className=" flex justify-between items-center h-12 md:h-14 border-t border-[#314158]">
            <div className="flex items-center h-full">
              <div className="px-3 md:px-4 py-3 h-full border-r border-[#314158] flex items-center">
                <span className="text-[#90A1B9] font-mono font-medium text-xs md:text-sm">
                  find me in:
                </span>
              </div>

              <div className="flex h-full">
                <div className="flex items-center justify-center w-8 md:w-10 h-full border-r border-[#314158]">
                  {/* Social icon placeholder */}
                </div>
                <div className="flex items-center justify-center w-8 md:w-10 h-full border-r border-[#314158]">
                  {/* Social icon placeholder */}
                </div>
              </div>
            </div>

            <div className="flex items-center h-full">
              <div className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-3 h-full border-l border-[#314158]">
                <span className="text-[#90A1B9] font-mono font-medium text-xs md:text-sm">
                  @username
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L5 13V15L9 13.5V18H11V14L7 15V13L11 11.5V10.5L15 12V14L19 13V15L15 16V18H17V16L21 15V13L17 14V12L21 10.5V9Z"
                    fill="#62748E"
                  />
                </svg>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Hero;
