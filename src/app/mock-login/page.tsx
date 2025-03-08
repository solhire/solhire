'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/context/MockAuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function MockLogin() {
  const [email, setEmail] = useState('demo@solhire.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useMockAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Use demo@solhire.com / demo123');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen pt-24 pb-12">
        <div className="container-custom max-w-md">
          <div className="card p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Demo Login</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-500">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 input"
                    placeholder="demo@solhire.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 input"
                    placeholder="demo123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              <div className="text-center text-sm text-gray-400 mt-4">
                Use demo credentials:<br />
                Email: demo@solhire.com<br />
                Password: demo123
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 