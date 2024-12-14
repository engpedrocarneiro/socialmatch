import React from 'react';
import { Container } from './ui/Container';
import { steps } from '../constants/steps';

export function HowItWorks() {
  return (
    <div id="how-it-works" className="py-20 bg-gray-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
          <p className="mt-4 text-xl text-gray-600">Passos simples para parcerias de sucesso</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                <span className="text-4xl font-bold text-indigo-600">{step.number}</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-indigo-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}