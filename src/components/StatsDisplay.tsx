export function formatStat(value: number, type: 'currency' | 'percentage' | 'number') {
  if (value === 0) {
    return type === 'currency' ? '0 SOL' : '0';
  }
  
  switch (type) {
    case 'currency':
      return `${value.toFixed(2)} SOL`;
    case 'percentage':
      return `${value}%`;
    default:
      return value.toString();
  }
} 