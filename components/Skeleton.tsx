import React from "react";

// Componente para una tarjeta skeleton individual
const SkeletonCard = () => (
  <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-gray-800/50">
    <div className="flex animate-pulse space-x-4 md:space-x-6">
      {/* Imagen skeleton - círculo/cuadrado redondeado */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl bg-gray-700 flex-shrink-0"></div>
      
      {/* Contenido skeleton */}
      <div className="flex-1 space-y-4 py-1">

        {/* Descripción */}
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-4 h-3 rounded bg-gray-700"></div>
            <div className="col-span-3 h-3 rounded bg-gray-700"></div>
            <div className="col-span-1 h-3 rounded bg-gray-700"></div>
          </div>
          <div className="h-3 rounded bg-gray-700 w-2/3"></div>
        </div>
        
        {/* Tecnologías */}
        <div className="flex space-x-2">
          <div className="h-5 rounded-full bg-gray-600 w-12"></div>
          <div className="h-5 rounded-full bg-gray-600 w-16"></div>
          <div className="h-5 rounded-full bg-gray-600 w-10"></div>
        </div>
        
        {/* Estadísticas */}
        <div className="flex space-x-4">
          <div className="h-3 rounded bg-gray-600 w-8"></div>
          <div className="h-3 rounded bg-gray-600 w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function SkeletonLoader({ count = 6 }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">

        {/* Grid de tarjetas skeleton */}
        <div className="space-y-6">
          {Array.from({ length: count }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
        
        {/* Loading indicator */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm font-medium animate-pulse">Cargando repositorios...</span>
          </div>
        </div>
      </div>
    </div>
  );
}