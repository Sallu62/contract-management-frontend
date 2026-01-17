
import React, { useState, useEffect } from 'react';
import { FieldMetadata, FieldType, Blueprint } from '../types';
import { FIELD_TYPES } from '../constants';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

interface BlueprintBuilderProps {
  initialBlueprint?: Blueprint;
  onSave: (blueprint: Blueprint) => void;
  onCancel: () => void;
}

const BlueprintBuilder: React.FC<BlueprintBuilderProps> = ({ initialBlueprint, onSave, onCancel }) => {
  const [name, setName] = useState(initialBlueprint?.name || '');
  const [description, setDescription] = useState(initialBlueprint?.description || '');
  const [fields, setFields] = useState<Partial<FieldMetadata>[]>(initialBlueprint?.fields || []);

  const addField = () => {
    const newField: Partial<FieldMetadata> = {
      id: generateId(),
      type: 'text',
      label: '',
      required: true,
      order: fields.length
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FieldMetadata>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (!name || fields.length === 0) {
      alert("Please provide a name and at least one field.");
      return;
    }
    
    const blueprint: Blueprint = {
      id: initialBlueprint?.id || generateId(),
      name,
      description,
      fields: fields as FieldMetadata[],
      createdAt: initialBlueprint?.createdAt || new Date().toISOString()
    };
    
    onSave(blueprint);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white border border-[#D7CCC8] rounded-lg p-6 shadow-sm">
          <h2 className="text-sm font-bold text-[#8D6E63] uppercase tracking-widest mb-4">
            {initialBlueprint ? 'Modify Template' : 'Template Basics'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-[#D7CCC8] rounded focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] outline-none bg-white text-[#3E2723]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sales Contract"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">Description</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-[#D7CCC8] rounded focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] outline-none bg-white text-[#3E2723]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D7CCC8] rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-[#8D6E63] uppercase tracking-widest">Document Fields</h2>
            <button 
              onClick={addField}
              className="text-xs font-bold text-[#6F4E37] hover:bg-[#EFEBE9] px-3 py-1.5 rounded border border-[#D7CCC8] transition-colors"
            >
              + Add New Field
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="p-4 border border-[#D7CCC8] rounded-lg bg-[#FAF9F6] flex flex-col md:flex-row gap-4 items-center shadow-sm">
                <div className="flex-1 w-full">
                  <input 
                    type="text"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-[#D7CCC8] rounded focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] outline-none font-medium text-[#3E2723]"
                    value={field.label}
                    onChange={(e) => updateField(field.id!, { label: e.target.value })}
                    placeholder="Field label..."
                  />
                </div>
                <div className="w-full md:w-40">
                  <select 
                    className="w-full px-2 py-1.5 text-xs bg-white border border-[#D7CCC8] rounded outline-none focus:ring-2 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] text-[#3E2723]"
                    value={field.type}
                    onChange={(e) => updateField(field.id!, { type: e.target.value as FieldType })}
                  >
                    {FIELD_TYPES.map(ft => (
                      <option key={ft.value} value={ft.value}>{ft.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-[#D7CCC8] text-[#6F4E37] focus:ring-[#6F4E37]/20"
                      checked={field.required}
                      onChange={(e) => updateField(field.id!, { required: e.target.checked })}
                    />
                    <span className="text-[10px] font-bold text-[#8D6E63] uppercase ml-2">Req.</span>
                  </label>
                  <button onClick={() => removeField(field.id!)} className="text-[#D7CCC8] hover:text-[#C62828] transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            
            {fields.length === 0 && (
              <div className="py-12 text-center text-[#A1887F] italic text-sm border-2 border-dashed border-[#D7CCC8] rounded">
                No fields added yet. Add one to get started.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-[#F5F2ED] border border-[#D7CCC8] rounded-lg p-5 sticky top-8 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-[#3E2723] border-b border-[#D7CCC8] pb-3">Final Review</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-[#8D6E63]">Total Fields</span>
              <span className="font-bold text-[#3E2723]">{fields.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#8D6E63]">Status</span>
              <span className="text-[#6F4E37] font-bold uppercase tracking-wider">
                {initialBlueprint ? 'Editing' : 'Drafting'}
              </span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <button 
              onClick={handleSave}
              className="w-full bg-[#6F4E37] hover:bg-[#5D4037] text-white py-2 rounded text-sm font-bold shadow-sm transition-all"
            >
              {initialBlueprint ? 'Update Blueprint' : 'Save Blueprint'}
            </button>
            <button 
              onClick={onCancel}
              className="w-full text-[#8D6E63] hover:text-[#3E2723] py-2 rounded text-xs font-bold transition-all"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintBuilder;
