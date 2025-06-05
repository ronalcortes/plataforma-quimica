import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';
import { EducaplayGame, GameFormData, GameFilters } from '../types/game';
import { where, orderBy, limit } from 'firebase/firestore';

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
    pageSize: number = 10,
    lastGameDate?: Date
  ) => {
    const constraints = [];

    // Filtro por usuario si se proporciona
    if (userIdFilter) {
      constraints.push(where('userId', '==', userIdFilter));
    }

    // Aplicar filtros adicionales
    if (filters.subject) {
      constraints.push(where('subject', '==', filters.subject));
    }

    if (filters.difficulty) {
      constraints.push(where('difficulty', '==', filters.difficulty));
    }

    if (filters.isApproved !== undefined) {
      constraints.push(where('isApproved', '==', filters.isApproved));
    }

    if (filters.gameType) {
      constraints.push(where('gameType', '==', filters.gameType));
    }

    // Ordenar por fecha de creación (más recientes primero)
    constraints.push(orderBy('createdAt', 'desc'));

    // Limitar resultados
    constraints.push(limit(pageSize));

    const result = await getCollection('games', constraints);

    if (result.data && !result.error) {
      setGames(result.data as EducaplayGame[]);
      setTotalGames(result.data.length);
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
