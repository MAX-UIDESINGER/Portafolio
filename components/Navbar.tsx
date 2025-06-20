"use client";
import { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react';
import ModalContratar from "./Modal/ModalContratar";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = ({ navPadding = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); // Cierra el menú móvil si está abierto
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      // Calcula el ancho de la barra de scroll
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <nav
        className={`border-b border-border fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-background/80 text-foreground`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">PM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Pool Martin</h1>
                <p className="text-xs text-muted-foreground">
                  Ing. Sistemas & informático
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sobre Mí
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contacto
              </a>
              
              {/* Theme Switcher */}
              <ThemeSwitcher />
              
              <button
                onClick={openModal}
                className="bg-blue-600/90 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-sm font-medium text-white"
              >
                Contratar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Theme Switcher móvil */}
              <ThemeSwitcher />
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-4 rounded-xl bg-card backdrop-blur-md border border-border">
              <div className="space-y-3">
                <a
                  href="#blog"
                  className="block py-2 px-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre Mí
                </a>
                <a
                  href="#proyectos"
                  className="block py-2 px-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Proyectos
                </a>
                <a
                  href="#contact"
                  className="block py-2 px-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </a>
                <button
                  onClick={openModal}
                  className="w-full bg-blue-600/90 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-sm font-medium mt-3 text-white"
                >
                  Contratar
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Modal de Contratación */}
      <ModalContratar isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default NavBar;