import { X, Globe, Code, Smartphone, Mail, Phone, Calendar } from 'lucide-react';

interface ModalContratarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContratar = ({ isOpen, onClose }: ModalContratarProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">¡Trabajemos Juntos!</h2>
            <p className="text-gray-400 mt-1">Frontend + Backend Development</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Servicios */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Mis Servicios</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-white">Desarrollo Frontend</h4>
                </div>
                <p className="text-sm text-gray-400">Interfaces modernas con React, Vue. Diseño responsivo y optimizado.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Code className="w-5 h-5 text-green-400" />
                  <h4 className="font-medium text-white">Backend Básico</h4>
                </div>
                <p className="text-sm text-gray-400">APIs, bases de datos, integraciones. Lo necesario para que funcione.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  <h4 className="font-medium text-white">Aplicaciones Web</h4>
                </div>
                <p className="text-sm text-gray-400">Desde landing pages hasta sistemas completos. Todo responsive.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <h4 className="font-medium text-white">Consultoría Digital</h4>
                </div>
                <p className="text-sm text-gray-400">Te ayudo a digitalizar tu negocio con las mejores herramientas.</p>
              </div>
            </div>
          </div>
          {/* Proceso */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">¿Cómo Trabajamos?</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((step) => (
                <div className="flex items-start space-x-3" key={step}>
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white mt-1">{step}</div>
                  <div>
                    <h4 className="font-medium text-white">
                      {step === 1 && "Consulta Gratuita (30 min)"}
                      {step === 2 && "Propuesta Detallada"}
                      {step === 3 && "Desarrollo + Revisiones"}
                      {step === 4 && "Entrega + Soporte"}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {step === 1 && "Hablamos de tu proyecto, necesidades y objetivos."}
                      {step === 2 && "Tiempos, costos y alcance claramente definidos."}
                      {step === 3 && "Entregas parciales semanales. Ves el progreso constantemente."}
                      {step === 4 && "Te capacito y doy soporte post-entrega."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">¿Listo para digitalizar tu negocio?</h3>
            <p className="text-blue-100 mb-4">Conversemos gratis sobre tu proyecto</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>WhatsApp: +51 999 999 999</span>
              </button>
              <button className="bg-blue-800 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-medium text-white flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Agendar Llamada</span>
              </button>
            </div>
          </div>
          {/* Garantías */}
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-green-400 font-bold text-lg">✓</div>
              <p className="text-sm text-gray-300">Entrega en tiempo acordado</p>
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">✓</div>
              <p className="text-sm text-gray-300">Código limpio y documentado</p>
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">✓</div>
              <p className="text-sm text-gray-300">Soporte técnico incluido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContratar;