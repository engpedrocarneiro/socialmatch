import React from 'react';
import { Bell, Search } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Perfil"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">João Silva</span>
          </div>
        </div>
      </div>
    </header>
  );
}