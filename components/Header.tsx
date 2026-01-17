
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  view: View;
}

const Header: React.FC<HeaderProps> = ({ view }) => {
  const getTitle = () => {
    switch (view) {
      case 'dashboard': return 'Contract Dashboard';
      case 'blueprints': return 'Contract Blueprints';
      case 'create-blueprint': return 'Build New Blueprint';
      case 'create-contract': return 'Draft New Contract';
      case 'contract-details': return 'Review Contract';
      default: return 'ContractHub';
    }
  };

  return (
    <header className="bg-[#FAF9F6] border-b border-[#D7CCC8] h-16 flex items-center px-6 shrink-0">
      <h1 className="text-lg font-bold text-[#3E2723] uppercase tracking-wide">{getTitle()}</h1>
    </header>
  );
};

export default Header;
