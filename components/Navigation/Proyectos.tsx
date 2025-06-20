import { useState } from 'react';
import Image from 'next/image';
import { Repo } from '../../types/index';

interface ProyectosProps {
    repos: Repo[];
    handlePrivateRepoClick: (repo: Repo) => void;
}

const ProyectoCard = ({ repo, handlePrivateRepoClick }: { repo: Repo, handlePrivateRepoClick: (repo: Repo) => void }) => {
    const [isImgLoading, setIsImgLoading] = useState(true);

    return (
        <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                {/* Imagen del proyecto */}
                <div className="w-full sm:w-24 md:w-32 h-40 sm:h-18 md:h-24 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative bg-black">
                    {repo.image ? (
                        <>
                            <Image
                                src={repo.image}
                                alt={repo.name}
                                fill
                                style={{ objectFit: "cover" }}
                                loading="lazy"
                                onLoad={() => setIsImgLoading(false)}
                                onError={() => setIsImgLoading(false)}
                            />
                            {isImgLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                                    {/* Loader spinner */}
                                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-white z-10">
                            <div className="text-xs sm:text-sm font-bold mb-1">{repo.name.substring(0, 8)}</div>
                            <div className="text-xs opacity-80">Project</div>
                        </div>
                    )}

                    {/* Overlay con icono */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                        {repo.isPrivate ? (
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    {/* Título con enlaces */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h4 className="font-semibold text-base md:text-lg text-white truncate pr-2">{repo.name}</h4>

                        {/* Enlaces para repositorios privados */}
                        {repo.isPrivate ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs px-2 py-1 rounded-full font-medium bg-yellow-600/20 text-yellow-300 border border-yellow-600/30 whitespace-nowrap">
                                    🔒 Privado
                                </span>

                                {/* Botón para abrir modal */}
                                <button
                                    onClick={() => handlePrivateRepoClick(repo)}
                                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                >
                                    <span className="hidden sm:inline">¿Por qué es privado?</span>
                                    <span className="sm:hidden">Info</span>
                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>

                                {/* Enlace a producción si existe */}
                                {repo.productionUrl && (
                                    <a
                                        href={repo.productionUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                    >
                                        <span>Ver Sitio</span>
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-3a9 9 0 00-9-9h3m5 5h3" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        ) : (
                            // Enlaces para repositorios públicos
                            <div className="flex flex-wrap items-center gap-2">
                                {repo.url && repo.url.includes('github.com') ? (
                                    <>
                                        <a
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                        >
                                            <span>GitHub</span>
                                            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                        {repo.homepage && (
                                            <a
                                                href={repo.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                            >
                                                <span>Demo</span>
                                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </a>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                    >
                                        <span>Ver Sitio</span>
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-3a9 9 0 00-9-9h3m5 5h3" />
                                        </svg>
                                    </a>
                                )}

                                <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${repo.url && repo.url.includes('github.com')
                                    ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30'
                                    : 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                                    }`}>
                                    {repo.url && repo.url.includes('github.com') ? 'GitHub' : 'Web'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 md:mb-4">
                        {repo.description || "Proyecto desarrollado con tecnologías modernas y mejores prácticas de desarrollo."}
                    </p>

                    {/* Lenguajes y tecnologías dinámicos */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                        {/* Lenguaje principal */}
                        {repo.language && (
                            <span className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-600/30 text-blue-300 text-xs px-2 md:px-3 py-1 rounded-full font-medium">
                                {repo.language}
                            </span>
                        )}

                        {/* Tecnologías basadas en el repositorio (solo para repos de GitHub) */}
                        {repo.topics && repo.topics.map((topic) => (
                            <span
                                key={topic}
                                className="bg-gray-800/60 border border-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full hover:bg-gray-700/60 transition-colors duration-200"
                            >
                                {topic}
                            </span>
                        ))}

                        {/* Tecnologías predeterminadas para proyectos web */}
                        {repo.url && !repo.url.includes('github.com') && (
                            <>
                                <span className="bg-orange-600/20 border border-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">React</span>
                                <span className="bg-sky-600/20 border border-cyan-600/30 text-sky-300 text-xs px-2 py-1 rounded-full">Material UI</span>
                            </>
                        )}

                        {/* Tecnologías adicionales si no hay topics para repos de GitHub */}
                        {repo.url && repo.url.includes('github.com') && (!repo.topics || repo.topics.length === 0) && (
                            <>
                                <span className="bg-orange-600/20 border border-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">React</span>
                                <span className="bg-purple-600/20 border border-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full">CSS</span>
                                <span className="bg-green-600/20 border border-green-600/30 text-green-300 text-xs px-2 py-1 rounded-full">JavaScript</span>
                            </>
                        )}
                    </div>

                    {/* Estadísticas para repos públicos */}
                    {repo.url && repo.url.includes('github.com') && !repo.isPrivate && (
                        <div className="flex flex-wrap gap-3 md:gap-4 text-xs text-gray-500">
                            {repo.stargazers_count !== undefined && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>{repo.stargazers_count}</span>
                                </div>
                            )}
                            {repo.updated_at && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="hidden sm:inline">Actualizado {new Date(repo.updated_at).toLocaleDateString()}</span>
                                    <span className="sm:hidden">{new Date(repo.updated_at).toLocaleDateString('es', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Proyectos = ({ repos, handlePrivateRepoClick }: ProyectosProps) => (
    <div className="space-y-4 md:space-y-6">
        {repos.map((repo) => (
            <ProyectoCard key={repo.id} repo={repo} handlePrivateRepoClick={handlePrivateRepoClick} />
        ))}
    </div>
);

export default Proyectos;