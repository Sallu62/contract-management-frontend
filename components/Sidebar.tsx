
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Contracts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'blueprints', label: 'Blueprints', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  ];

  const isActive = (id: View) => {
    if (currentView === id) return true;
    if (id === 'dashboard' && currentView === 'contract-details') return true;
    if (id === 'blueprints' && (currentView === 'create-blueprint' || currentView === 'create-contract')) return true;
    return false;
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-[#F5F2ED] border-r border-[#D7CCC8]">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex items-center h-16 px-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#6F4E37] rounded flex items-center justify-center mr-3 shadow-sm">
                <span className="text-[#FAF9F6] font-bold text-sm">C</span>
              </div>
              <span className="text-[#3E2723] font-bold text-lg tracking-tight uppercase">ContractHub</span>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`${
                  isActive(item.id)
                    ? 'bg-[#EFEBE9] text-[#5D4037] font-semibold border border-[#D7CCC8]'
                    : 'text-[#8D6E63] hover:bg-[#EFEBE9]/50 hover:text-[#5D4037] font-medium'
                } group flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors w-full`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${isActive(item.id) ? 'text-[#6F4E37]' : 'text-[#A1887F] group-hover:text-[#6F4E37]'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
