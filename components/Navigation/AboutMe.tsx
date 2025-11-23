import { useGithubCode } from "@/hooks/useGithubCode";

import CustomScrollContainer from "@/utils/CustomScrollContainer";
import {
  RiArrowDownSFill,
  RiArrowDownSLine,
  RiArrowRightSFill,
  RiArrowRightSLine,
  RiBriefcase2Fill,
  RiCloseFill,
  RiFileReduceFill,
  RiFolder3Fill,
  RiGamepadFill,
  RiMailFill,
  RiPhoneFill,
  RiTerminalBoxFill,
} from "@remixicon/react";
import React, { useState } from "react";

const AboutMe: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    repos: githubRepos,
    snippets,
    loading,
    error,
  } = useGithubCode("MAX-UIDESINGER");

  return (
    <div className="h-full w-full flex flex-col lg:flex-row bg-[#0F172B]">
      {/* titulo en movil  */}
      <div className="flex items-center p-6 gap-2.5 w-full h-[68px] md:hidden">
        <p className="w-full font-fira-code font-medium text-sm leading-[20px] text-slate-50">
          _about-me
        </p>
      </div>
      {/* Sidebar para móvil - oculto por defecto, mostrar con botón hamburguesa */}
      <div className="lg:w-[312px] flex border-r border-[#314158] bg-[#0F172B] shrink-0 w-full">
        {/* About Pages - Icon Bar */}
        <div className="flex flex-col items-center py-3 gap-8 border-r border-[#314158] bg-[#0F172B] shrink-0 w-[64px] h-full">
          {/* Personal Info Icon */}
          <RiTerminalBoxFill className="w-6 h-6 text-[#62748E] hover:text-white transition-colors duration-300 cursor-pointer" />

          {/* Professional Info Icon */}
          <RiBriefcase2Fill className="w-6 h-6 text-[#62748E] hover:text-white transition-colors duration-300 cursor-pointer" />

          {/* Hobbies Icon */}
          <RiGamepadFill className="w-6 h-6 text-[#62748E] hover:text-white transition-colors duration-300 cursor-pointer" />
        </div>

        {/* Pages Accordion */}
        <div className="flex flex-col items-start w-[248px]">
          {/* Dropdown Label 1*/}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" flex items-center px-4 lg:px-6 py-3 gap-3  w-full h-12 border-b border-[#314158] cursor-pointer lg:cursor-default  bg-[#314158] md:bg-transparent "
          >
            <div className="flex items-center gap-3 flex-1  w-full">
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
                <span>personal-info</span>
              </span>
            </div>
          </div>

          {/* Dropdown Menu 1 */}
          <div
            className={`flex flex-col items-start p-3 gap-2 w-full overflow-y-auto h-44 ${
              isOpen ? "block" : "hidden"
            } `}
          >
            {/* Dropdown Title 1 */}
            <div className="flex flex-row items-center p-0 px-3 gap-3 w-[218px] h-6">
              <RiArrowRightSLine className="w-4 h-4 text-[#62748E] transition-transform duration-300" />

              <div className="flex flex-row items-center gap-3 w-[166px] h-6">
                <div className="flex flex-row items-center gap-2 w-full h-6">
                  <RiFolder3Fill className="w-4 h-4 text-[#FF637E] transition-transform duration-300" />
                  <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#90A1B9]">
                    bio
                  </span>
                </div>
              </div>
            </div>

            {/* Dropdown Title 2 */}
            <div className="flex flex-row items-center p-0 px-3 gap-3 w-[218px] h-6">
              <RiArrowRightSLine className="w-4 h-4 text-[#62748E] transition-transform duration-300" />

              <div className="flex flex-row items-center gap-3 w-[166px] h-6">
                <div className="flex flex-row items-center gap-2 w-full h-6">
                  <RiFolder3Fill className="w-4 h-4 text-[#00D5BE] transition-transform duration-300" />

                  <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#90A1B9]">
                    contacts
                  </span>
                </div>
              </div>
            </div>

            {/* Dropdown Title 3 - Expanded */}
            <div className="flex flex-row items-center p-0 px-3 gap-3 w-[218px] h-6 cursor-pointer">
              <RiArrowDownSLine className="w-4 h-4 text-white transition-transform duration-300" />

              <div className="flex flex-row items-center gap-3 w-[166px] h-6">
                <div className="flex flex-row items-center gap-2 w-full h-6">
                  <RiFolder3Fill className="w-4 h-4 text-[#615FFF] transition-transform duration-300" />

                  <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#F8FAFC]">
                    education
                  </span>
                </div>
              </div>
            </div>

            {/* Dropdown Items - Education (shown when expanded) */}

            <>
              <div className="flex flex-col items-start pl-7 gap-2.5 w-[218px] h-6">
                <div className="flex flex-row items-center p-0 px-3 gap-2 w-[190px] h-6">
                  <RiFileReduceFill className="w-4 h-4 text-[#62748E] transition-transform duration-300" />

                  <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#90A1B9]">
                    high-school
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start pl-7 gap-2.5 w-[218px] h-6">
                <div className="flex flex-row items-center p-0 px-3 gap-2 w-[190px] h-6">
                  <RiFileReduceFill className="w-4 h-4 text-[#62748E] transition-transform duration-300" />
                  <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#90A1B9]">
                    university
                  </span>
                </div>
              </div>
            </>
          </div>

          {/* Dropdown Label 2 */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" flex items-center px-4 lg:px-6 py-3 gap-3  w-full h-12 border-y border-[#314158] cursor-pointer lg:cursor-default  bg-[#314158] md:bg-transparent "
          >
            <div className="flex items-center gap-3 flex-1  w-full">
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
                <span> contacts</span>
              </span>
            </div>
          </div>

          {/* Dropdown Menu 2 */}
          <div
            className={`flex flex-col items-start p-3 gap-2 w-full overflow-y-auto h-44 ${
              isOpen ? "block" : "hidden"
            } `}
          >
            {/* Dropdown Title 1 */}
            <div className="flex flex-row items-center p-0 px-3 gap-3 w-[218px] h-6">
              <RiMailFill className="w-4 h-4 text-[#62748E] transition-transform duration-300" />

              <div className="flex flex-row items-center gap-3 w-[166px] h-6">
                <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#90A1B9]">
                  user@gmail.com
                </span>
              </div>
            </div>

            {/* Dropdown Title 2 */}
            <div className="flex flex-row items-center p-0 px-3 gap-3 w-[218px] h-6">
              <RiPhoneFill className="w-4 h-4 text-[#62748E] transition-transform duration-300" />

              <div className="flex flex-row items-center gap-3 w-[166px] h-6">
                <span className="font-['Fira_Code'] font-normal text-base leading-6 text-[#90A1B9]">
                  +3598246359
                </span>
              </div>
            </div>
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
                  education
                </span>
              </div>
            </div>
            {/* Botón de cerrar filtros */}
            <div className="w-4 h-4 relative cursor-pointer shrink-0">
              <RiCloseFill className="w-4 h-4  text-[#90A1B9]" />
            </div>
          </div>
        </div>

        {/* About Area */}
        <div className="flex-1 flex flex-col sm:flex-row h-full min-h-0 overflow-y-auto sm:overflow-y-hidden">
          {/* About Section */}
          <div className="flex-1 flex flex-col max-w-[676px] sm:overflow-hidden">
            <CustomScrollContainer>
              <div className="flex flex-col flex-1 min-h-fit sm:min-h-0 p-4 overflow-auto">
                <div className="flex gap-[40px] mt-[12px] items-start">
                  {/* line numbers (ocultos en móvil) */}
                  <div className="hidden sm:block shrink-0 font-normal text-sm leading-6 text-right text-[#90A1B9] select-none lg:text-base min-w-[24px]">
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                      <div key={num}>{num}</div>
                    ))}
                  </div>

                  {/* code block */}
                  <pre className="whitespace-pre-wrap overflow-x-auto text-sm leading-6 font-['Fira_Code'] lg:text-base bg-[#0F172B] rounded-lg flex-1">
                    <div className="text-[#90A1B9] whitespace-pre-wrap break-words block">
                      {/* Solo muestra el formato de código en pantallas sm o mayores */}
                      <div className="font-['Fira_Code'] font-normal hidden sm:inline">
                        {`/*\n * About me\n * I have 5 years of experience in web\n * development lorem ipsum dolor sit amet,\n * consectetur adipiscing elit, sed do eiusmod\n * tempor incididunt ut labore et dolore\n * magna aliqua. Ut enim ad minim veniam,\n * quis nostrud exercitation ullamco laboris\n * nisi ut aliquip ex ea commodo consequat.\n * Duis aute irure dolor in reprehenderit in\n *\n * Duis aute irure dolor in reprehenderit in\n * voluptate velit esse cillum dolore eu fugiat\n * nulla pariatur. Excepteur sint occaecat\n * officia deserunt mollit anim id est laborum.\n */`}
                      </div>

                      {/* Versión limpia solo visible en móvil */}
                      <div className="block sm:hidden text-center text-[#90A1B9] text-base leading-6 font-['Fira_Code'] font-normal">
                        About me — I have 5 years of experience in web
                        development. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                      </div>
                    </div>
                  </pre>
                </div>
              </div>
            </CustomScrollContainer>
          </div>

          {/* Gist Section */}
          <div className="flex-1 flex border-t sm:border-t-0 sm:border-l border-[#314158]">
            <CustomScrollContainer>
              <div className="flex flex-col h-auto sm:h-full min-h-0 px-10  overflow-auto">
                {/* Título */}
                <div className=" text-lg leading-[27px] text-[#90A1B9] mb-16 mt-5 ">
                  // Code snippet title
                </div>

                {loading && (
                  <div className="text-[#90A1B9] font-fira-code text-sm">
                    Loading repositories...
                  </div>
                )}
                {error && (
                  <div className="text-[#FF637E] font-fira-code text-sm">
                    {error}
                  </div>
                )}

                {!loading && !error && githubRepos.length > 0 ? (
                  <div className="flex flex-col gap-8 w-full flex-1">
                    {githubRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="flex flex-col items-start gap-4 w-full"
                      >
                        {/* Header */}
                        <div className="flex flex-row justify-between items-start gap-[42px] w-full">
                          <div className="flex flex-row items-center gap-3">
                            <img
                              src={repo.owner.avatar_url}
                              alt={repo.owner.login}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <div className="flex flex-col gap-1">
                              <div className="font-['Fira_Code'] font-bold text-sm leading-5 text-[#615FFF]">
                                @{repo.owner.login}
                              </div>
                              <div className="font-['Fira_Code'] text-sm leading-5 text-[#90A1B9]">
                                {new Date(repo.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-center gap-4">
                            <span className="font-['Fira_Code'] text-sm text-[#90A1B9]">
                              ★ {repo.stargazers_count}
                            </span>
                          </div>
                        </div>

                        {/* Code Block */}
                        <div className="box-border flex items-start p-4 gap-4 w-full bg-[#020618] border border-[#314158] rounded-xl overflow-x-auto">
                          <pre className="font-['Fira_Code'] text-sm leading-5 text-[#FFA1AD] whitespace-pre-wrap">
                            {snippets[repo.id]
                              ? snippets[repo.id].slice(0, 400) + "..." // muestra solo las primeras líneas
                              : "// No code available for this repo"}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !loading &&
                  !error && (
                    <div className="text-[#90A1B9] font-fira-code text-sm">
                      No repositories found.
                    </div>
                  )
                )}
              </div>
            </CustomScrollContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
