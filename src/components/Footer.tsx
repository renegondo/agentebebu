import React from 'react';
    import { Clock, MessageSquare, TrendingUp } from 'lucide-react';

    export const Footer: React.FC = () => {
      const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      return (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* How it Works */}
            <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg mb-16">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Prueba Gratuita 24 Horas
              </h3>
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="text-center">
                  <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <span className="block font-semibold">Respuestas instantáneas 24/7</span>
                  <p className="text-gray-600 text-sm">Tus agentes IA siempre activos.</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <span className="block font-semibold">Mensajes personalizados</span>
                  <p className="text-gray-600 text-sm">Respuestas adaptadas a cada cliente.</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <span className="block font-semibold">Aumenta tus ventas</span>
                  <p className="text-gray-600 text-sm">Convierte más clientes potenciales.</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <button onClick={() => scrollToSection('registro')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Comenzar Prueba Gratuita
                </button>
              </div>
            </div>
            {/* Testimonials */}
            <div className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Emprendedores Como Tú
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Laura Martínez",
                      role: "Dueña de Boutique",
                      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
                      quote: "Antes perdía ventas por no contestar a tiempo. Ahora mi asistente virtual atiende a todos mis clientes al instante."
                    },
                    {
                      name: "Miguel Ángel Ruiz",
                      role: "Consultor Independiente",
                      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
                      quote: "Increíble. Mi agenda está llena y ya no me preocupo por perder consultas en WhatsApp."
                    },
                    {
                      name: "Patricia Flores",
                      role: "Dueña de Restaurante",
                      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
                      quote: "Los pedidos se procesan automáticamente y mis clientes están encantados con la rapidez."
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-blue-600 py-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¡Pruébalo Sin Riesgo!
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  24 horas gratis y luego solo $9.19 USD/mes
                </p>
                <button onClick={() => scrollToSection('demo')}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                  Comenzar Ahora
                </button>
                <p className="text-blue-200 mt-4">Sin tarjeta de crédito • Cancela cuando quieras</p>
              </div>
            </div>
          </div>
        </div>
      );
    };
