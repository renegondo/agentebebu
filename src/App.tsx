import React, { useState } from 'react';
    import { Hero } from './components/Hero';
    import { RegistrationForm } from './components/RegistrationForm';
    import { AgentBuilder } from './components/AgentBuilder';
    import { ChatBot } from './components/ChatBot';
    import { WhatsAppModal } from './components/WhatsAppModal';
    import { ThankYouPage } from './components/ThankYouPage';
    import { AppConfigProvider } from './config/AppConfig';
    import { AdminButton } from './components/AdminButton';
    import { AgentConfig } from './types';
    import { Footer } from './components/Footer';

    function App() {
      const [isRegistered, setIsRegistered] = useState(false);
      const [userEmail, setUserEmail] = useState('');
      const [agentConfig, setAgentConfig] = useState<AgentConfig | null>(null);
      const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
      const [showThankYou, setShowThankYou] = useState(false);

      const handleRegistrationSuccess = (email: string) => {
        setIsRegistered(true);
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
      };

      const handleAgentConfigChange = (config: AgentConfig) => {
        setAgentConfig(config);
      };

      const handleWhatsAppModalClose = () => {
        setIsWhatsAppModalOpen(false);
        setShowThankYou(true);
      };

      if (showThankYou) {
        return <ThankYouPage />;
      }

      return (
        <AppConfigProvider>
          <div className="min-h-screen bg-gray-50">
            <AdminButton />
            <Hero />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {!isRegistered ? (
                <RegistrationForm onSuccess={handleRegistrationSuccess} />
              ) : !agentConfig ? (
                <AgentBuilder onComplete={handleAgentConfigChange} />
              ) : (
                <div className="space-y-8">
                  <ChatBot
                    businessContext={agentConfig.businessDescription}
                    agentFunctions={agentConfig.agentFunctions}
                    onEdit={() => setAgentConfig(null)}
                  />
                  
                  <div className="text-center">
                    <button
                      onClick={() => setIsWhatsAppModalOpen(true)}
                      className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Conectar a WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>

            <WhatsAppModal
              isOpen={isWhatsAppModalOpen}
              onClose={handleWhatsAppModalClose}
              userEmail={userEmail}
              agentConfig={agentConfig}
            />
            {agentConfig && (
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Esta es una prueba de 24 horas. Si deseas la versión completa, contáctanos.
                </p>
              </div>
            )}
            <Footer />
          </div>
        </AppConfigProvider>
      );
    }

    export default App;
