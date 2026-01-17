
import { ContractStatus, FieldType } from './types';

export const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text Input' },
  { value: 'date', label: 'Date Picker' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'signature', label: 'Signature Line' },
];

export const STATUS_FLOW: Record<ContractStatus, ContractStatus[]> = {
  'Created': ['Approved', 'Revoked'],
  'Approved': ['Sent'],
  'Sent': ['Signed', 'Revoked'],
  'Signed': ['Locked'],
  'Locked': [],
  'Revoked': [],
};

export const STATUS_COLORS: Record<ContractStatus, string> = {
  'Created': 'bg-[#EFEBE9] text-[#5D4037] border-[#D7CCC8]',
  'Approved': 'bg-[#F3E5F5] text-[#7B1FA2] border-[#E1BEE7]',
  'Sent': 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]',
  'Signed': 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
  'Locked': 'bg-[#FAFAFA] text-[#616161] border-[#F5F5F5]',
  'Revoked': 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]',
};

export function canTransitionTo(current: ContractStatus, target: ContractStatus): boolean {
  return STATUS_FLOW[current].includes(target);
}

export const INITIAL_BLUEPRINTS = [
  {
    id: 'b1',
    name: 'Employment Agreement',
    description: 'Standard full-time employment contract for new hires.',
    createdAt: new Date().toISOString(),
    fields: [
      { id: 'f1', type: 'text', label: 'Employee Full Name', required: true, order: 0 },
      { id: 'f2', type: 'date', label: 'Start Date', required: true, order: 1 },
      { id: 'f3', type: 'text', label: 'Job Title', required: true, order: 2 },
      { id: 'f4', type: 'checkbox', label: 'Agree to NDA', required: true, order: 3 },
      { id: 'f5', type: 'signature', label: 'Employee Signature', required: true, order: 4 },
    ]
  },
  {
    id: 'b2',
    name: 'Software License',
    description: 'B2B software licensing terms.',
    createdAt: new Date().toISOString(),
    fields: [
      { id: 'f1', type: 'text', label: 'Client Organization', required: true, order: 0 },
      { id: 'f2', type: 'text', label: 'License Key', required: true, order: 1 },
      { id: 'f3', type: 'date', label: 'Expiration Date', required: true, order: 2 },
      { id: 'f4', type: 'signature', label: 'Authorized Signatory', required: true, order: 3 },
    ]
  }
];
