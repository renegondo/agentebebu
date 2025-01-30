import React, { useState } from 'react';
    import { Settings } from 'lucide-react';
    import { Dialog } from '@headlessui/react';
    import { useAppConfig } from '../config/AppConfig';

    const ADMIN_PASSWORD = 'Vh1mtvtele';

    export const AdminButton: React.FC = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [showPasswordDialog, setShowPasswordDialog] = useState(false);
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const { setConfig } = useAppConfig();

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newConfig = {
          registrationWebhook: formData.get('registrationWebhook') as string,
          agentConfigWebhook: formData.get('agentConfigWebhook') as string,
          openaiApiKey: formData.get('openaiApiKey') as string,
        };
        setConfig(newConfig);
        setIsOpen(false);
      };

      const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
          setShowPasswordDialog(false);
          setIsOpen(true);
          setPassword('');
          setError('');
        } else {
          setError('Contraseña incorrecta');
        }
      };

      const handleAdminClick = () => {
        setShowPasswordDialog(true);
      };

      return (
        <>
          <button
            onClick={handleAdminClick}
            className="fixed top-4 right-4 p-2 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50"
            aria-label="Configuración"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Password Dialog */}
          <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Acceso Administrativo
                </Dialog.Title>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingrese la contraseña"
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordDialog(false);
                        setPassword('');
                        setError('');
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Acceder
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>

          {/* Config Dialog */}
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Configuración del Backend
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Webhook de Registro
                    </label>
                    <input
                      type="url"
                      name="registrationWebhook"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL del webhook de registro"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Webhook de Configuración de Agente
                    </label>
                    <input
                      type="url"
                      name="agentConfigWebhook"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL del webhook de configuración"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      API Key de OpenAI
                    </label>
                    <input
                      type="password"
                      name="openaiApiKey"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="sk-..."
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        </>
      );
    };
