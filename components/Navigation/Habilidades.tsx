import { Code } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; icon: React.ReactNode }[];
  color: string;
}

interface HabilidadesProps {
  skillCategories: SkillCategory[];
  getColorClasses: (color: string) => string;
}

const Habilidades = ({ skillCategories, getColorClasses }: HabilidadesProps) => (
  <div className="space-y-6">
    {skillCategories.map((category, index) => (
      <div
        key={index}
        className={`${getColorClasses(category.color)} backdrop-blur-md rounded-2xl p-6 border transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gray-800/50 rounded-lg">
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{category.title}</h3>
            <p className="text-gray-400 text-sm">{category.description}</p>
          </div>
        </div>
        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {category.skills.map((skill, skillIndex) => (
            <div
              key={skillIndex}
              className="flex items-center space-x-2 bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                {skill.icon}
              </div>
              <span className="text-gray-200 text-sm font-medium truncate">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        {/* Skill Count */}
        <div className="mt-4 pt-3 border-t border-gray-700/30">
          <span className="text-gray-400 text-xs">
            {category.skills.length} tecnologías en esta categoría
          </span>
        </div>
      </div>
    ))}

    {/* Summary Card */}
    <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center space-x-2 mb-3">
        <Code className="w-5 h-5 text-indigo-400" />
        <h4 className="text-lg font-semibold text-white">Resumen Profesional</h4>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        Desarrollador Frontend especializado en React.js y tecnologías modernas de interfaz de usuario.
        Experiencia sólida en desarrollo web responsivo, aplicaciones móviles con React Native,
        y conocimientos fundamentales en APIs y bases de datos para integración completa de aplicaciones.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-cyan-600/20 border border-cyan-600/30 text-cyan-300 text-xs px-3 py-1 rounded-full">
          Frontend Developer
        </span>
        <span className="bg-blue-600/20 border border-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full">
          React Specialist
        </span>
        <span className="bg-green-600/20 border border-green-600/30 text-green-300 text-xs px-3 py-1 rounded-full">
          UI Developer
        </span>
      </div>
    </div>
  </div>
);

export default Habilidades;