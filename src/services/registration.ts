import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface RegistrationData {
  type: 'ong' | 'empresa';
  name: string;
  cnpj: string;
  email: string;
  password: string;
  areas: string[];
  values: string[];
  description: string;
  experience: number;
  impactGoals: string[];
  sustainability: number;
  digitalPresence: number;
  teamSize: number;
  budget?: number;
}

export async function registerOrganization(data: RegistrationData) {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Prepare data for Firestore
    const organizationData = {
      type: data.type,
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      areas: data.areas,
      values: data.values,
      description: data.description,
      experience: data.experience,
      impactGoals: data.impactGoals,
      sustainability: data.sustainability,
      digitalPresence: data.digitalPresence,
      teamSize: data.teamSize,
      budget: data.budget,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
      userId: userCredential.user.uid
    };

    // Save to Firestore
    await setDoc(doc(db, 'organizations', userCredential.user.uid), organizationData);

    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro no registro: ${error.message}`);
    }
    throw new Error('Erro desconhecido no registro');
  }
}