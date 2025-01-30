import React, { useState, useEffect } from 'react';
    import { useForm } from 'react-hook-form';
    import { AgentConfig } from '../types';
    import { useAppConfig } from '../config/AppConfig';
    import { Store, Settings, MessageSquare, Info } from 'lucide-react';
    import { Dialog } from '@headlessui/react';

    const LOCAL_STORAGE_AGENT_CONFIG_KEY = 'agentConfig';

    export const AgentBuilder: React.FC<{
      onComplete: (config: AgentConfig) => void;
    }> = ({ onComplete }) => {
      const [step, setStep] = useState(1);
      const { config } = useAppConfig();
      const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<AgentConfig>();
      const [isSubmitting, setIsSubmitting] = useState(false);
      const businessDescription = watch('businessDescription');
      const agentFunctions = watch('agentFunctions');
      const userEmail = localStorage.getItem('userEmail') || '';
      const [isBusinessInfoModalOpen, setIsBusinessInfoModalOpen] = useState(false);
      const [isAgentFunctionsInfoModalOpen, setIsAgentFunctionsInfoModalOpen] = useState(false);
      const LOCAL_STORAGE_AGENT_CONFIG_KEY = `agentConfig_${userEmail}`;

      useEffect(() => {
        try {
          const storedConfig = localStorage.getItem(LOCAL_STORAGE_AGENT_CONFIG_KEY);
          if (storedConfig) {
            const parsedConfig = JSON.parse(storedConfig);
            setValue('businessDescription', parsedConfig.businessDescription);
            setValue('agentFunctions', parsedConfig.agentFunctions);
          }
        } catch (error) {
          console.error('Error loading agent config from local storage:', error);
        }
      }, [setValue, userEmail]);

      const handleNextStep = () => {
        try {
          localStorage.setItem(LOCAL_STORAGE_AGENT_CONFIG_KEY, JSON.stringify({
            businessDescription,
            agentFunctions
          }));
        } catch (error) {
          console.error('Error saving agent config to local storage:', error);
        }
        setStep(2);
      };

      const handlePreviousStep = () => {
        setStep(1);
      };

      const handleComplete = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
          localStorage.setItem(LOCAL_STORAGE_AGENT_CONFIG_KEY, JSON.stringify({
            businessDescription,
            agentFunctions
          }));
          onComplete({ businessDescription, agentFunctions });
        } catch (error) {
          console.error('Error saving agent config to local storage:', error);
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Creador de Agente de Ventas WhatsApp IA
            </h2>
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>

          <div className="flex justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                <Store className="w-6 h-6" />
              </div>
              <span className={`text-sm ${step === 1 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>Info del Negocio</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                <Settings className="w-6 h-6" />
              </div>
              <span className={`text-sm ${step === 2 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>Config del Agente</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-gray-200 text-gray-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-500">Conectar WhatsApp</span>
            </div>
          </div>

          <form>
            {errors.root && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {errors.root.message}
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold mr-2">Define tu Negocio</h3>
                  <button
                    type="button"
                    onClick={() => setIsBusinessInfoModalOpen(true)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  {...register('businessDescription', { 
                    required: 'Por favor, describe tu negocio y productos' 
                  })}
                  className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe tu negocio y productos en detalle..."
                />
                {errors.businessDescription && (
                  <p className="mt-1 text-red-500">{errors.businessDescription.message}</p>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
                    style={{ visibility: step === 2 ? 'visible' : 'hidden' }}
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Siguiente Paso
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold mr-2">Especifica las Funciones del Agente IA</h3>
                  <button
                    type="button"
                    onClick={() => setIsAgentFunctionsInfoModalOpen(true)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  {...register('agentFunctions', {
                    required: 'Por favor, especifica las funciones del agente'
                  })}
                  className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe las funciones que deseas que tenga tu agente..."
                />
                {errors.agentFunctions && (
                  <p className="mt-1 text-red-500">{errors.agentFunctions.message}</p>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleComplete}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Desplegando...' : 'Desplegar Agente'}
                  </button>
                </div>
              </div>
            )}
          </form>
          <Dialog open={isBusinessInfoModalOpen} onClose={() => setIsBusinessInfoModalOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Sugerencias para la Descripción del Negocio
                </Dialog.Title>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Menciona el nombre de tu negocio.</li>
                  <li>Incluye la dirección física de tu negocio.</li>
                  <li>Proporciona números de contacto (teléfono, WhatsApp).</li>
                  <li>Especifica los horarios de atención.</li>
                  <li>Enumera tus redes sociales (Facebook, Instagram, etc.).</li>
                  <li>Haz un listado de tus productos o servicios con sus precios.</li>
                  <li>Indica si realizas entregas a domicilio (locales o externas).</li>
                  <li>Añade cualquier otra información relevante para tu negocio.</li>
                </ul>
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsBusinessInfoModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
          <Dialog open={isAgentFunctionsInfoModalOpen} onClose={() => setIsAgentFunctionsInfoModalOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Sugerencias para las Funciones del Agente IA
                </Dialog.Title>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Describe las tareas que el agente debe realizar.</li>
                  <li>Especifica cómo debe interactuar con los usuarios.</li>
                  <li>Define el tono y estilo de las respuestas del agente.</li>
                  <li>Incluye las instrucciones a seguir para levantar pedidos.</li>
                  <li>Ejemplos: "Responder preguntas sobre productos", "Guiar al usuario en el proceso de compra", "Ofrecer promociones", etc.</li>
                </ul>
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAgentFunctionsInfoModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      );
    };
