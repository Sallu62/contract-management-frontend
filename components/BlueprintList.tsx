
import React, { useState } from 'react';
import { Blueprint, Contract } from '../types';

interface BlueprintListProps {
  blueprints: Blueprint[];
  contracts: Contract[];
  onCreateBlueprint: () => void;
  onUseBlueprint: (id: string) => void;
  onEditBlueprint: (id: string) => void;
  onDeleteBlueprint: (id: string) => void;
}

const BlueprintList: React.FC<BlueprintListProps> = ({ blueprints, contracts, onCreateBlueprint, onUseBlueprint, onEditBlueprint, onDeleteBlueprint }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteId(null);
  };

  const handleFinalDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteBlueprint(id);
    setConfirmDeleteId(null);
  };

  const hasContracts = (id: string) => contracts.some(c => c.blueprintId === id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#3E2723]">Contract Templates</h2>
          <p className="text-[#8D6E63] text-sm">Define schemas for your legal documents.</p>
        </div>
        <button 
          onClick={onCreateBlueprint}
          className="bg-[#3E2723] hover:bg-[#1B1210] text-[#FAF9F6] px-4 py-2 rounded text-sm font-bold transition-all shadow-sm"
        >
          + Build New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blueprints.map((blueprint) => {
          const isConfirming = confirmDeleteId === blueprint.id;
          const orphanedWarn = hasContracts(blueprint.id);

          return (
            <div key={blueprint.id} className="bg-white rounded-lg border border-[#D7CCC8] flex flex-col hover:border-[#6F4E37] transition-all relative overflow-hidden group">
              {/* Delete Confirmation Overlay */}
              {isConfirming && (
                <div className="absolute inset-0 z-20 bg-[#3E2723] text-[#FAF9F6] p-4 flex flex-col justify-center items-center text-center animate-in fade-in duration-200">
                  <p className="text-sm font-bold mb-2">Delete this template?</p>
                  {orphanedWarn && (
                    <p className="text-[10px] text-red-200 mb-4 px-4 leading-tight">
                      Existing contracts using this template will become orphaned.
                    </p>
                  )}
                  <div className="flex space-x-3">
                    <button 
                      onClick={(e) => handleFinalDelete(e, blueprint.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={handleCancelDelete}
                      className="bg-transparent border border-[#FAF9F6]/30 hover:bg-[#FAF9F6]/10 px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-[#3E2723] truncate pr-4">{blueprint.name}</h3>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEditBlueprint(blueprint.id); }}
                      className="text-[#A1887F] hover:text-[#6F4E37] p-1.5 rounded-full hover:bg-[#FAF9F6] transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M18.364 5.636l-3.536 3.536m0 0l-1.414 1.414M14.828 9.172L9 15H7v-2l5.828-5.828a2 2 0 112.828 2.828z" />
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => handleDeleteClick(e, blueprint.id)}
                      className="text-[#A1887F] hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#8D6E63] line-clamp-2 min-h-[2.5rem]">
                  {blueprint.description || 'No description provided.'}
                </p>
              </div>
              
              <div className="px-6 py-4 bg-[#FAF9F6] border-t border-[#F5F2ED] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#A1887F] uppercase tracking-widest">
                  {blueprint.fields.length} Fields
                </span>
                <button 
                  onClick={() => onUseBlueprint(blueprint.id)}
                  className="text-xs font-bold text-[#6F4E37] hover:text-[#3E2723] underline decoration-dotted"
                >
                  Create Contract
                </button>
              </div>
            </div>
          );
        })}
        
        {blueprints.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-[#D7CCC8] rounded-xl bg-white/50">
            <p className="text-[#A1887F] text-sm italic">No blueprints found.</p>
            <button 
              onClick={onCreateBlueprint}
              className="mt-4 text-[#6F4E37] font-bold text-xs uppercase tracking-widest hover:text-[#3E2723]"
            >
              + Build the first one
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueprintList;
