export interface MatchCriteria {
  id: string;
  type: 'ong' | 'empresa';
  values: string[];
  areas: string[];
  experience: number;
  sustainability: number;
  budget?: number;
  teamSize: number;
  digitalPresence: number;
  impactGoals: string[];
}

export interface MatchScore {
  score: number;
  categoryScores: {
    coreValues: number;
    lifestyle: number;
    goals: number;
    interests: number;
  };
  alignments: string[];
  concerns: string[];
  conversationStarters: string[];
}

export interface WeightedCategory {
  name: keyof MatchScore['categoryScores'];
  weight: number;
}