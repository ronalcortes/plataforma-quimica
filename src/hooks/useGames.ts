import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';
import { EducaplayGame, GameFormData, GameFilters } from '../types/game';
import { limit } from 'firebase/firestore';

export const useGames = (userId?: string) => {
  const {
    loading,
    error,
    createDocument,
    getCollection,
    updateDocument,
    deleteDocument,
  } = useFirestore();

  const [games, setGames] = useState<EducaplayGame[]>([]);
  const [totalGames, setTotalGames] = useState(0);

  // Función para extraer el ID del juego desde la URL de Educaplay
  const extractGameIdFromUrl = (url: string): string | null => {
    const match = url.match(/\/recursos-educativos\/(\d+)-/);
    return match ? match[1] : null;
  };

  // Función para convertir URL de recurso a URL de juego (iframe)
  const convertToIframeUrl = (resourceUrl: string): string => {
    const gameId = extractGameIdFromUrl(resourceUrl);
    if (!gameId) return resourceUrl;

    // Extraer el nombre del juego de la URL
    const nameMatch = resourceUrl.match(/\/(\d+)-(.+)\.html$/);
    const gameName = nameMatch ? nameMatch[2] : 'juego';

    return `https://es.educaplay.com/juego/${gameId}-${gameName}.html`;
  };

  // Crear nuevo juego
  const createGame = async (gameData: GameFormData, userId: string) => {
    const iframeUrl = convertToIframeUrl(gameData.educaplayUrl);

    const newGame: Omit<EducaplayGame, 'id'> = {
      ...gameData,
      userId,
      iframeUrl,
      description: `Juego de ${gameData.gameType} - ${gameData.title}`,
      subject: 'Química',
      difficulty: 'Medio',
      tags: [],
      isApproved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await createDocument('games', newGame);
    if (result.id && !result.error) {
      await loadGames(userId);
    }
    return result;
  };

  // Cargar juegos con filtros y paginación
  const loadGames = async (
    userIdFilter?: string,
    filters: GameFilters = {},
    pageSize: number = 100 // Aumentamos el límite para filtrar en cliente
  ) => {
    const constraints = [];

    // Limitar resultados sin filtros para evitar índices completamente
    constraints.push(limit(pageSize));

    const result = await getCollection('games', constraints);

    if (result.data && !result.error) {
      let filteredData = result.data as EducaplayGame[];

      // Filtrar por usuario en el cliente
      if (userIdFilter) {
        filteredData = filteredData.filter(
          (game) => game.userId === userIdFilter
        );
      }

      // Ordenar por fecha en el cliente (más recientes primero)
      filteredData.sort((a, b) => {
        const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
        const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
        return timeB - timeA;
      });

      // Aplicar filtros adicionales en el cliente
      if (filters.subject) {
        filteredData = filteredData.filter(
          (game) => game.subject === filters.subject
        );
      }

      if (filters.difficulty) {
        filteredData = filteredData.filter(
          (game) => game.difficulty === filters.difficulty
        );
      }

      if (filters.isApproved !== undefined) {
        filteredData = filteredData.filter(
          (game) => game.isApproved === filters.isApproved
        );
      }

      if (filters.gameType) {
        filteredData = filteredData.filter(
          (game) => game.gameType === filters.gameType
        );
      }

      setGames(filteredData);
      setTotalGames(filteredData.length);
    }

    return result;
  };

  // Actualizar juego
  const updateGame = async (
    gameId: string,
    updates: Partial<EducaplayGame>
  ) => {
    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    const result = await updateDocument('games', gameId, updateData);
    if (!result.error && userId) {
      await loadGames(userId);
    }
    return result;
  };

  // Eliminar juego
  const removeGame = async (gameId: string) => {
    const result = await deleteDocument('games', gameId);
    if (!result.error && userId) {
      await loadGames(userId);
    }
    return result;
  };

  // Aprobar juego (solo para profesores)
  const approveGame = async (gameId: string, teacherId: string) => {
    return await updateGame(gameId, {
      isApproved: true,
      approvedBy: teacherId,
      approvalDate: new Date(),
    });
  };

  // Cargar juegos al montar el componente
  useEffect(() => {
    if (userId) {
      loadGames(userId);
    }
  }, [userId]);

  return {
    games,
    totalGames,
    loading,
    error,
    createGame,
    loadGames,
    updateGame,
    removeGame,
    approveGame,
    extractGameIdFromUrl,
    convertToIframeUrl,
  };
};
