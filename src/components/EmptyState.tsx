import { IconType } from 'react-icons';
import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ 
  icon: Icon = FiInbox,
  title, 
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Icon className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
} 