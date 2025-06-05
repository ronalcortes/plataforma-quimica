import React from 'react';
import { GameFilters as GameFiltersType } from '../types/game';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface GameFiltersProps {
  filters: GameFiltersType;
  onFiltersChange: (filters: GameFiltersType) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

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

export const GameFilters: React.FC<GameFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle,
}) => {
  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== ''
  ).length;

  const updateFilter = (
    key: keyof GameFiltersType,
    value: string | boolean | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
      {/* Header del filtro */}
      <button
        onClick={onToggle}
        className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
      >
        <div className='flex items-center gap-3'>
          <FunnelIcon className='w-5 h-5 text-gray-600' />
          <span className='font-medium text-gray-900'>Filtros</span>
          {activeFiltersCount > 0 && (
            <span className='bg-blue-600 text-white text-xs px-2 py-1 rounded-full'>
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </button>

      {/* Panel de filtros */}
      {isOpen && (
        <div className='px-6 pb-6 border-t border-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {/* Filtro por materia */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Materia
              </label>
              <select
                value={filters.subject || ''}
                onChange={(e) => updateFilter('subject', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              >
                <option value=''>Todas las materias</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por tipo de juego */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tipo de Juego
              </label>
              <select
                value={filters.gameType || ''}
                onChange={(e) => updateFilter('gameType', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              >
                <option value=''>Todos los tipos</option>
                {gameTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por dificultad */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Dificultad
              </label>
              <select
                value={filters.difficulty || ''}
                onChange={(e) => updateFilter('difficulty', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              >
                <option value=''>Todas las dificultades</option>
                <option value='Fácil'>Fácil</option>
                <option value='Medio'>Medio</option>
                <option value='Difícil'>Difícil</option>
              </select>
            </div>

            {/* Filtro por estado de aprobación */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Estado de Aprobación
              </label>
              <select
                value={
                  filters.isApproved === undefined
                    ? ''
                    : filters.isApproved.toString()
                }
                onChange={(e) => {
                  const value = e.target.value;
                  updateFilter(
                    'isApproved',
                    value === '' ? undefined : value === 'true'
                  );
                }}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              >
                <option value=''>Todos los estados</option>
                <option value='true'>Aprobados</option>
                <option value='false'>Pendientes de aprobación</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          {activeFiltersCount > 0 && (
            <div className='flex justify-end mt-6 pt-4 border-t border-gray-200'>
              <button
                onClick={onClearFilters}
                className='px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2'
              >
                <XMarkIcon className='w-4 h-4' />
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
