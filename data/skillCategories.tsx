import { Code, Database, Terminal, Settings, Monitor, Server, Smartphone, Globe } from "lucide-react";

export const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Monitor className="w-6 h-6 text-blue-400" />,
    description: "Tecnologías para interfaces de usuario modernas y responsivas",
    skills: [
      { name: "React.js", icon: <Code className="w-5 h-5 text-cyan-400" /> },
      { name: "React Native", icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
      { name: "Vite.js", icon: <Globe className="w-5 h-5 text-purple-400" /> },
      { name: "Next.js", icon: <Code className="w-5 h-5 text-gray-300" /> },
      { name: "HTML", icon: <Globe className="w-5 h-5 text-orange-400" /> },
      { name: "CSS", icon: <Globe className="w-5 h-5 text-blue-400" /> },
      { name: "Tailwind", icon: <Code className="w-5 h-5 text-teal-400" /> },
      { name: "Material UI", icon: <Code className="w-5 h-5 text-blue-500" /> }
    ],
    color: "blue"
  },
  {
    title: "Conocimientos Backend",
    icon: <Database className="w-6 h-6 text-purple-400" />,
    description: "Principios básicos de backend y gestión de datos",
    skills: [
      { name: "Consumo de APIs", icon: <Globe className="w-5 h-5 text-indigo-400" /> },
      { name: "Principios SQL", icon: <Database className="w-5 h-5 text-blue-400" /> },
      { name: "Firebase", icon: <Database className="w-5 h-5 text-yellow-400" /> },
      { name: "Laravel (básico)", icon: <Database className="w-5 h-5 text-red-400" /> },
      { name: "Spring Boot (básico)", icon: <Server className="w-5 h-5 text-green-400" /> }
    ],
    color: "purple"
  },
  {
    title: "Lenguajes de Programación",
    icon: <Terminal className="w-6 h-6 text-green-400" />,
    description: "Lenguajes dominados para desarrollo multiplataforma",
    skills: [
      { name: "JavaScript", icon: <Code className="w-5 h-5 text-yellow-400" /> },
      { name: "TypeScript", icon: <Code className="w-5 h-5 text-blue-500" /> },
      { name: "C#", icon: <Code className="w-5 h-5 text-purple-500" /> },
      { name: "VB", icon: <Code className="w-5 h-5 text-blue-600" /> },
      { name: "Java", icon: <Code className="w-5 h-5 text-orange-500" /> }
    ],
    color: "green"
  },
  {
    title: "Herramientas y Tecnologías Familiares",
    icon: <Settings className="w-6 h-6 text-orange-400" />,
    description: "Herramientas y conceptos con los que tengo experiencia práctica",
    skills: [
      { name: "Node.js", icon: <Server className="w-5 h-5 text-green-500" /> },
      { name: "Diseño Orientado a Objetos", icon: <Code className="w-5 h-5 text-indigo-400" /> },
      { name: "Git y GitHub", icon: <Terminal className="w-5 h-5 text-orange-500" /> },
      { name: "npm", icon: <Terminal className="w-5 h-5 text-red-400" /> },
      { name: "Cpanel", icon: <Settings className="w-5 h-5 text-blue-400" /> },
      { name: "Visual Studio Code", icon: <Code className="w-5 h-5 text-blue-500" /> },
      { name: "Android Studio", icon: <Smartphone className="w-5 h-5 text-green-400" /> }
    ],
    color: "orange"
  }
];