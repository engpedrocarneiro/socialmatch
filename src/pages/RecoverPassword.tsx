import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';

export function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Email de recuperação enviado. Verifique sua caixa de entrada.');
    } catch (error) {
      setError('Erro ao enviar email de recuperação. Verifique o endereço informado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Container className="max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Link2 className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Recuperar Senha</h2>
          <p className="mt-2 text-gray-600">
            Digite seu email para receber instruções de recuperação
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                {message}
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Email de Recuperação'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Lembrou sua senha?{' '}
              <a href="/login" className="text-indigo-600 hover:text-indigo-500">
                Voltar para o login
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}