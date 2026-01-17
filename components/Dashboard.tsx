
import React, { useState, useMemo } from 'react';
import { Contract, Blueprint, ContractStatus } from '../types';
import StatusBadge from './StatusBadge';

interface DashboardProps {
  contracts: Contract[];
  blueprints: Blueprint[];
  onViewContract: (id: string) => void;
  onCreateClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ contracts, blueprints, onViewContract, onCreateClick }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'signed'>('all');
  const [search, setSearch] = useState('');

  const filteredContracts = useMemo(() => {
    return contracts.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      if (filter === 'all') return matchesSearch;
      if (filter === 'active') return matchesSearch && !['Locked', 'Revoked', 'Signed'].includes(c.status);
      if (filter === 'signed') return matchesSearch && (c.status === 'Signed' || c.status === 'Locked');
      return matchesSearch;
    });
  }, [contracts, filter, search]);

  const getBlueprintName = (id: string) => blueprints.find(b => b.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setFilter('all')}
            className={`text-sm font-bold pb-1.5 border-b-2 transition-all ${filter === 'all' ? 'border-[#6F4E37] text-[#3E2723]' : 'border-transparent text-[#A1887F] hover:text-[#3E2723]'}`}
          >
            All Contracts
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`text-sm font-bold pb-1.5 border-b-2 transition-all ${filter === 'active' ? 'border-[#6F4E37] text-[#3E2723]' : 'border-transparent text-[#A1887F] hover:text-[#3E2723]'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('signed')}
            className={`text-sm font-bold pb-1.5 border-b-2 transition-all ${filter === 'signed' ? 'border-[#6F4E37] text-[#3E2723]' : 'border-transparent text-[#A1887F] hover:text-[#3E2723]'}`}
          >
            Completed
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1887F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..."
              className="pl-9 pr-4 py-2 text-sm border border-[#D7CCC8] rounded focus:ring-2 focus:ring-[#6F4E37]/20 focus:border-[#6F4E37] outline-none w-full sm:w-48 bg-white text-[#3E2723]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={onCreateClick}
            className="bg-[#6F4E37] hover:bg-[#5D4037] text-white px-4 py-2 rounded text-sm font-bold transition-all shadow-sm"
          >
            New Contract
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#D7CCC8] rounded-lg overflow-hidden shadow-sm">
        {filteredContracts.length > 0 ? (
          <table className="min-w-full divide-y divide-[#D7CCC8]/30">
            <thead className="bg-[#F5F2ED]">
              <tr>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Name</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Blueprint</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-left text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Created</th>
                <th className="px-6 py-3 text-right text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#D7CCC8]/10">
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#3E2723]">{contract.name}</div>
                    <div className="text-[10px] text-[#A1887F] font-mono tracking-tighter uppercase">{contract.id.slice(0, 8)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D4037]">
                    {getBlueprintName(contract.blueprintId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={contract.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-[#8D6E63]">
                    {new Date(contract.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onViewContract(contract.id)}
                      className="text-[#6F4E37] hover:text-[#3E2723] font-bold"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[#A1887F] text-sm italic">No records found matching criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
