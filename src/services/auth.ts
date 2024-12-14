import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export async function signIn(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw new Error('Falha ao fazer login. Verifique suas credenciais.');
  }
}

export async function signUp(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw new Error('Falha ao criar conta. Tente novamente.');
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error('Erro ao sair da conta.');
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}