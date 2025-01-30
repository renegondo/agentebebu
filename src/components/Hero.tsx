import React from 'react';
    import { Bot, BrainCircuit, Rocket, Check, ArrowRight, Clock, MessageSquare, TrendingUp } from 'lucide-react';

    export const Hero: React.FC = () => {
      const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      return (
        <div className="relative overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/30 text-white mb-6 
                  animate-fade-in-up">
                  <Rocket className="w-5 h-5 mr-2" />
                  ¡Oferta de Lanzamiento! 🎉 Solo $9.19 USD/mes
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 space-y-4">
                  <div>Tu Asistente Virtual de WhatsApp</div>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    que Atiende tu Negocio 24/7
                  </div>
                </h1>
                <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100/90 leading-relaxed">
                  Deja que la IA se encargue de tus chats de WhatsApp mientras tú te enfocas en hacer crecer tu negocio
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button 
                    onClick={() => scrollToSection('demo')}
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold 
                      hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Probar demostración gratuita">
                    Probar Gratis 24 Horas
                  </button>
                  <button 
                    onClick={() => scrollToSection('como-funciona')}
                    className="px-8 py-4 bg-blue-500/20 text-white rounded-lg text-lg font-semibold 
                      hover:bg-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    aria-label="Ver cómo funciona">
                    Ver Cómo Funciona <ArrowRight className="w-5 h-5 animate-pulse" />
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200/90">
                  {[
                    { icon: Check, text: 'Sin conocimientos técnicos' },
                    { icon: Check, text: 'Configuración en 5 minutos' },
                    { icon: Check, text: 'Prueba sin compromiso' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-green-300" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points */}
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">¿Te identificas con esto?</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: Bot, 
                    text: '"No puedo contestar todos los mensajes de WhatsApp a tiempo"' 
                  },
                  { 
                    icon: Clock, 
                    text: '"Pierdo clientes por no responder fuera de horario"' 
                  },
                  { 
                    icon: BrainCircuit, 
                    text: '"Me interrumpen constantemente con las mismas preguntas"' 
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-8 h-8 text-blue-600" />
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="py-24 bg-gray-50" id="como-funciona">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Tan Fácil como 1-2-3
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Configura tu asistente virtual en minutos, sin complicaciones
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    number: 1,
                    title: "Describe tu Negocio",
                    description: "Cuéntanos sobre tus productos, servicios y horarios. ¡Nada técnico!",
                    icon: BrainCircuit
                  },
                  {
                    number: 2,
                    title: "Conecta WhatsApp",
                    description: "Un solo click para vincular tu WhatsApp Business",
                    icon: Bot
                  },
                  {
                    number: 3,
                    title: "¡Listo!",
                    description: "Tu asistente virtual comienza a atender clientes al instante",
                    icon: Rocket
                  }
                ].map((step, index) => (
                  <div 
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg relative transition-transform duration-300 hover:scale-105">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full text-white 
                      flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <step.icon className="w-12 h-12 text-blue-600 mb-6" />
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resto del código se mantiene similar con mejoras consistentes... */}
          <div id="demo" className="h-0"></div>
        </div>
      );
    };
