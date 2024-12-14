import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MatchingEngine } from '../utils/matchingEngine';
import { MatchCriteria, MatchScore } from '../types/matching';

const matchingEngine = new MatchingEngine();

export async function findMatches(organization: MatchCriteria) {
  try {
    // Buscar organizações do tipo oposto
    const organizationsRef = collection(db, 'organizations');
    const q = query(
      organizationsRef,
      where('type', '!=', organization.type)
    );
    
    const snapshot = await getDocs(q);
    const potentialMatches = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MatchCriteria[];

    // Calcular matches usando o engine
    const matches = matchingEngine.findTopMatches(organization, potentialMatches);

    return matches;
  } catch (error) {
    console.error('Erro ao buscar matches:', error);
    throw new Error('Falha ao processar matches');
  }
}

export async function saveMatch(
  sourceId: string,
  targetId: string,
  matchScore: MatchScore
) {
  try {
    await addDoc(collection(db, 'matches'), {
      sourceId,
      targetId,
      score: matchScore.score,
      categoryScores: matchScore.categoryScores,
      alignments: matchScore.alignments,
      concerns: matchScore.concerns,
      conversationStarters: matchScore.conversationStarters,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Erro ao salvar match:', error);
    throw new Error('Falha ao salvar match');
  }
}