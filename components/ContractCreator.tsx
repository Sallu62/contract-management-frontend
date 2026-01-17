
import React, { useState } from 'react';
import { Blueprint, Contract, ContractStatus } from '../types';

interface ContractCreatorProps {
  blueprint: Blueprint;
  onSave: (contract: Contract) => void;
  onCancel: () => void;
}

const ContractCreator: React.FC<ContractCreatorProps> = ({ blueprint, onSave, onCancel }) => {
  const [name, setName] = useState(`${blueprint.name} - ${new Date().toLocaleDateString()}`);
  const [values, setValues] = useState<Record<string, any>>({});

  const handleValueChange = (fieldId: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSave = () => {
    if (!name) {
      alert("Please provide a contract name.");
      return;
    }

    const missingFields = blueprint.fields.filter(f => f.required && !values[f.id]);
    if (missingFields.length > 0) {
      alert(`Required: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    const contract: Contract = {
      id: crypto.randomUUID(),
      blueprintId: blueprint.id,
      name,
      status: 'Created',
      fieldValues: values,
      createdAt: new Date().toISOString(),
      statusHistory: [{ status: 'Created', timestamp: new Date().toISOString() }]
    };

    onSave(contract);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-[#D7CCC8] rounded-lg overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-[#D7CCC8] bg-[#F5F2ED]">
          <span className="text-[10px] font-bold text-[#6F4E37] uppercase tracking-widest">{blueprint.name} Template</span>
          <h2 className="text-xl font-bold text-[#3E2723]">New Contract Draft</h2>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <label className="block text-xs font-bold text-[#8D6E63] uppercase mb-1.5">Filing Name</label>
            <input 
              type="text"
              className="w-full px-4 py-2 border border-[#D7CCC8] rounded focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] outline-none text-sm bg-white text-[#3E2723]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-[#A1887F] uppercase tracking-widest border-b border-[#F5F2ED] pb-2">Document Data</h3>
            {blueprint.fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#5D4037]">
                  {field.label} {field.required && <span className="text-[#C62828] font-bold">*</span>}
                </label>
                
                {field.type === 'text' && (
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-[#D7CCC8] rounded outline-none text-sm focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] bg-white text-[#3E2723]"
                    value={values[field.id] || ''}
                    onChange={(e) => handleValueChange(field.id, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                  />
                )}

                {field.type === 'date' && (
                  <input 
                    type="date"
                    className="w-full px-3 py-2 border border-[#D7CCC8] rounded outline-none text-sm focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] bg-white text-[#3E2723]"
                    value={values[field.id] || ''}
                    onChange={(e) => handleValueChange(field.id, e.target.value)}
                  />
                )}

                {field.type === 'checkbox' && (
                  <label className="flex items-center space-x-3 py-1 cursor-pointer group">
                    <input 
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#D7CCC8] text-[#6F4E37] focus:ring-[#6F4E37]/10"
                      checked={!!values[field.id]}
                      onChange={(e) => handleValueChange(field.id, e.target.checked)}
                    />
                    <span className="text-sm text-[#8D6E63] group-hover:text-[#3E2723] transition-colors font-medium">I acknowledge and agree</span>
                  </label>
                )}

                {field.type === 'signature' && (
                  <div className="relative">
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border-b-2 border-[#D7CCC8] border-x-0 border-t-0 rounded-none italic font-serif text-lg focus:border-[#6F4E37] focus:ring-0 outline-none bg-white text-[#3E2723]"
                      placeholder="Type your full name to sign..."
                      value={values[field.id] || ''}
                      onChange={(e) => handleValueChange(field.id, e.target.value)}
                    />
                    <div className="absolute right-0 bottom-0 text-[10px] text-[#A1887F] italic uppercase">Digital Auth</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-4 bg-[#F5F2ED]/50 flex justify-end items-center space-x-4 border-t border-[#D7CCC8]">
          <button onClick={onCancel} className="text-xs font-bold text-[#A1887F] hover:text-[#5D4037] transition-colors uppercase tracking-wider">Cancel</button>
          <button onClick={handleSave} className="bg-[#6F4E37] text-white px-8 py-2 rounded text-xs font-bold hover:bg-[#5D4037] shadow-sm transition-all uppercase tracking-widest">Create Contract</button>
        </div>
      </div>
    </div>
  );
};

export default ContractCreator;
