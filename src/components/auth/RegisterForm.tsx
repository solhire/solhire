'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { checkPasswordStrength } from '@/lib/password';

const RegisterForm = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'client', // 'client' or 'creator'
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 2) {
      newErrors.password = 'Password is too weak';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          displayName: formData.name,
          accountType: formData.accountType,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      // Show success message
      toast.success('Registration successful! Please check your email to verify your account.');
      
      // Redirect to login page
      router.push('/login?message=Registration successful! Please check your email to verify your account.');
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to register. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      {errors.general && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center text-red-500">
          <FiAlertCircle className="mr-2 flex-shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className={`input pl-10 w-full ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`input pl-10 w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className={`input pl-10 w-full ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="••••••••"
            />
          </div>
          {formData.password && (
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getPasswordStrengthColor()}`} 
                  style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">{passwordStrength.feedback}</p>
            </div>
          )}
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input pl-10 w-full ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <label htmlFor="accountType" className="block text-sm font-medium text-gray-300 mb-1">
            I want to
          </label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="client">Hire Creatives</option>
            <option value="creator">Offer My Services</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 