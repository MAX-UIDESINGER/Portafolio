import React from "react";

interface SkeletonCardProps {
  isDark: boolean;
}

const SkeletonCard = ({ isDark }: SkeletonCardProps) => (
  <div
    className={`backdrop-blur-md rounded-2xl overflow-hidden border ${
      isDark
        ? "bg-gray-900/30 border-gray-800/50"
        : "bg-white/30 border-gray-200/50"
    }`}
  >
    {/* Imagen principal skeleton */}
    <div className="relative h-48 overflow-hidden">
      <div
        className={`w-full h-full animate-pulse ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        }`}
      />

      {/* Gradiente oscuro como en tu diseño original */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Botón de maximizar skeleton */}
      <div className="absolute top-3 right-3 p-2 bg-black/30 rounded-lg backdrop-blur-sm">
        <div
          className={`w-4 h-4 rounded animate-pulse ${
            isDark ? "bg-gray-600" : "bg-gray-400"
          }`}
        />
      </div>


    </div>

    {/* Contenido de la tarjeta */}
    <div className="p-6">
      {/* Título */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`h-6 rounded animate-pulse px-2 py-1 ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          } w-2/3`}
        />
      </div>

      {/* Descripción skeleton */}
      <div className="mb-4 space-y-2">
        <div
          className={`h-4 rounded animate-pulse ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          } w-full`}
        />
        <div
          className={`h-4 rounded animate-pulse ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          } w-4/5`}
        />
        <div
          className={`h-4 rounded animate-pulse ${
            isDark ? "bg-gray-700" : "bg-gray-300"
          } w-3/5`}
        />
      </div>

      {/* Botones skeleton */}
      <div className="flex space-x-3">
        {/* Botón Demo skeleton */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 rounded-lg ">
          <div
            className={`w-4 h-4 rounded animate-pulse ${
              isDark ? "bg-blue-400" : "bg-blue-500"
            }`}
          />
          <div
            className={`h-4 w-12 rounded animate-pulse ${
              isDark ? "bg-blue-400" : "bg-blue-500"
            }`}
          />
        </div>

        {/* Botón GitHub skeleton */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-600/20 rounded-lg">
          <div
            className={`w-4 h-4 rounded animate-pulse ${
              isDark ? "bg-gray-400" : "bg-gray-500"
            }`}
          />
          <div
            className={`h-4 w-14 rounded animate-pulse ${
              isDark ? "bg-gray-400" : "bg-gray-500"
            }`}
          />
        </div>
      </div>
    </div>
  </div>
);

interface ProjectSkeletonProps {
  count?: number;
  isDark?: boolean;
}

export default function ProjectSkeleton({
  count = 6,
  isDark = true,
}: ProjectSkeletonProps) {
  // Generar keys estáticas para evitar problemas de hidratación
  const skeletonKeys = Array.from(
    { length: count },
    (_, index) => `skeleton-${index}`
  );

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {/* Grid de tarjetas skeleton */}
        <>
          {skeletonKeys.map((key) => (
            <SkeletonCard key={key} isDark={isDark} />
          ))}
        </>

        {/* Loading indicator */}
        <div className="flex justify-center mt-12">
          <div
            className={`flex items-center space-x-3 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm font-medium animate-pulse">
              Cargando repositorios...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
