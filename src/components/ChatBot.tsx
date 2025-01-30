import React, { useState, useEffect, useRef } from 'react';
    import { Send, ArrowLeft, Save } from 'lucide-react';
    import { ChatMessage } from '../types';
    import { useAppConfig } from '../config/AppConfig';
    import OpenAI from 'openai';
    import axios from 'axios';

    const LOCAL_STORAGE_AGENT_CONFIG_KEY = 'agentConfig';

    export const ChatBot: React.FC<{
      businessContext: string;
      agentFunctions: string;
      onEdit: () => void;
    }> = ({ businessContext, agentFunctions, onEdit }) => {
      const [messages, setMessages] = useState<ChatMessage[]>([]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const messagesEndRef = useRef<null | HTMLDivElement>(null);
      const { config } = useAppConfig();
      const userEmail = localStorage.getItem('userEmail') || '';

      const openai = new OpenAI({
        apiKey: config.openaiApiKey,
        dangerouslyAllowBrowser: true
      });

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
        scrollToBottom();
      }, [messages]);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        try {
          const response = await openai.chat.completions.create({
            model: "gpt-4o-2024-05-13",
            messages: [
              {
                role: "system",
                content: `Eres un agente de ventas AI para el siguiente negocio: ${businessContext}. 
                         Tus funciones incluyen: ${agentFunctions}. 
                         Responde de manera profesional y enfocada en ventas.`
              },
              ...messages.map(m => ({ role: m.role, content: m.content })),
              { role: "user", content: input }
            ]
          });

          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: response.choices[0]?.message?.content || 'Lo siento, hubo un error en mi respuesta.'
          };

          setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
          console.error('Error al procesar mensaje:', error);
        } finally {
          setIsLoading(false);
        }
      };

      const handleSaveAgent = () => {
        try {
          localStorage.setItem(LOCAL_STORAGE_AGENT_CONFIG_KEY, JSON.stringify({
            businessDescription,
            agentFunctions,
            userEmail
          }));
          alert('Configuración del agente guardada.');
        } catch (error) {
          console.error('Error saving agent config to local storage:', error);
        }
      };

      return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Chat con Agente IA</h2>
              <p className="text-sm text-gray-500">
                Si hay algo que quieras cambiar solo regresa y corrige tus instrucciones
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="text-blue-600 hover:text-blue-700 transition-colors flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Atrás
              </button>
              <button
                onClick={handleSaveAgent}
                className="text-gray-600 hover:text-gray-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-1" />
                Guardar
              </button>
            </div>
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center">
                <div className="animate-pulse">Escribiendo...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe tu mensaje..."
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      );
    };
