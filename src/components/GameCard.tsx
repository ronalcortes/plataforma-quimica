import React, { useState } from 'react';
import { EducaplayGame } from '../types/game';
import {
  PlayIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ShareIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleIconSolid,
  ClockIcon as ClockIconSolid,
} from '@heroicons/react/24/solid';

interface GameCardProps {
  game: EducaplayGame;
  onEdit?: (game: EducaplayGame) => void;
  onDelete?: (gameId: string) => void;
  onApprove?: (gameId: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canApprove?: boolean;
  showApprovalStatus?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onEdit,
  onDelete,
  onApprove,
  canEdit = false,
  canDelete = false,
  canApprove = false,
  showApprovalStatus = true,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difícil':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: game.title,
          text: game.description,
          url: game.educaplayUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(game.educaplayUrl);
      // Aquí podrías mostrar un snackbar de confirmación
    }
  };

  const handleDelete = () => {
    if (onDelete && game.id) {
      onDelete(game.id);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col relative overflow-visible'>
        {/* Badge de aprobación */}
        {showApprovalStatus && (
          <div className='absolute -top-2 -right-2 z-10'>
            {game.isApproved ? (
              <div
                className='bg-green-500 rounded-full p-2 shadow-lg'
                title='Aprobado por el profesor'
              >
                <CheckCircleIconSolid className='w-4 h-4 text-white' />
              </div>
            ) : (
              <div
                className='bg-yellow-500 rounded-full p-2 shadow-lg'
                title='Pendiente de aprobación'
              >
                <ClockIconSolid className='w-4 h-4 text-white' />
              </div>
            )}
          </div>
        )}

        <div className='p-6 flex-grow'>
          <h3 className='text-xl font-bold text-blue-600 mb-3 line-clamp-2 min-h-[3.5rem]'>
            {game.title}
          </h3>

          <p className='text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem] text-sm'>
            {game.description}
          </p>

          <div className='flex flex-wrap gap-2 mb-4'>
            <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200'>
              {game.gameType}
            </span>
            {game.difficulty && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                  game.difficulty
                )}`}
              >
                {game.difficulty}
              </span>
            )}
            {game.subject && (
              <span className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200'>
                {game.subject}
              </span>
            )}
          </div>

          {game.tags && game.tags.length > 0 && (
            <div className='flex flex-wrap gap-1 mb-4'>
              {game.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs'
                >
                  {tag}
                </span>
              ))}
              {game.tags.length > 3 && (
                <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs border border-gray-300'>
                  +{game.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className='text-xs text-gray-500'>
            <div>Creado: {formatDate(game.createdAt)}</div>
            {game.updatedAt && game.updatedAt !== game.createdAt && (
              <div>Actualizado: {formatDate(game.updatedAt)}</div>
            )}
          </div>
        </div>

        <div className='px-6 pb-6 flex justify-between items-center'>
          <button
            onClick={() => setShowPreview(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200'
          >
            <PlayIcon className='w-4 h-4' />
            Jugar
          </button>

          <div className='flex gap-2'>
            <button
              onClick={handleShare}
              className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
              title='Compartir'
            >
              <ShareIcon className='w-5 h-5' />
            </button>

            <button
              onClick={() => setShowPreview(true)}
              className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
              title='Vista previa'
            >
              <EyeIcon className='w-5 h-5' />
            </button>

            {canEdit && onEdit && (
              <button
                onClick={() => onEdit(game)}
                className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                title='Editar'
              >
                <PencilIcon className='w-5 h-5' />
              </button>
            )}

            {canDelete && onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className='p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                title='Eliminar'
              >
                <TrashIcon className='w-5 h-5' />
              </button>
            )}

            {canApprove && onApprove && !game.isApproved && game.id && (
              <button
                onClick={() => onApprove(game.id!)}
                className='px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded-lg hover:bg-green-200 transition-colors duration-200 flex items-center gap-1 text-sm'
              >
                <CheckCircleIcon className='w-4 h-4' />
                Aprobar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de vista previa */}
      {showPreview && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col'>
            <div className='flex justify-between items-center p-4 border-b'>
              <h2 className='text-xl font-bold text-gray-800'>{game.title}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                <XMarkIcon className='w-6 h-6' />
              </button>
            </div>
            <div className='flex-1 p-0'>
              <iframe
                src={game.iframeUrl}
                width='100%'
                height='100%'
                frameBorder='0'
                allow='fullscreen; autoplay; allow-top-navigation-by-user-activation'
                allowFullScreen
                className='w-full h-full min-h-[600px]'
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-md w-full p-6'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              Confirmar eliminación
            </h3>
            <p className='text-gray-600 mb-6'>
              ¿Estás seguro de que quieres eliminar el juego "{game.title}"?
              Esta acción no se puede deshacer.
            </p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200'
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
