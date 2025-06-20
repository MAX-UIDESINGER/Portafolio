"use client";
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { handleGmail } from '../utils/handleGmail';

const Footer = () => {
  return (
    <footer className="relative  bg-gray-900/30 backdrop-blur-md   border border-gray-800/50  ">
      {/* Northern Lights para el footer */}
      <div className="northern-lights pointer-events-none absolute inset-0 opacity-30">
        <div className="northern-light" style={{ '--duration': '25s', '--delay': '5s', '--x': 20, '--y': 20, '--scale': 0.4 } as React.CSSProperties}></div>
        <div className="northern-light" style={{ '--duration': '30s', '--delay': '10s', '--x': 80, '--y': 60, '--scale': 0.5 } as React.CSSProperties}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Logo y Descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">PM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Pool Martin</h3>
                <p className="text-sm text-gray-400">Ing. Sistemas & infomatico</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Especializado en crear experiencias digitales únicas y funcionales.
              Transformo ideas en interfaces modernas y atractivas que conectan con los usuarios.
            </p>

            {/* Redes Sociales */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/pool-martin-cuba-nu%C3%B1ez/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-all hover:scale-110">
                <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/pool-martin-cuba-nu%C3%B1ez/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
              </a>
              <div onClick={handleGmail} className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-all hover:scale-110">
                <Mail className="w-5 h-5 text-gray-400 hover:text-green-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Servicios
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Diseño Web</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desarrollo Frontend</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultoría</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Contacto
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Lima, Perù</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>maxcuba773@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Disponible para proyectos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Pool Martin C. Nuñez. Todos los derechos reservados.
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;