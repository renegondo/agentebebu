export interface UserRegistration {
  fullName: string;
  email: string;
  whatsapp: string;
}

export interface AgentConfig {
  businessDescription: string;
  agentFunctions: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AppConfig {
  registrationWebhook: string;
  agentConfigWebhook: string;
  openaiApiKey: string;
}
