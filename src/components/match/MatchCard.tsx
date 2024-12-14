import React from 'react';
import { MatchScore } from '../../types/matching';

interface MatchCardProps {
  organization: {
    name: string;
    type: 'ong' | 'empresa';
    image?: string;
  };
  matchScore: MatchScore;
}

export function MatchCard({ organization, matchScore }: MatchCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={organization.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
          alt={organization.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-semibold text-white">{organization.name}</h3>
          <span className="text-sm text-white/80 capitalize">{organization.type}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Compatibilidade</span>
            <span className="text-lg font-semibold text-indigo-600">{matchScore.score}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${matchScore.score}%` }}
            />
          </div>
        </div>

        {matchScore.alignments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Principais Alinhamentos</h4>
            <ul className="space-y-1">
              {matchScore.alignments.map((alignment, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  {alignment}
                </li>
              ))}
            </ul>
          </div>
        )}

        {matchScore.concerns.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Pontos de Atenção</h4>
            <ul className="space-y-1">
              {matchScore.concerns.map((concern, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                  {concern}
                </li>
              ))}
            </ul>
          </div>
        )}

        {matchScore.conversationStarters.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Sugestões de Conversa</h4>
            <ul className="space-y-1">
              {matchScore.conversationStarters.map((starter, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                  {starter}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}