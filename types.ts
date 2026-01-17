
export type FieldType = 'text' | 'date' | 'checkbox' | 'signature';

export interface FieldMetadata {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  order: number;
}

export interface Blueprint {
  id: string;
  name: string;
  description: string;
  fields: FieldMetadata[];
  createdAt: string;
}

export type ContractStatus = 
  | 'Created' 
  | 'Approved' 
  | 'Sent' 
  | 'Signed' 
  | 'Locked' 
  | 'Revoked';

export interface Contract {
  id: string;
  blueprintId: string;
  name: string;
  status: ContractStatus;
  fieldValues: Record<string, any>;
  createdAt: string;
  statusHistory: { status: ContractStatus; timestamp: string }[];
}

export type View = 'dashboard' | 'blueprints' | 'create-blueprint' | 'edit-blueprint' | 'create-contract' | 'contract-details';
