import React from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  em_andamento: 'bg-blue-100 text-blue-800',
  concluido: 'bg-green-100 text-green-800',
  pendente: 'bg-yellow-100 text-yellow-800',
};

const statusLabels = {
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
  pendente: 'Pendente',
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
          {statusLabels[project.status]}
        </span>
      </div>
      <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(project.startDate).toLocaleDateString('pt-BR')}
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {project.partners.length} parceiros
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          {project.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      </div>
    </div>
  );
}