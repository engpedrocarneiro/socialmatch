import { MatchCriteria, MatchScore, WeightedCategory } from '../types/matching';

const WEIGHTS: WeightedCategory[] = [
  { name: 'coreValues', weight: 0.4 },
  { name: 'lifestyle', weight: 0.3 },
  { name: 'goals', weight: 0.2 },
  { name: 'interests', weight: 0.1 }
];

const MINIMUM_MATCH_THRESHOLD = 70;

export class MatchingEngine {
  private calculateValueAlignment(source: string[], target: string[]): number {
    const commonValues = source.filter(value => target.includes(value));
    return (commonValues.length / Math.max(source.length, target.length)) * 100;
  }

  private calculateExperienceCompatibility(source: number, target: number): number {
    const maxDiff = 10; // Maximum experience difference
    const diff = Math.abs(source - target);
    return Math.max(0, (1 - diff / maxDiff) * 100);
  }

  private calculateBudgetCompatibility(sourceBudget?: number, targetBudget?: number): number {
    if (!sourceBudget || !targetBudget) return 0;
    const ratio = Math.min(sourceBudget, targetBudget) / Math.max(sourceBudget, targetBudget);
    return ratio * 100;
  }

  private generateConversationStarters(source: MatchCriteria, target: MatchCriteria): string[] {
    const starters: string[] = [];
    
    // Common areas
    const commonAreas = source.areas.filter(area => target.areas.includes(area));
    if (commonAreas.length > 0) {
      starters.push(`Compartilhem experiências sobre projetos em ${commonAreas.join(', ')}`);
    }

    // Similar goals
    const commonGoals = source.impactGoals.filter(goal => target.impactGoals.includes(goal));
    if (commonGoals.length > 0) {
      starters.push(`Discutam estratégias para alcançar ${commonGoals[0]}`);
    }

    // Complementary strengths
    if (source.digitalPresence > 7 && target.digitalPresence < 5) {
      starters.push('Compartilhe suas estratégias de presença digital');
    }

    return starters;
  }

  private identifyDealbreakers(source: MatchCriteria, target: MatchCriteria): string[] {
    const dealbreakers: string[] = [];

    // Incompatible areas
    if (!source.areas.some(area => target.areas.includes(area))) {
      dealbreakers.push('Nenhuma área de atuação em comum');
    }

    // Budget mismatch
    if (source.type === 'empresa' && target.type === 'ong') {
      const minBudgetRequired = 50000;
      if (!source.budget || source.budget < minBudgetRequired) {
        dealbreakers.push('Orçamento insuficiente para projetos');
      }
    }

    return dealbreakers;
  }

  public calculateMatch(source: MatchCriteria, target: MatchCriteria): MatchScore {
    // Don't match same types
    if (source.type === target.type) {
      return {
        score: 0,
        categoryScores: {
          coreValues: 0,
          lifestyle: 0,
          goals: 0,
          interests: 0
        },
        alignments: [],
        concerns: ['Organizações do mesmo tipo não podem formar parceria'],
        conversationStarters: []
      };
    }

    const categoryScores = {
      coreValues: this.calculateValueAlignment(source.values, target.values),
      lifestyle: this.calculateExperienceCompatibility(source.experience, target.experience),
      goals: this.calculateValueAlignment(source.impactGoals, target.impactGoals),
      interests: this.calculateValueAlignment(source.areas, target.areas)
    };

    // Calculate weighted total score
    const totalScore = WEIGHTS.reduce((acc, { name, weight }) => {
      return acc + (categoryScores[name] * weight);
    }, 0);

    // Generate alignments
    const alignments: string[] = [];
    if (categoryScores.coreValues >= 80) {
      alignments.push('Forte alinhamento de valores');
    }
    if (categoryScores.goals >= 80) {
      alignments.push('Objetivos muito compatíveis');
    }
    if (categoryScores.interests >= 80) {
      alignments.push('Áreas de atuação complementares');
    }

    // Identify concerns
    const concerns = this.identifyDealbreakers(source, target);

    // Generate conversation starters
    const conversationStarters = this.generateConversationStarters(source, target);

    return {
      score: Math.round(totalScore),
      categoryScores,
      alignments,
      concerns,
      conversationStarters
    };
  }

  public findTopMatches(source: MatchCriteria, targets: MatchCriteria[]): MatchScore[] {
    return targets
      .map(target => this.calculateMatch(source, target))
      .filter(match => match.score >= MINIMUM_MATCH_THRESHOLD)
      .sort((a, b) => b.score - a.score);
  }
}