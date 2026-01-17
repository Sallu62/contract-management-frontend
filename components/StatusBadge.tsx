
import React from 'react';
import { ContractStatus } from '../types';
import { STATUS_COLORS } from '../constants';

interface StatusBadgeProps {
  status: ContractStatus;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const colorClass = STATUS_COLORS[status];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  
  const getDotColor = () => {
    switch(status) {
      case 'Revoked': return 'bg-red-400';
      case 'Locked': return 'bg-stone-400';
      case 'Signed': return 'bg-green-500';
      case 'Sent': return 'bg-orange-400';
      case 'Approved': return 'bg-purple-400';
      case 'Created': return 'bg-amber-600';
      default: return 'bg-current';
    }
  };

  return (
    <span className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full border ${colorClass} ${sizeClass} shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getDotColor()}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
