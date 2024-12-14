import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Button } from './ui/Button';

interface RegisterButtonProps {
  formData: {
    type: 'ong' | 'empresa';
    name: string;
    cnpj: string;
    email: string;
    areas: string[];
    values: string[];
    description: string;
    experience: number;
    impactGoals: string[];
    sustainability: number;
    digitalPresence: number;
    teamSize: number;
    budget?: number;
  };
}

export function RegisterButton({ formData }: RegisterButtonProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new Error('Nome é obrigatório');
    }
    if (!formData.email.trim()) {
      throw new Error('Email é obrigatório');
    }
    if (!formData.cnpj.trim()) {
      throw new Error('CNPJ é obrigatório');
    }
    if (formData.areas.length === 0) {
      throw new Error('Selecione pelo menos uma área de atuação');
    }
    if (formData.values.length === 0) {
      throw new Error('Selecione pelo menos um valor');
    }
    if (!formData.description.trim()) {
      throw new Error('Descrição é obrigatória');
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      // Validar formulário
      validateForm();

      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        'senha-temporaria' // Será alterada no primeiro acesso
      );

      // Salvar dados no Firestore
      await setDoc(doc(db, 'organizations', userCredential.user.uid), {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'pending',
        userId: userCredential.user.uid
      });

      // Enviar email de verificação
      await userCredential.user.sendEmailVerification();

      // Feedback de sucesso
      navigate('/registration-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Button
        onClick={handleRegister}
        disabled={loading}
        className="w-full py-3"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Cadastrando...
          </div>
        ) : (
          'Cadastrar'
        )}
      </Button>
    </div>
  );
}