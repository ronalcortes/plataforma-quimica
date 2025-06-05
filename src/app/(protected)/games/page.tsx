'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameCard } from '../../../components/GameCard';
import { GameForm } from '../../../components/GameForm';
import { Pagination } from '../../../components/Pagination';
import { useGames } from '../../../hooks/useGames';
import { useAuthContext } from '../../../contexts/AuthContext';
import { EducaplayGame, GameFilters, GameFormData } from '../../../types/game';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

export default function GamesPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();

  const {
    games,
    loading,
    error,
    createGame,
    loadGames,
    updateGame,
    removeGame,
    approveGame,
  } = useGames(user?.uid);

  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState<EducaplayGame | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<GameFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

  // Verificar autenticación
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Recargar juegos cuando cambien los filtros
  useEffect(() => {
    if (user?.uid) {
      loadGames(user.uid, filters);
    }
  }, [filters, user?.uid]);

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

  // Filtrar juegos basado en búsqueda y filtros
  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (game.description &&
        game.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      game.gameType.toLowerCase().includes(searchTerm.toLowerCase());

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

  const handleCreateGame = async (gameData: GameFormData) => {
    if (user?.uid) {
      await createGame(gameData, user.uid);
      setShowForm(false);
    }
  };

  const handleEditGame = (game: EducaplayGame) => {
    setEditingGame(game);
    setShowForm(true);
  };

  const handleUpdateGame = async (gameData: GameFormData) => {
    if (editingGame?.id) {
      await updateGame(editingGame.id, gameData);
      setEditingGame(null);
      setShowForm(false);
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    await removeGame(gameId);
  };

  const handleApproveGame = async (gameId: string) => {
    await approveGame(gameId, 'teacher123'); // Mock teacher ID
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <button
              onClick={() => setShowForm(true)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl'
            >
              <PlusIcon className='w-5 h-5' />
              Agregar Juego
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Barra de búsqueda */}
            <div className='flex-1 relative'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Buscar juegos por título, descripción o tipo...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Botón de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200'
            >
              <FunnelIcon className='w-5 h-5' />
              Filtros
              {Object.keys(filters).length > 0 && (
                <span className='bg-blue-600 text-white text-xs px-2 py-1 rounded-full'>
                  {Object.keys(filters).length}
                </span>
              )}
            </button>
          </div>

          {/* Panel de filtros expandible */}
          {showFilters && (
            <div className='mt-4 pt-4 border-t border-gray-200'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {/* Filtro por materia */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Materia
                  </label>
                  <select
                    value={filters.subject || ''}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        subject: e.target.value || undefined,
                      })
                    }
                    aria-label='Filtrar por materia'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    <option value=''>Todas las materias</option>
                    <option value='Matemáticas'>Matemáticas</option>
                    <option value='Ciencias'>Ciencias</option>
                    <option value='Historia'>Historia</option>
                    <option value='Lengua'>Lengua</option>
                    <option value='Inglés'>Inglés</option>
                  </select>
                </div>

                {/* Filtro por dificultad */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Dificultad
                  </label>
                  <select
                    value={filters.difficulty || ''}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        difficulty: e.target.value || undefined,
                      })
                    }
                    aria-label='Filtrar por dificultad'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                    Estado
                  </label>
                  <select
                    value={
                      filters.isApproved === undefined
                        ? ''
                        : filters.isApproved.toString()
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilters({
                        ...filters,
                        isApproved: value === '' ? undefined : value === 'true',
                      });
                    }}
                    aria-label='Filtrar por estado de aprobación'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    <option value=''>Todos los estados</option>
                    <option value='true'>Aprobados</option>
                    <option value='false'>Pendientes</option>
                  </select>
                </div>

                {/* Botón limpiar filtros */}
                <div className='flex items-end'>
                  <button
                    onClick={clearFilters}
                    className='w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de juegos */}
        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            <span className='ml-3 text-gray-600'>Cargando juegos...</span>
          </div>
        ) : error ? (
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
            <p className='text-red-600'>Error al cargar los juegos: {error}</p>
            <button
              onClick={() => user?.uid && loadGames(user.uid)}
              className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
            >
              Reintentar
            </button>
          </div>
        ) : paginatedGames.length === 0 ? (
          <div className='bg-white rounded-lg shadow-sm p-12 text-center'>
            <div className='text-gray-400 mb-4'>
              <AdjustmentsHorizontalIcon className='w-16 h-16 mx-auto' />
            </div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
              {searchTerm || Object.keys(filters).length > 0
                ? 'No se encontraron juegos'
                : 'No tienes juegos aún'}
            </h3>
            <p className='text-gray-500 mb-6'>
              {searchTerm || Object.keys(filters).length > 0
                ? 'Intenta ajustar tus filtros de búsqueda'
                : 'Comienza creando tu primer juego de Educaplay'}
            </p>
            {!searchTerm && Object.keys(filters).length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors duration-200'
              >
                <PlusIcon className='w-5 h-5' />
                Agregar Primer Juego
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Grid de juegos */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
              {paginatedGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onEdit={handleEditGame}
                  onDelete={handleDeleteGame}
                  onApprove={handleApproveGame}
                  canEdit={true}
                  canDelete={true}
                  canApprove={false} // Solo profesores pueden aprobar
                  showApprovalStatus={true}
                />
              ))}
            </div>

            {/* Paginación */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={gamesPerPage}
              totalItems={filteredGames.length}
            />
          </>
        )}
      </div>

      {/* Formulario de juego */}
      <GameForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingGame(null);
        }}
        onSubmit={editingGame ? handleUpdateGame : handleCreateGame}
        editingGame={editingGame}
        loading={loading}
      />
    </div>
  );
}
