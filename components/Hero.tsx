"use client";
import { ExternalLink, Download, MapPin, Github, Linkedin, Mail, ChevronUp, MessageCircle, Code } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { handleGmail } from '../utils/handleGmail';
import ModalPrivate from './Modal/ModalPrivate';
import { useScrollLock } from '../utils/useScrollLock';
import Habilidades from './Navigation/Habilidades';
import Proyectos from './Navigation/Proyectos';
import { Repo } from '../types/index';
import { skillCategories } from '../data/skillCategories';
import SkeletonLoader from '@/components/Skeleton';

const Hero = ({ repos, loading }: { repos: Repo[], loading: boolean }) => {
  const [activeSection, setActiveSection] = useState('proyectos');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  useScrollLock(showModal);

  // Función específica para WhatsApp
  const handleWhatsApp = () => {
    const whatsappNumber = "51906099090"; // Cambia por tu número real
    const message = "¡Hola Pool! Me interesa trabajar contigo en un proyecto web. ¿Podemos conversar?";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const closeModal = () => {
    setShowModal(false);
    setSelectedRepo(null);
  };

  const handlePrivateRepoClick = (repo: Repo) => {
    setSelectedRepo(repo);
    setShowModal(true);
  };

  function getColorClasses(color: string) {
    const colors: Record<string, string> = {
      blue: "bg-blue-600/10 border-blue-600/20 hover:bg-blue-600/20",
      purple: "bg-purple-600/10 border-purple-600/20 hover:bg-purple-600/20",
      green: "bg-green-600/10 border-green-600/20 hover:bg-green-600/20",
      orange: "bg-orange-600/10 border-orange-600/20 hover:bg-orange-600/20"
    };
    return colors[color] || colors.blue;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
     
      {/* Main Content */}
      <main className="relative overflow-hidden pt-24 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
          {/* Left Sidebar - Profile */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky ">
              {/* Profile Card */}
              <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800/50 mb-6">
                <div className="text-center">
                  <div className="relative w-[150px] h-[150px] mx-auto rounded-full bg-gray-700 overflow-hidden border-2 border-gray-600/50 shadow-xl">
                    <Image
                      src="/images/foto.jpg"
                      alt="Pool Martin Cuba Nuñez"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h1 className="text-2xl font-bold mb-3.5">Pool Martin Cuba Nuñez</h1>
                  <p className="dark:text-white text-sm mb-2">INGENIERÍA DE SISTEMAS E INFORMÁTICA</p>

                  <div className="flex-1 pb-2">
                    <p className="dark:text-gray-400 text-sm mb-1">
                      <span className="text-blue-400 font-semibold">Desarrollador de Software</span> con sólida experiencia en desarrollo de aplicaciones móviles y web. He liderado proyectos de transformación digital e implementado soluciones tecnológicas que optimizan procesos empresariales y generan resultados medibles.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      onClick={handleGmail}
                      className="group p-3 bg-gray-800/40 rounded-xl hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pool-martin-cuba-nu%C3%B1ez/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-gray-800/40 rounded-xl hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a
                      href="https://github.com/MAX-UIDESINGER"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-gray-800/40 rounded-xl hover:bg-gray-600/20 border border-gray-700/50 hover:border-gray-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20"
                    >
                      <Github className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience Timeline Card */}
              <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800/50 mb-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <h3 className="font-semibold text-sm">Experiencia</h3>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500"></div>

                  <div className="space-y-6">
                    <div className="space-y-6">
                      {/* INFOMATICA SERVICIOS GENERALES S.A.C - Current */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">IS</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-sm text-white">Infomatica Servicios Generales S.A.C</h4>
                            <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-full">Actual</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">Analista Programador - Área de TI Desarrollo</p>
                          <p className="text-xs text-gray-300 mb-1">Desarrollo de proyectos web y móvil con TypeScript, React y microservicios usando metodologías ágiles Scrum</p>
                          <span className="text-xs text-gray-500">Mayo 2024 — Febrero 2025 (9 meses)</span>
                        </div>
                      </div>

                      {/* COVISIAN ESPAÑA */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">CE</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm text-white mb-1">Covisian España S.L., Sucursal en Perú</h4>
                          <p className="text-xs text-gray-400 mb-2">Comunicación con clientes y soluciones comerciales</p>
                          <p className="text-xs text-gray-300 mb-1">Comunicación activa con clientes y búsqueda de soluciones para satisfacer necesidades comerciales</p>
                          <span className="text-xs text-gray-500">Septiembre 2023 (1 día)</span>
                        </div>
                      </div>

                      {/* HOSPITAL LAURA ESTHER RODRIGUEZ DULANTO */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">HL</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm text-white mb-1">Hospital "Laura Esther Rodriguez Dulanto"</h4>
                          <p className="text-xs text-gray-400 mb-2">Líder de proyectos de innovación</p>
                          <p className="text-xs text-gray-300 mb-1">Lideré proyectos de innovación en servidores, mejorando la confiabilidad y seguridad de los datos del hospital</p>
                          <span className="text-xs text-gray-500">Noviembre 2022 — Enero 2023 (3 meses)</span>
                        </div>
                      </div>

                      {/* COLPEX INTERNATIONAL */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">CI</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm text-white mb-1">Colpex International S.A.C</h4>
                          <p className="text-xs text-gray-400 mb-2">Colaboración con equipos de logística y desarrollo móvil</p>
                          <p className="text-xs text-gray-300 mb-1">Trabajé en estrecha colaboración con el equipo de logística y desarrollo móvil, adaptando soluciones tecnológicas</p>
                          <span className="text-xs text-gray-500">Diciembre 2021 — Septiembre 2022 (10 meses)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-800/60 hover:bg-gray-700/60 transition-colors py-2 px-4 rounded-lg text-sm border border-gray-700/50">
                  <Download className="w-4 h-4" />
                  <span>Descargar CV</span>
                </button>
              </div>

              {/* Contact Card */}
              <div id="contact" className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800/50">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <h3 className="font-semibold text-sm">Lima, Perú</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Pool Martin - Desarrollador Full Stack</p>

                {/* Botón principal inteligente */}
                <button
                  onClick={handleGmail}
                  className="w-full bg-blue-600/80 hover:bg-blue-600 transition-colors py-2 px-4 rounded-lg text-sm mb-3 font-medium flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contactar por Email</span>
                </button>

                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Creando experiencias digitales únicas.
                  ¡Hablemos sobre tu próximo proyecto!
                </p>

                {/* Botones específicos */}
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleWhatsApp}
                    className="bg-green-600/20 hover:bg-green-600/30 transition-colors py-2 px-3 rounded text-xs border border-green-600/30 flex items-center justify-center space-x-2 text-green-400"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Escríbeme por WhatsApp</span>
                  </button>
                </div>

                {/* Info adicional */}
                <div className="mt-4 pt-4 border-t border-gray-800/50">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="space-y-1">
                      <div>Horarios de atención: 8:00 AM - 6:00 PM</div>
                      <div>Horario de almuerzo: 1:00 PM - 2:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-900/30 backdrop-blur-md rounded-xl p-1 border border-gray-800/50 w-fit">
              <button
                onClick={() => setActiveSection('proyectos')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm ${activeSection === 'proyectos'
                  ? 'bg-gray-800/70 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Proyectos</span>
              </button>
              <button
                onClick={() => setActiveSection('habilidades')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm ${activeSection === 'habilidades'
                  ? 'bg-gray-800/70 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
              >
                <Code className="w-4 h-4" />
                <span>habilidades</span>
              </button>

            </div>

            {/* Content */}
            {activeSection === 'habilidades' && (
              <Habilidades skillCategories={skillCategories} getColorClasses={getColorClasses} />
            )}

            {activeSection === 'proyectos' && (
              <>
                {loading ? (
                  <SkeletonLoader />
                ) : (
                  <Proyectos repos={repos} handlePrivateRepoClick={handlePrivateRepoClick} />
                )}

              </>
            )}
          </div>
        </div>

      </main>
      {/* Modal private */}
      <ModalPrivate open={showModal} repo={selectedRepo} onClose={closeModal} />
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full shadow-lg backdrop-blur-md border border-blue-500/30 transition-all hover:scale-110"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}

    </div>
  );
};

export default Hero;