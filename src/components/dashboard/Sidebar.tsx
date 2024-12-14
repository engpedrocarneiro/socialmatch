import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Award, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Editais', path: '/dashboard/editais' },
  { icon: Users, label: 'Parcerias', path: '/dashboard/parcerias' },
  { icon: Award, label: 'Certificados', path: '/dashboard/certificados' },
  { icon: Settings, label: 'Configurações', path: '/dashboard/configuracoes' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Match Social</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <a
              key={index}
              href={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                isActive ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-full p-6">
        <button className="flex items-center text-gray-700 hover:text-red-600">
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </button>
      </div>
    </aside>
  );
}