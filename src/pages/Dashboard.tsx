import React from 'react';
import { Users, FileText, Award, TrendingUp } from 'lucide-react';
import { DashboardHeader } from '../components/dashboard/Header';
import { Sidebar } from '../components/dashboard/Sidebar';
import { StatCard } from '../components/dashboard/StatCard';
import { ProjectCard } from '../components/dashboard/ProjectCard';

const mockProjects = [
  {
    id: '1',
    title: 'Educação Digital nas Escolas',
    description: 'Projeto de implementação de laboratórios de informática em escolas públicas.',
    status: 'em_andamento',
    budget: 150000,
    startDate: new Date('2024-01-15'),
    partners: ['Empresa A', 'Empresa B'],
  },
  {
    id: '2',
    title: 'Horta Comunitária Sustentável',
    description: 'Desenvolvimento de hortas comunitárias em áreas urbanas.',
    status: 'pendente',
    budget: 75000,
    startDate: new Date('2024-03-01'),
    partners: ['Empresa C'],
  },
] as const;

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Parcerias Ativas"
              value={12}
              icon={Users}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Editais Disponíveis"
              value={24}
              icon={FileText}
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Certificados"
              value={8}
              icon={Award}
            />
            <StatCard
              title="Impacto Social"
              value="R$ 450K"
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">Projetos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}