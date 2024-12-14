import { 
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Project } from '../types';

export async function getProjects(userId: string): Promise<Project[]> {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('partners', 'array-contains', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    throw new Error('Erro ao buscar projetos');
  }
}

export async function getProject(projectId: string): Promise<Project> {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Projeto não encontrado');
    }

    return { id: docSnap.id, ...docSnap.data() } as Project;
  } catch (error) {
    throw new Error('Erro ao buscar projeto');
  }
}

export async function createProject(project: Omit<Project, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'projects'), project);
    return docRef.id;
  } catch (error) {
    throw new Error('Erro ao criar projeto');
  }
}

export async function updateProject(projectId: string, updates: Partial<Project>) {
  try {
    const docRef = doc(db, 'projects', projectId);
    await updateDoc(docRef, updates);
  } catch (error) {
    throw new Error('Erro ao atualizar projeto');
  }
}