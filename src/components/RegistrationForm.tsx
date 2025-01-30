import React, { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { UserRegistration } from '../types';
    import { useAppConfig } from '../config/AppConfig';
    import axios from 'axios';
    import { Listbox } from '@headlessui/react';
    import { ChevronDown } from 'lucide-react';

    const countryCodes = [
      { name: 'United States', code: '+1', flag: '🇺🇸' },
      { name: 'Mexico', code: '+52', flag: '🇲🇽' },
      { name: 'Canada', code: '+1', flag: '🇨🇦' },
      { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
      { name: 'Germany', code: '+49', flag: '🇩🇪' },
      { name: 'France', code: '+33', flag: '🇫🇷' },
      { name: 'Spain', code: '+34', flag: '🇪🇸' },
      { name: 'Italy', code: '+39', flag: '🇮🇹' },
      { name: 'Brazil', code: '+55', flag: '🇧🇷' },
      { name: 'Argentina', code: '+54', flag: '🇦🇷' },
      { name: 'Colombia', code: '+57', flag: '🇨🇴' },
      { name: 'Peru', code: '+51', flag: '🇵🇪' },
      { name: 'Chile', code: '+56', flag: '🇨🇱' },
      { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
      { name: 'Venezuela', code: '+58', flag: '🇻🇪' },
      { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
      { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
      { name: 'Uruguay', code: '+598', flag: '🇺🇾' },
      { name: 'China', code: '+86', flag: '🇨🇳' },
      { name: 'Japan', code: '+81', flag: '🇯🇵' },
      { name: 'India', code: '+91', flag: '🇮🇳' },
      { name: 'Australia', code: '+61', flag: '🇦🇺' },
      { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
      { name: 'South Africa', code: '+27', flag: '🇿🇦' },
      { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
      { name: 'Egypt', code: '+20', flag: '🇪🇬' },
      { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    ];

    export const RegistrationForm: React.FC<{
      onSuccess: (email: string) => void;
    }> = ({ onSuccess }) => {
      const { config } = useAppConfig();
      const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<UserRegistration>();
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
      const whatsapp = watch('whatsapp');

      const onSubmit = async (data: UserRegistration) => {
        if (!config.registrationWebhook) {
          setError('root', {
            type: 'submitError',
            message: 'Error de configuración: El webhook de registro no está configurado. Por favor, configure el backend primero.'
          });
          return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
          await axios.post(config.registrationWebhook, {
            ...data,
            whatsapp: `${selectedCountry.code}${data.whatsapp}`
          });
          onSuccess(data.email);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
          console.error('Error al registrar:', errorMessage);
          
          setError('root', {
            type: 'submitError',
            message: error.response?.status === 404 
              ? 'Error de conexión: No se pudo conectar al servidor de registro. Verifique la configuración del backend.'
              : 'No se pudo completar el registro. Por favor, intente nuevamente.'
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrate e inicia tu prueba</h2>
          
          {errors.root && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errors.root.message}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre Completo</label>
            <input
              {...register('fullName', { 
                required: 'El nombre completo es requerido' 
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'El email es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Por favor ingrese un email válido'
                }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">WhatsApp</label>
            <div className="flex">
              <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                <div className="relative">
                  <Listbox.Button className="relative w-24 py-2 pl-3 pr-2 border rounded-l-lg text-left cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span className="flex items-center">
                      {selectedCountry.flag}
                      <span className="ml-1">{selectedCountry.code}</span>
                      <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none"
                    aria-labelledby="headlessui-listbox-button-:r3:"
                    aria-orientation="vertical"
                    id="headlessui-listbox-options-:r5:"
                    role="listbox"
                    tabIndex={0}
                    data-headlessui-state="open"
                    style={{ width: 'calc(200% - 1rem)' }}
                  >
                    {countryCodes.map((country) => (
                      <Listbox.Option
                        key={country.code}
                        value={country}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center">
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.name}</span>
                            <span className="ml-2 text-gray-500">{country.code}</span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                ✓
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              <input
                type="tel"
                {...register('whatsapp', { 
                  required: 'El número de WhatsApp es requerido',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Por favor, ingrese solo números'
                  }
                })}
                className="flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Número de WhatsApp"
              />
            </div>
            {errors.whatsapp && (
              <span className="text-red-500 text-sm">{errors.whatsapp.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registrando...' : 'Continuar'}
          </button>
        </form>
      );
    };
