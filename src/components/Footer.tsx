import React from 'react';
import { Link2, Mail, Phone } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Link2 className="h-8 w-8" />
              <span className="text-xl font-bold">Match Social</span>
            </div>
            <p className="mt-4 text-gray-400">
              Conectando ONGs e empresas para impacto social significativo através da tecnologia blockchain.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white">Recursos</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white">Como Funciona</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span className="text-gray-400">contato@matchsocial.com.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button className="mt-2 w-full">
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Match Social. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}