import React from 'react';
import { EducaplayGame } from '../types/game';
import {
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface GameStatsProps {
  games: EducaplayGame[];
  filteredGames: EducaplayGame[];
}

export const GameStats: React.FC<GameStatsProps> = ({
  games,
  filteredGames,
}) => {
  const totalGames = games.length;
  const approvedGames = games.filter((game) => game.isApproved).length;
  const pendingGames = games.filter((game) => !game.isApproved).length;
  const filteredCount = filteredGames.length;

  const approvalRate =
    totalGames > 0 ? Math.round((approvedGames / totalGames) * 100) : 0;

  const stats = [
    {
      title: 'Total de Juegos',
      value: totalGames,
      icon: AcademicCapIcon,
      color: 'blue',
      description: 'Juegos creados en total',
    },
    {
      title: 'Aprobados',
      value: approvedGames,
      icon: CheckCircleIcon,
      color: 'green',
      description: 'Juegos aprobados por profesores',
    },
    {
      title: 'Pendientes',
      value: pendingGames,
      icon: ClockIcon,
      color: 'yellow',
      description: 'Esperando aprobación',
    },
    {
      title: 'Resultados',
      value: filteredCount,
      icon: ChartBarIcon,
      color: 'purple',
      description: 'Juegos que coinciden con filtros',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'text-blue-500',
        border: 'border-blue-200',
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'text-green-500',
        border: 'border-green-200',
      },
      yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        icon: 'text-yellow-500',
        border: 'border-yellow-200',
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        icon: 'text-purple-500',
        border: 'border-purple-200',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        const IconComponent = stat.icon;

        return (
          <div
            key={index}
            className={`${colors.bg} ${colors.border} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <div className='flex items-center justify-between mb-4'>
              <div
                className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}
              >
                <IconComponent className={`w-6 h-6 ${colors.icon}`} />
              </div>
              {stat.title === 'Aprobados' && totalGames > 0 && (
                <div className={`text-xs ${colors.text} font-medium`}>
                  {approvalRate}%
                </div>
              )}
            </div>

            <div className='space-y-2'>
              <div className={`text-3xl font-bold ${colors.text}`}>
                {stat.value.toLocaleString()}
              </div>
              <div className='text-sm font-medium text-gray-900'>
                {stat.title}
              </div>
              <div className='text-xs text-gray-600'>{stat.description}</div>
            </div>

            {/* Barra de progreso para aprobados */}
            {stat.title === 'Aprobados' && totalGames > 0 && (
              <div className='mt-4'>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      stat.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${approvalRate}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
