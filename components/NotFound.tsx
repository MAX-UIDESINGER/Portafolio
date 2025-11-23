import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-start p-6 py-16 px-6 lg:items-center lg:p-6 max-w-[343px] lg:max-w-none mx-auto lg:mx-0">
      {/* 404 container */}
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:max-w-6xl lg:w-full w-[295px]">
        {/* 404 icon */}
        <div className="relative w-full lg:w-auto">
          {/* Imagen para móvil */}
          <Image
            src="/icon/icon404-mobile.svg"
            alt="icon 404 mobile"
            width={259}
            height={125}
            className="block md:hidden object-contain w-[259px] h-[125px] mr-auto"
            priority
          />

          {/* Imagen para pantallas medianas y grandes */}
          <Image
            src="/icon/icon404.svg"
            alt="icon 404 desktop"
            width={312}
            height={180}
            className="hidden md:block object-contain w-[312px] h-[180px] mx-auto lg:mx-0"
            priority
          />
        </div>

        {/* 404 code block */}
        <div className="flex flex-row gap-10 w-full lg:overflow-x-auto lg:justify-center max-w-[295px] lg:max-w-none">
          {/* line numbers */}
          <div className="hidden md:block shrink-0 pr-2 font-normal text-sm leading-6 text-right text-[#90A1B9] select-none lg:text-base">
            {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>

          {/* Versión corta → SOLO en móviles */}
          <span className="block md:hidden text-[14px] leading-[21px] text-[#90A1B9] whitespace-pre">
            <span className="text-[#615FFF]"> throw new </span>{" "}
            <span className="text-[#FF637E]">Error</span>
            <span className="text-[#F8FAFC]"> (</span>
            {"\n"}
            <span className="text-[#00BBA7]">"404: PageNotFoundError 😢"</span>
            {"\n"}
            <span className="text-[#F8FAFC]"> );</span>
            {"\n"}
            {"\n"}
            <span className="text-[#FF637E]"> goBack</span>
            <span className="text-[#F8FAFC]">() ||</span>
            <span className="text-[#FF637E]"> goHome</span>
            <span className="text-[#F8FAFC]">();</span>
          </span>

          {/* Versión larga → SOLO en pantallas medianas y grandes */}
          <pre className="hidden md:block whitespace-pre text-sm leading-6 text-[#615FFF] font-['Fira_Code'] lg:text-base">
            <code>
              <span className="text-[#615FFF]">const</span>{" "}
              <span className="text-[#F8FAFC]">page = </span>
              <span className="text-[#FF637E]">findPage</span>(
              <span className="text-[#00BBA7]">'you-were-looking-for'</span>);
              {"\n\n"}
              <span className="text-[#615FFF]">if</span>{" "}
              <span className="text-[#F8FAFC]">(!page) {"{"}</span>
              {"\n  "}
              <span className="text-[#FF637E]">console.log</span>(
              <span className="text-[#00BBA7]">
                "Oops! Looks like you took a wrong turn in the codebase."
              </span>
              );
              {"\n  "}
              <span className="text-[#FF637E]">console.log</span>(
              <span className="text-[#00BBA7]">
                "But hey, since you're here..."
              </span>
              );
              {"\n  "}
              <span className="text-[#FF637E]">console.log</span>(
              <span className="text-[#00BBA7]">
                "🔍 Go back to the homepage and explore more cool stuff!"
              </span>
              );
              {"\n  "}
              throw new <span className="text-red-400">Error</span>(
              <span className="text-[#00BBA7]">
                "404: PageNotFoundError 😢"
              </span>
              );
              {"\n"}
              <span className="text-[#F8FAFC]">{"}"}</span>
              {"\n\n"}
              <span className="text-[#90A1B9]">
                {`/* Suggestions:\n * - Check the URL for typos\n * - Use the site navigation\n * - Or hit CMD+Z in real life 😅\n */`}
              </span>
              {"\n\n"}
              <span className="text-[#FF637E]">redirect</span>(
              <span className="text-[#00BBA7]">'home'</span>);
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
