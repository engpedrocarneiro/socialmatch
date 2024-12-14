interface MatchScore {
  organizationId: string;
  score: number;
  matchReasons: string[];
}

interface Organization {
  id: string;
  type: 'ong' | 'empresa';
  name: string;
  areas: string[];
  values: string[];
  experience: number;
  sustainability: number;
  budget?: number;
}

// Mock data para demonstração
const mockOrganizations: Organization[] = [
  {
    id: '1',
    type: 'ong',
    name: 'Instituto Educação Digital',
    areas: ['Educação', 'Tecnologia'],
    values: ['Inovação', 'Educação'],
    experience: 5,
    sustainability: 8
  },
  {
    id: '2',
    type: 'empresa',
    name: 'TechCorp Brasil',
    areas: ['Tecnologia', 'Educação'],
    values: ['Inovação', 'Impacto Social'],
    experience: 10,
    sustainability: 7,
    budget: 100000
  },
  {
    id: '3',
    type: 'ong',
    name: 'Saúde para Todos',
    areas: ['Saúde', 'Assistência Social'],
    values: ['Inclusão Social', 'Transparência'],
    experience: 8,
    sustainability: 6
  },
  {
    id: '4',
    type: 'empresa',
    name: 'Green Solutions',
    areas: ['Meio Ambiente', 'Sustentabilidade'],
    values: ['Sustentabilidade', 'Inovação'],
    experience: 7,
    sustainability: 9,
    budget: 150000
  }
];

export function calculateMatchScore(organization: Organization, target: Organization): MatchScore {
  let score = 0;
  const matchReasons: string[] = [];

  // Não fazer match entre organizações do mesmo tipo
  if (organization.type === target.type) {
    return { organizationId: target.id, score: 0, matchReasons: [] };
  }

  // Áreas de atuação em comum (peso: 30%)
  const commonAreas = organization.areas.filter(area => target.areas.includes(area));
  const areaScore = (commonAreas.length / Math.max(organization.areas.length, target.areas.length)) * 30;
  score += areaScore;
  if (commonAreas.length > 0) {
    matchReasons.push(`${commonAreas.length} áreas em comum: ${commonAreas.join(', ')}`);
  }

  // Valores compartilhados (peso: 25%)
  const commonValues = organization.values.filter(value => target.values.includes(value));
  const valueScore = (commonValues.length / Math.max(organization.values.length, target.values.length)) * 25;
  score += valueScore;
  if (commonValues.length > 0) {
    matchReasons.push(`${commonValues.length} valores compartilhados: ${commonValues.join(', ')}`);
  }

  // Experiência complementar (peso: 20%)
  const expDiff = Math.abs(organization.experience - target.experience);
  const expScore = (1 - expDiff / 20) * 20; // 20 anos como máximo
  score += expScore;
  if (expDiff <= 5) {
    matchReasons.push('Níveis de experiência compatíveis');
  }

  // Sustentabilidade (peso: 15%)
  const sustScore = (Math.min(organization.sustainability, target.sustainability) / 10) * 15;
  score += sustScore;
  if (sustScore > 10) {
    matchReasons.push('Alto comprometimento com sustentabilidade');
  }

  // Orçamento (peso: 10%) - apenas se uma for empresa
  if (organization.type === 'empresa' && organization.budget && organization.budget > 50000) {
    score += 10;
    matchReasons.push('Orçamento adequado para projetos');
  }

  return {
    organizationId: target.id,
    score: Math.round(score),
    matchReasons
  };
}

export function findBestMatches(organization: Organization): MatchScore[] {
  return mockOrganizations
    .filter(org => org.id !== organization.id)
    .map(target => calculateMatchScore(organization, target))
    .sort((a, b) => b.score - a.score)
    .filter(match => match.score > 50); // Apenas matches com score > 50%
}