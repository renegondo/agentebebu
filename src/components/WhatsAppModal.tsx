import React, { useState, useEffect } from 'react';
    import { Dialog } from '@headlessui/react';
    import { useAppConfig } from '../config/AppConfig';
    import axios from 'axios';
    import { AgentConfig } from '../types';

    export const WhatsAppModal: React.FC<{
      isOpen: boolean;
      onClose: () => void;
      userEmail: string;
      agentConfig: AgentConfig | null;
    }> = ({ isOpen, onClose, userEmail, agentConfig }) => {
      const { config } = useAppConfig();
      const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

      useEffect(() => {
        if (!isOpen) {
          setTimeLeft(24 * 60 * 60);
          return;
        }

        const intervalId = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(intervalId);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);

        return () => clearInterval(intervalId);
      }, [isOpen]);

      const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };

      const handleConnectWhatsApp = async () => {
        if (!agentConfig) {
          console.error('No agent config found.');
          return;
        }
        try {
          await axios.post(config.agentConfigWebhook, {
            ...agentConfig,
            userEmail: userEmail
          });
          onClose();
        } catch (error) {
          console.error('Error sending agent config:', error);
        }
      };

      const handleSubscribeClick = () => {
        window.open("https://buy.stripe.com/7sIaH9fft3M1aoE8wz", "_blank");
        onClose();
      };

      return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 text-center">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Vincular WhatsApp
              </Dialog.Title>
              
              <p className="text-gray-500 mb-4">
                Te enviaremos un correo a <br />
                <span className="font-bold text-blue-600 text-lg block my-2">{userEmail}</span> <br />
                con las instrucciones para completar la vinculación de tu número de WhatsApp.
              </p>
              
              <div className="text-4xl font-bold text-blue-600 my-6">
                {formatTime(timeLeft)}
              </div>
              
              <p className="text-gray-700 mb-6">
                Esta es una prueba de 24 horas. ¿Quieres disfrutar de nuestro agente sin interrupciones?
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Desbloquea el Potencial Completo
                </p>
                <p className="text-gray-600 mb-4">
                  Accede a funciones avanzadas y nuevas opciones con una suscripción mensual de solo <span className="font-bold text-green-600">$9.19 USD</span>.
                </p>
                <button
                  onClick={handleSubscribeClick}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Suscríbete Ahora
                </button>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={async () => {
                    await handleConnectWhatsApp();
                  }}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Entendido
                </button>
              </div>
              <p className="text-gray-500 mt-4">
                Es necesario dar click en <span className="font-medium">Entendido</span> para continuar.
              </p>
            </Dialog.Panel>
          </div>
        </Dialog>
      );
    };
