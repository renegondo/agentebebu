import React, { createContext, useContext, useState } from 'react';
    import { AppConfig } from '../types';

    const AppConfigContext = createContext<{
      config: AppConfig;
      setConfig: (config: AppConfig) => void;
    }>({
      config: {
        registrationWebhook: 'https://n8n.prospectos.pro/webhook/844c226b-f793-4759-abfc-a83ac1f2a884',
        agentConfigWebhook: 'https://n8n.prospectos.pro/webhook/117383b5-998e-4fa3-a959-24e89dcb545b',
        openaiApiKey: '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',
      },
      setConfig: () => {},
    });

    export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [config, setConfig] = useState<AppConfig>({
        registrationWebhook: 'https://n8n.prospectos.pro/webhook/844c226b-f793-4759-abfc-a83ac1f2a884',
        agentConfigWebhook: 'https://n8n.prospectos.pro/webhook/117383b5-998e-4fa3-a959-24e89dcb545b',
        openaiApiKey: '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',
      });

      return (
        <AppConfigContext.Provider value={{ config, setConfig }}>
          {children}
        </AppConfigContext.Provider>
      );
    };

    export const useAppConfig = () => useContext(AppConfigContext);
