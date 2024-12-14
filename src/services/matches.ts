import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface Match {
  id: string;
  userId: string;
  targetId: string;
  createdAt: Date;
}

export async function createMatch(userId: string, targetId: string) {
  try {
    const matchData = {
      userId,
      targetId,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'matches'), matchData);
    return docRef.id;
  } catch (error) {
    throw new Error('Erro ao criar match');
  }
}

export async function getMatches(userId: string): Promise<Match[]> {
  try {
    const matchesRef = collection(db, 'matches');
    const q = query(matchesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Match[];
  } catch (error) {
    throw new Error('Erro ao buscar matches');
  }
}

export async function deleteMatch(matchId: string) {
  try {
    await deleteDoc(doc(db, 'matches', matchId));
  } catch (error) {
    throw new Error('Erro ao deletar match');
  }
}

export async function checkMutualMatch(userId: string, targetId: string): Promise<boolean> {
  try {
    const matchesRef = collection(db, 'matches');
    const q = query(
      matchesRef,
      where('userId', '==', targetId),
      where('targetId', '==', userId)
    );
    const snapshot = await getDocs(q);
    
    return !snapshot.empty;
  } catch (error) {
    throw new Error('Erro ao verificar match mútuo');
  }
}