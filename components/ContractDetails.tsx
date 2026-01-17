
import React from 'react';
import { Contract, Blueprint, ContractStatus } from '../types';
import { STATUS_FLOW, STATUS_COLORS, canTransitionTo } from '../constants';
import StatusBadge from './StatusBadge';

interface ContractDetailsProps {
  contract: Contract;
  blueprint: Blueprint;
  onUpdateStatus: (id: string, status: ContractStatus) => void;
  onBack: () => void;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ contract, blueprint, onUpdateStatus, onBack }) => {
  const isLocked = contract.status === 'Locked' || contract.status === 'Revoked';
  const availableNextStates = STATUS_FLOW[contract.status];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-[#D7CCC8] pb-4">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-[#A1887F] hover:text-[#3E2723] transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-[#3E2723]">{contract.name}</h2>
        </div>
        <StatusBadge status={contract.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white border border-[#D7CCC8] rounded-lg p-10 relative shadow-sm">
            {contract.status === 'Locked' && (
              <div className="absolute inset-0 bg-[#F5F2ED]/40 flex items-center justify-center z-10 select-none backdrop-blur-[1px]">
                <div className="border-4 border-[#3E2723]/10 text-[#3E2723]/10 text-5xl font-black uppercase tracking-widest px-10 py-4 rounded-xl -rotate-12">
                  LOCKED
                </div>
              </div>
            )}
            {contract.status === 'Revoked' && (
              <div className="absolute inset-0 bg-[#FFEBEE]/10 flex items-center justify-center z-10 select-none backdrop-blur-[1px]">
                <div className="border-4 border-[#C62828]/10 text-[#C62828]/10 text-5xl font-black uppercase tracking-widest px-10 py-4 rounded-xl rotate-12">
                  REVOKED
                </div>
              </div>
            )}

            <div className="max-w-xl mx-auto space-y-12">
              <div className="text-center border-b border-[#F5F2ED] pb-8">
                <h1 className="text-2xl font-serif font-bold text-[#3E2723] tracking-tight mb-2 uppercase">{blueprint.name}</h1>
                <p className="text-[10px] font-mono text-[#A1887F] uppercase tracking-tighter">Document ID: {contract.id.toUpperCase()}</p>
              </div>

              <div className="space-y-10">
                {blueprint.fields.map((field) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-[#FAF9F6] pb-4">
                    <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest pt-1.5">{field.label}</span>
                    <div className="md:col-span-2 min-h-[2rem]">
                      {field.type === 'checkbox' ? (
                        <div className={`text-sm font-bold ${contract.fieldValues[field.id] ? 'text-green-700' : 'text-[#A1887F] italic'}`}>
                          {contract.fieldValues[field.id] ? 'AGREED & ACKNOWLEDGED' : 'INCOMPLETE'}
                        </div>
                      ) : field.type === 'signature' ? (
                        <div className="font-serif italic text-3xl text-[#3E2723] border-b border-[#D7CCC8] pb-1 w-fit min-w-[200px]">
                          {contract.fieldValues[field.id] || '________________'}
                        </div>
                      ) : (
                        <div className="text-sm font-semibold text-[#5D4037]">
                          {contract.fieldValues[field.id] || <span className="text-[#D7CCC8]">NO DATA</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-20 border-t border-[#F5F2ED] flex justify-between text-[10px] text-[#A1887F] font-bold uppercase tracking-widest">
                <span>ContractHub Protocol v1.0</span>
                <span>Filing: {new Date(contract.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#F5F2ED] border border-[#D7CCC8] rounded-lg p-5 shadow-sm">
            <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest mb-4">Contract State</h3>
            {availableNextStates.length > 0 ? (
              <div className="space-y-2">
                {availableNextStates.map(status => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(contract.id, status)}
                    className={`w-full py-2.5 px-4 rounded text-xs font-bold transition-all shadow-sm ${
                      status === 'Revoked' 
                        ? 'text-[#C62828] bg-[#FFEBEE] border border-[#FFCDD2] hover:bg-[#FFCDD2]' 
                        : 'bg-[#6F4E37] text-white hover:bg-[#5D4037]'
                    }`}
                  >
                    {status === 'Revoked' ? 'Revoke Contract' : `Mark as ${status}`}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8D6E63] italic">Lifecycle completed. No further actions possible.</p>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest mb-6">Audit Trail</h3>
            <div className="space-y-8">
              {contract.statusHistory.slice().reverse().map((entry, idx) => (
                <div key={idx} className="relative pl-6">
                  {idx !== contract.statusHistory.length - 1 && (
                    <div className="absolute left-2 top-4 bottom-[-32px] w-px bg-[#D7CCC8]" />
                  )}
                  <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${idx === 0 ? 'bg-[#6F4E37]' : 'bg-[#D7CCC8]'}`} />
                  <p className={`text-xs font-bold ${idx === 0 ? 'text-[#3E2723]' : 'text-[#8D6E63]'}`}>{entry.status}</p>
                  <p className="text-[9px] text-[#A1887F] uppercase tracking-tighter mt-0.5 font-medium">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
