import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Conectando ONGs e Empresas
            <span className="text-indigo-600"> através do Blockchain</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Utilize IA e tecnologia blockchain para criar parcerias significativas entre ONGs e empresas,
            simplificando candidaturas a editais e garantindo transparência na prestação de contas.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button className="px-8 py-3 flex items-center gap-2">
              Começar Agora <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="secondary" className="px-8 py-3">
              Saiba Mais
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}