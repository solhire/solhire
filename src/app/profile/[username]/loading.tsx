import { FiLoader } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';

export default function ProfileLoading() {
  return (
    <MainLayout>
      <div className="container-custom pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <FiLoader className="w-8 h-8 text-primary animate-spin" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    </MainLayout>
  );
} 