import React, { useState, useEffect } from 'react';
import { Heart, X, Building2, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardHeader } from '../components/dashboard/Header';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Button } from '../components/ui/Button';
import { MatchScore } from '../types/matching';

interface MatchProfile {
  id: string;
  name: string;
  type: 'ong' | 'empresa';
  description: string;
  values: string[];
  areas: string[];
  image: string;
  budget?: number;
  matchScore: MatchScore;
}

// Dados simulados para demonstração
const mockProfiles: MatchProfile[] = [
  {
    id: '1',
    name: 'Instituto Educação para Todos',
    type: 'ong',
    description: 'Focados em levar educação digital para comunidades carentes, com 5 anos de experiência e mais de 1000 jovens impactados.',
    values: ['Educação', 'Tecnologia', 'Inclusão Digital'],
    areas: ['Educação', 'Tecnologia'],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchScore: {
      score: 85,
      categoryScores: {
        coreValues: 90,
        lifestyle: 85,
        goals: 80,
        interests: 85
      },
      alignments: ['Forte alinhamento em educação', 'Experiência complementar'],
      concerns: [],
      conversationStarters: ['Discutir projetos de inclusão digital']
    }
  },
  {
    id: '2',
    name: 'TechCorp Brasil',
    type: 'empresa',
    description: 'Empresa de tecnologia comprometida com a transformação social através da educação digital.',
    values: ['Inovação', 'Educação', 'Sustentabilidade'],
    areas: ['Tecnologia', 'Educação'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    budget: 100000,
    matchScore: {
      score: 92,
      categoryScores: {
        coreValues: 95,
        lifestyle: 90,
        goals: 92,
        interests: 90
      },
      alignments: ['Objetivos alinhados', 'Orçamento compatível'],
      concerns: [],
      conversationStarters: ['Explorar possibilidades de parceria em educação digital']
    }
  }
];

export function Match() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    setMatches([...matches, mockProfiles[currentProfile].id]);
    if (currentProfile < mockProfiles.length - 1) {
      setCurrentProfile(currentProfile + 1);
      setShowDetails(false);
    }
  };

  const handleDislike = () => {
    if (currentProfile < mockProfiles.length - 1) {
      setCurrentProfile(currentProfile + 1);
      setShowDetails(false);
    }
  };

  const profile = mockProfiles[currentProfile];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Encontre Parcerias Ideais</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{currentProfile + 1}</span>
                <span>/</span>
                <span>{mockProfiles.length}</span>
              </div>
            </div>
            
            {currentProfile < mockProfiles.length ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="relative h-80">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <div className="flex items-center space-x-2">
                        {profile.type === 'ong' ? (
                          <Users className="h-6 w-6 text-white" />
                        ) : (
                          <Building2 className="h-6 w-6 text-white" />
                        )}
                        <h2 className="text-2xl font-bold text-white">
                          {profile.name}
                        </h2>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="bg-indigo-500 text-white text-sm px-3 py-1 rounded-full">
                          {profile.matchScore.score}% compatível
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sobre</h3>
                    <p className="text-gray-600">{profile.description}</p>
                  </div>

                  {showDetails ? (
                    <>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Análise de Compatibilidade</h3>
                        <div className="space-y-3">
                          {Object.entries(profile.matchScore.categoryScores).map(([category, score]) => (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 capitalize">
                                  {category.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="font-medium">{score}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-full bg-indigo-600 rounded-full"
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {profile.matchScore.alignments.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pontos Fortes</h3>
                          <ul className="space-y-2">
                            {profile.matchScore.alignments.map((alignment, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                                {alignment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {profile.matchScore.conversationStarters.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sugestões de Conversa</h3>
                          <ul className="space-y-2">
                            {profile.matchScore.conversationStarters.map((starter, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                                {starter}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="mb-6">
                      <Button
                        onClick={() => setShowDetails(true)}
                        variant="secondary"
                        className="w-full"
                      >
                        Ver Mais Detalhes
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleDislike}
                      className="p-4 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-8 w-8 text-gray-400" />
                    </button>
                    <button
                      onClick={handleLike}
                      className="p-4 bg-white border-2 border-indigo-200 rounded-full hover:bg-indigo-50 transition-colors"
                    >
                      <Heart className="h-8 w-8 text-indigo-600" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Não há mais perfis para mostrar
                </h2>
                <p className="text-gray-600 mb-6">
                  Volte mais tarde para encontrar novas parcerias!
                </p>
                <Button onClick={() => setCurrentProfile(0)}>
                  Recomeçar
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}