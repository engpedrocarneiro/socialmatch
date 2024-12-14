import React from 'react';
import { Container } from './ui/Container';
import { features } from '../constants/features';

export function Features() {
  return (
    <div id="features" className="py-20 bg-white">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Recursos da Plataforma</h2>
          <p className="mt-4 text-xl text-gray-600">Tudo que você precisa para criar parcerias de sucesso</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition">
              <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}