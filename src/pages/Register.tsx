import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { registerOrganization } from '../services/registration';

interface FormData {
  type: 'ong' | 'empresa';
  name: string;
  cnpj: string;
  email: string;
  password: string;
  confirmPassword: string;
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

const availableAreas = [
  'Educação', 'Saúde', 'Meio Ambiente', 'Tecnologia',
  'Cultura', 'Esporte', 'Direitos Humanos', 'Assistência Social'
];

const availableValues = [
  'Inovação', 'Sustentabilidade', 'Inclusão Social', 'Transparência',
  'Diversidade', 'Educação', 'Tecnologia', 'Impacto Social'
];

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    type: 'ong',
    name: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: '',
    areas: [],
    values: [],
    description: '',
    experience: 0,
    impactGoals: [],
    sustainability: 0,
    digitalPresence: 0,
    teamSize: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      await registerOrganization(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container className="max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-gray-600">Junte-se à nossa rede de impacto social</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'ong' })}
                className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                  formData.type === 'ong'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <Users className="h-8 w-8 mb-2 text-indigo-600" />
                <span className="font-medium">ONG</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'empresa' })}
                className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                  formData.type === 'empresa'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <Building2 className="h-8 w-8 mb-2 text-indigo-600" />
                <span className="font-medium">Empresa</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                  CNPJ
                </label>
                <input
                  type="text"
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Áreas de Atuação
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableAreas.map((area) => (
                  <label
                    key={area}
                    className="flex items-center space-x-2 p-2 rounded border cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.areas.includes(area)}
                      onChange={(e) => {
                        const newAreas = e.target.checked
                          ? [...formData.areas, area]
                          : formData.areas.filter((a) => a !== area);
                        setFormData({ ...formData, areas: newAreas });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valores
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableValues.map((value) => (
                  <label
                    key={value}
                    className="flex items-center space-x-2 p-2 rounded border cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.values.includes(value)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...formData.values, value]
                          : formData.values.filter((v) => v !== value);
                        setFormData({ ...formData, values: newValues });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <a href="/login" className="text-indigo-600 hover:text-indigo-500">
                Faça login
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}