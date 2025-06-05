import React, { useState, useEffect } from 'react';
import { GameFormData, EducaplayGame } from '../types/game';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

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

const subjects = [
  'Matemáticas',
  'Ciencias',
  'Historia',
  'Geografía',
  'Lengua',
  'Inglés',
  'Arte',
  'Música',
  'Educación Física',
  'Tecnología',
  'Filosofía',
  'Química',
  'Física',
  'Biología',
  'Otro',
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
    description: '',
    educaplayUrl: '',
    gameType: '',
    tags: [],
    difficulty: 'Medio',
    subject: '',
  });

  const [newTag, setNewTag] = useState('');
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    if (editingGame) {
      setFormData({
        title: editingGame.title,
        description: editingGame.description,
        educaplayUrl: editingGame.educaplayUrl,
        gameType: editingGame.gameType,
        tags: editingGame.tags || [],
        difficulty: editingGame.difficulty || 'Medio',
        subject: editingGame.subject || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        educaplayUrl: '',
        gameType: '',
        tags: [],
        difficulty: 'Medio',
        subject: '',
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

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
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
      <div className='bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center p-6 border-b'>
          <h2 className='text-2xl font-bold text-gray-800'>
            {editingGame ? 'Editar Juego' : 'Agregar Nuevo Juego'}
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
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
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Ingresa el título del juego'
            />
          </div>

          {/* Descripción */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Descripción *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Describe brevemente el juego y su objetivo'
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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

          {/* Tipo de Juego y Materia */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Selecciona un tipo</option>
                {gameTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Materia *
              </label>
              <select
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Selecciona una materia</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dificultad */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Dificultad
            </label>
            <div className='flex gap-4'>
              {(['Fácil', 'Medio', 'Difícil'] as const).map((level) => (
                <label key={level} className='flex items-center'>
                  <input
                    type='radio'
                    name='difficulty'
                    value={level}
                    checked={formData.difficulty === level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as any,
                      })
                    }
                    className='mr-2 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='text-sm text-gray-700'>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Etiquetas
            </label>
            <div className='flex gap-2 mb-2'>
              <input
                type='text'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addTag())
                }
                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Agregar etiqueta'
              />
              <button
                type='button'
                onClick={addTag}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2'
              >
                <PlusIcon className='w-4 h-4' />
                Agregar
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeTag(tag)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
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
