
import React, { useState, useEffect } from 'react';
import { Blueprint, Contract, View, ContractStatus } from './types';
import { INITIAL_BLUEPRINTS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BlueprintList from './components/BlueprintList';
import BlueprintBuilder from './components/BlueprintBuilder';
import ContractCreator from './components/ContractCreator';
import ContractDetails from './components/ContractDetails';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');

  // Load initial data from localStorage or fallback to defaults
  const [blueprints, setBlueprints] = useState<Blueprint[]>(() => {
    try {
      const saved = localStorage.getItem('contracthub_blueprints');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : (INITIAL_BLUEPRINTS as Blueprint[]);
      }
    } catch (e) {
      console.error("Failed to load blueprints from storage", e);
    }
    return INITIAL_BLUEPRINTS as Blueprint[];
  });

  const [contracts, setContracts] = useState<Contract[]>(() => {
    try {
      const saved = localStorage.getItem('contracthub_contracts');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error("Failed to load contracts from storage", e);
    }
    return [];
  });

  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string | null>(null);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('contracthub_blueprints', JSON.stringify(blueprints));
  }, [blueprints]);

  useEffect(() => {
    localStorage.setItem('contracthub_contracts', JSON.stringify(contracts));
  }, [contracts]);

  // Handlers
  const handleAddBlueprint = (blueprint: Blueprint) => {
    setBlueprints(prev => [blueprint, ...prev]);
    setView('blueprints');
  };

  const handleUpdateBlueprint = (updatedBlueprint: Blueprint) => {
    setBlueprints(prev => prev.map(b => b.id === updatedBlueprint.id ? updatedBlueprint : b));
    setView('blueprints');
  };

  const handleDeleteBlueprint = (id: string) => {
    // Delete blueprint from state
    setBlueprints(prev => prev.filter(b => b.id !== id));
  };

  const handleAddContract = (contract: Contract) => {
    setContracts(prev => [contract, ...prev]);
    setView('dashboard');
  };

  const handleUpdateContractStatus = (contractId: string, newStatus: ContractStatus) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        return {
          ...c,
          status: newStatus,
          statusHistory: [...c.statusHistory, { status: newStatus, timestamp: new Date().toISOString() }]
        };
      }
      return c;
    }));
  };

  const navigateToContract = (id: string) => {
    setSelectedContractId(id);
    setView('contract-details');
  };

  const navigateToCreateContract = (blueprintId: string) => {
    setSelectedBlueprintId(blueprintId);
    setView('create-contract');
  };

  const navigateToEditBlueprint = (blueprintId: string) => {
    setSelectedBlueprintId(blueprintId);
    setView('edit-blueprint');
  };

  // Render Content
  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard contracts={contracts} blueprints={blueprints} onViewContract={navigateToContract} onCreateClick={() => setView('blueprints')} />;
      case 'blueprints':
        return (
          <BlueprintList 
            blueprints={blueprints} 
            contracts={contracts}
            onCreateBlueprint={() => setView('create-blueprint')} 
            onUseBlueprint={navigateToCreateContract} 
            onEditBlueprint={navigateToEditBlueprint}
            onDeleteBlueprint={handleDeleteBlueprint}
          />
        );
      case 'create-blueprint':
        return <BlueprintBuilder onSave={handleAddBlueprint} onCancel={() => setView('blueprints')} />;
      case 'edit-blueprint':
        const blueprintToEdit = blueprints.find(b => b.id === selectedBlueprintId);
        if (!blueprintToEdit) return <div className="p-8 text-center text-[#5D4037]">Blueprint not found</div>;
        return <BlueprintBuilder initialBlueprint={blueprintToEdit} onSave={handleUpdateBlueprint} onCancel={() => setView('blueprints')} />;
      case 'create-contract':
        const blueprint = blueprints.find(b => b.id === selectedBlueprintId);
        if (!blueprint) return <div className="p-8 text-center text-[#5D4037]">Blueprint not found</div>;
        return <ContractCreator blueprint={blueprint} onSave={handleAddContract} onCancel={() => setView('blueprints')} />;
      case 'contract-details':
        const contract = contracts.find(c => c.id === selectedContractId);
        const contractBlueprint = blueprints.find(b => b.id === contract?.blueprintId);
        if (!contract || !contractBlueprint) return <div className="p-8 text-center text-[#5D4037]">Contract not found</div>;
        return <ContractDetails contract={contract} blueprint={contractBlueprint} onUpdateStatus={handleUpdateContractStatus} onBack={() => setView('dashboard')} />;
      default:
        return <Dashboard contracts={contracts} blueprints={blueprints} onViewContract={navigateToContract} onCreateClick={() => setView('blueprints')} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF9F6]">
      <Sidebar currentView={view} setView={setView} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header view={view} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
