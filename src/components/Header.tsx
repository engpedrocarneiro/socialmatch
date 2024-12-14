import React from 'react';
import { Link2 } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <Container>
        <nav className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link2 className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Match Social</span>
          </div>
          <div className="flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Recursos</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">Como Funciona</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contato</a>
            <Button>Começar</Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}