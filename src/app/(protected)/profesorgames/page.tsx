'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination } from '../../../components/Pagination';
import { useGames } from '../../../hooks/useGames';
import { useAuthContext } from '../../../contexts/AuthContext';
import { EducaplayGame, GameFilters } from '../../../types/game';
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';

export default function ProfesorGamesPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();

  const { games, loading, error, loadGames, approveGame } = useGames();

  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [filters, setFilters] = useState<GameFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(10);
  const [selectedGame, setSelectedGame] = useState<EducaplayGame | null>(null);

  // Verificar autenticación y rol de profesor
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    // Aquí podrías agregar verificación de rol de profesor
  }, [user, authLoading, router]);

  // Cargar todos los juegos (sin filtro de usuario para ver todos)
  useEffect(() => {
    loadGames(undefined, filters); // Sin userId para cargar todos los juegos
  }, [filters]);

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar nada (se está redirigiendo)
  if (!user) {
    return null;
  }

  // Filtrar juegos basado en búsqueda
  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (game.description &&
        game.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      game.gameType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUserSearch =
      !userSearchTerm ||
      game.userId.toLowerCase().includes(userSearchTerm.toLowerCase());

    const matchesSubject = !filters.subject || game.subject === filters.subject;
    const matchesDifficulty =
      !filters.difficulty || game.difficulty === filters.difficulty;
    const matchesApproval =
      filters.isApproved === undefined ||
      game.isApproved === filters.isApproved;
    const matchesGameType =
      !filters.gameType || game.gameType === filters.gameType;

    return (
      matchesSearch &&
      matchesUserSearch &&
      matchesSubject &&
      matchesDifficulty &&
      matchesApproval &&
      matchesGameType
    );
  });

  // Paginación
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const paginatedGames = filteredGames.slice(
    startIndex,
    startIndex + gamesPerPage
  );

  const handleApproveGame = async (gameId: string, approve: boolean) => {
    if (approve) {
      await approveGame(gameId, user?.uid || 'profesor');
    } else {
      // Rechazar juego (actualizar para marcar como no aprobado)
      // Aquí podrías implementar una función para rechazar
    }
    // Recargar juegos después de la acción
    loadGames(undefined, filters);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (game: EducaplayGame) => {
    if (game.isApproved) {
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
          <CheckCircleIcon className='w-4 h-4 mr-1' />
          Aprobado
        </span>
      );
    } else {
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
          <ClockIcon className='w-4 h-4 mr-1' />
          Pendiente
        </span>
      );
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Gestión de Juegos - Profesor
              </h1>
              <p className='text-gray-600 mt-1'>
                Revisa y aprueba los juegos creados por estudiantes
              </p>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <span className='font-medium'>{filteredGames.length}</span>
              juegos encontrados
            </div>
          </div>
        </div>
      </div>

      {/* Filtros compactos */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='bg-white rounded-lg shadow-sm p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* Búsqueda por juego */}
            <div className='relative'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Buscar juegos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Búsqueda por usuario */}
            <div className='relative'>
              <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Buscar por usuario...'
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className='w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Filtro por estado */}
            <select
              value={
                filters.isApproved === undefined
                  ? ''
                  : filters.isApproved.toString()
              }
              onChange={(e) =>
                setFilters({
                  ...filters,
                  isApproved:
                    e.target.value === ''
                      ? undefined
                      : e.target.value === 'true',
                })
              }
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              title='Filtrar por estado de aprobación'
            >
              <option value=''>Todos los estados</option>
              <option value='true'>Aprobados</option>
              <option value='false'>Pendientes</option>
            </select>

            {/* Filtro por tipo de juego */}
            <select
              value={filters.gameType || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  gameType: e.target.value || undefined,
                })
              }
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              title='Filtrar por tipo de juego'
            >
              <option value=''>Todos los tipos</option>
              <option value='Crucigrama'>Crucigrama</option>
              <option value='Sopa de letras'>Sopa de letras</option>
              <option value='Quiz'>Quiz</option>
              <option value='Memoria'>Memoria</option>
              <option value='Completar'>Completar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de juegos */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'>
        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            <span className='ml-3 text-gray-600'>Cargando juegos...</span>
          </div>
        ) : error ? (
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
            <p className='text-red-600'>Error al cargar los juegos: {error}</p>
            <button
              onClick={() => loadGames(undefined, filters)}
              className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
            >
              Reintentar
            </button>
          </div>
        ) : paginatedGames.length === 0 ? (
          <div className='bg-white rounded-lg shadow-sm p-12 text-center'>
            <div className='text-gray-400 mb-4'>
              <ExclamationCircleIcon className='w-16 h-16 mx-auto' />
            </div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
              No se encontraron juegos
            </h3>
            <p className='text-gray-500'>
              No hay juegos que coincidan con los filtros seleccionados
            </p>
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Juego
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Usuario
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Tipo
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Estado
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Fecha
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {paginatedGames.map((game) => (
                    <tr key={game.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm font-medium text-gray-900'>
                              {game.title}
                            </div>
                            {game.description && (
                              <div className='text-sm text-gray-500 truncate max-w-xs'>
                                {game.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <UserIcon className='w-4 h-4 text-gray-400 mr-2' />
                          <span className='text-sm text-gray-900'>
                            {game.userId}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                          {game.gameType}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {getStatusBadge(game)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <div className='flex items-center'>
                          <CalendarIcon className='w-4 h-4 mr-1' />
                          {formatDate(game.createdAt)}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex items-center space-x-2'>
                          {/* Ver juego */}
                          <button
                            onClick={() => setSelectedGame(game)}
                            className='text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50'
                            title='Ver juego'
                          >
                            <EyeIcon className='w-4 h-4' />
                          </button>

                          {/* Aprobar/Rechazar */}
                          {!game.isApproved && (
                            <>
                              <button
                                onClick={() =>
                                  handleApproveGame(game.id!, true)
                                }
                                className='text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50'
                                title='Aprobar juego'
                              >
                                <CheckIcon className='w-4 h-4' />
                              </button>
                              <button
                                onClick={() =>
                                  handleApproveGame(game.id!, false)
                                }
                                className='text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50'
                                title='Rechazar juego'
                              >
                                <XMarkIcon className='w-4 h-4' />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className='px-6 py-4 border-t border-gray-200'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={gamesPerPage}
                totalItems={filteredGames.length}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal para ver juego */}
      {selectedGame && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden'>
            <div className='flex justify-between items-center p-6 border-b'>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  {selectedGame.title}
                </h3>
                <p className='text-sm text-gray-500 mt-1'>
                  Creado por: {selectedGame.userId}
                </p>
              </div>
              <button
                onClick={() => setSelectedGame(null)}
                className='text-gray-400 hover:text-gray-600'
                title='Cerrar modal'
              >
                <XMarkIcon className='w-6 h-6' />
              </button>
            </div>
            <div className='p-6'>
              <div className='aspect-video w-full'>
                <iframe
                  src={selectedGame.iframeUrl}
                  className='w-full h-full border rounded-lg'
                  title={selectedGame.title}
                />
              </div>
              <div className='mt-4 flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                  {getStatusBadge(selectedGame)}
                  <span className='text-sm text-gray-500'>
                    Tipo: {selectedGame.gameType}
                  </span>
                </div>
                {!selectedGame.isApproved && (
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => {
                        handleApproveGame(selectedGame.id!, true);
                        setSelectedGame(null);
                      }}
                      className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
                    >
                      <CheckIcon className='w-4 h-4' />
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        handleApproveGame(selectedGame.id!, false);
                        setSelectedGame(null);
                      }}
                      className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
                    >
                      <XMarkIcon className='w-4 h-4' />
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
