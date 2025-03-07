import { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register | SolHire',
  description: 'Create a new account on SolHire to hire creative professionals or offer your services.',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-white">Sol<span className="text-primary">Hire</span></span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary-light">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="mt-8">
          <div className="card border-primary/30">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
} 