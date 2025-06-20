
import React from "react";

interface Repo {
  productionUrl?: string;
  name?: string;
}

interface PrivateRepoModalProps {
  open: boolean;
  repo: Repo | null;
  onClose: () => void;
}

const ModalPrivate: React.FC<PrivateRepoModalProps> = ({ open, repo, onClose }) => {
  if (!open || !repo) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 max-w-md w-full mx-4 relative overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-b border-yellow-600/30 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-600/30">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Repositorio Privado</h3>
              <p className="text-yellow-300 text-sm">{repo?.name}</p>
            </div>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Políticas Corporativas</h4>
                <p className="text-gray-400 text-sm">
                  Este proyecto está bajo repositorio privado debido a las políticas de confidencialidad y seguridad establecidas por la empresa cliente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Documentación Sensible</h4>
                <p className="text-gray-400 text-sm">
                  El código fuente contiene documentación interna, configuraciones específicas y datos que requieren protección según los acuerdos de confidencialidad.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Proyecto en Funcionamiento</h4>
                <p className="text-gray-400 text-sm">
                  Aunque el código no esté disponible públicamente, puedes ver el proyecto funcionando en producción para evaluar mi trabajo.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mt-6">
            {repo?.productionUrl && (
              <a
                href={repo.productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
              >
                Ver Proyecto Live
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Entendido
            </button>
          </div>
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalPrivate;