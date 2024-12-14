import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Container className="max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cadastro Realizado com Sucesso!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Enviamos um email de confirmação para seu endereço.
            Por favor, verifique sua caixa de entrada e siga as instruções
            para ativar sua conta.
          </p>

          <Button
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Ir para Login
          </Button>
        </div>
      </Container>
    </div>
  );
}