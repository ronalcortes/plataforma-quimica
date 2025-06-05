import React, { useState, useEffect } from 'react';
import { GameFormData, EducaplayGame } from '../types/game';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GameFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GameFormData) => Promise<void>;
  editingGame?: EducaplayGame | null;
  loading?: boolean;
}

const gameTypes = [
  'Word Search Puzzle',
  'Crossword Puzzle',
  'Froggy Jumps',
  'Matching Pairs',
  'Quiz',
  'Fill in the Blanks',
  'Alphabet',
  'Map Quiz',
  'Memory',
  'Matching',
  'Unscramble Letters',
  'Video Quiz',
  'Unscramble Words',
  'Riddle',
  'Yes or No',
  'Slideshow',
  'Dictation',
  'Dialogue',
  'Line Up',
];

export const GameForm: React.FC<GameFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingGame,
  loading = false,
}) => {
  const [formData, setFormData] = useState<GameFormData>({
    title: '',
    educaplayUrl: '',
    gameType: '',
  });

  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    if (editingGame) {
      setFormData({
        title: editingGame.title,
        educaplayUrl: editingGame.educaplayUrl,
        gameType: editingGame.gameType,
      });
    } else {
      setFormData({
        title: '',
        educaplayUrl: '',
        gameType: '',
      });
    }
    setUrlError('');
  }, [editingGame, isOpen]);

  const validateEducaplayUrl = (url: string): boolean => {
    const pattern =
      /^https:\/\/es\.educaplay\.com\/recursos-educativos\/\d+-.*\.html$/;
    return pattern.test(url);
  };

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, educaplayUrl: url });
    if (url && !validateEducaplayUrl(url)) {
      setUrlError(
        'La URL debe ser de Educaplay con el formato: https://es.educaplay.com/recursos-educativos/ID-nombre.html'
      );
    } else {
      setUrlError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (urlError || !validateEducaplayUrl(formData.educaplayUrl)) {
      setUrlError('Por favor, ingresa una URL válida de Educaplay');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar el juego:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center p-6 border-b'>
          <h2 className='text-2xl font-bold text-gray-800'>
            {editingGame ? 'Editar Juego' : 'Agregar Nuevo Juego de Química'}
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            aria-label='Cerrar formulario'
          >
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Título */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Título del Juego *
            </label>
            <input
              type='text'
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900'
              placeholder='Ej: Tabla Periódica Interactiva'
            />
          </div>

          {/* URL de Educaplay */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              URL de Educaplay *
            </label>
            <input
              type='url'
              required
              value={formData.educaplayUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                urlError ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='https://es.educaplay.com/recursos-educativos/12345-nombre-juego.html'
            />
            {urlError && (
              <p className='mt-1 text-sm text-red-600'>{urlError}</p>
            )}
            <p className='mt-1 text-xs text-gray-500'>
              Copia la URL completa desde la página de recursos de Educaplay
            </p>
          </div>

          {/* Tipo de Juego */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Tipo de Juego *
            </label>
            <select
              required
              value={formData.gameType}
              onChange={(e) =>
                setFormData({ ...formData, gameType: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900'
              aria-label='Seleccionar tipo de juego'
            >
              <option value=''>Selecciona un tipo</option>
              {gameTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Información adicional */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h3 className='text-sm font-medium text-blue-900 mb-2'>
              Información del juego:
            </h3>
            <ul className='text-sm text-blue-900 space-y-1'>
              <li>• Materia: Química (automático)</li>
              <li>• Dificultad: Medio (automático)</li>
              <li>• Se generará una descripción automáticamente</li>
            </ul>
          </div>

          {/* Botones */}
          <div className='flex gap-3 justify-end pt-4 border-t'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={loading || !!urlError}
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {loading && (
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              )}
              {editingGame ? 'Actualizar' : 'Crear'} Juego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
