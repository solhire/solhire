'use client';

import { useState } from 'react';
import { FiCheck, FiClock, FiRefreshCw, FiStar } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PackageFeature {
  included: boolean;
  text: string;
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  deliveryTime: number;
  revisions: number;
  features: PackageFeature[];
  popular?: boolean;
}

interface ServicePackagesProps {
  packages: Package[];
  onSelectPackage: (packageId: string) => void;
}

export default function ServicePackages({ packages, onSelectPackage }: ServicePackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]?.id || '');

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    onSelectPackage(packageId);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-6">Choose a Package</h3>
      
      {/* Mobile View - Tabs */}
      <div className="md:hidden">
        <Tabs defaultValue={packages[0]?.id} onValueChange={handlePackageSelect}>
          <TabsList className="grid grid-cols-3 mb-6">
            {packages.map((pkg) => (
              <TabsTrigger 
                key={pkg.id} 
                value={pkg.id}
                className="relative"
              >
                {pkg.name}
                {pkg.popular && (
                  <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {packages.map((pkg) => (
            <TabsContent key={pkg.id} value={pkg.id} className="border border-zinc-800 rounded-xl p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold">{pkg.name}</h4>
                  <span className="text-xl font-bold">{pkg.price} {pkg.currency}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                  <div className="flex items-center">
                    <FiClock className="mr-1 text-primary" />
                    {pkg.deliveryTime} day{pkg.deliveryTime > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <FiRefreshCw className="mr-1 text-primary" />
                    {pkg.revisions} revision{pkg.revisions > 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`mt-1 mr-3 ${feature.included ? 'text-primary' : 'text-gray-500'}`}>
                        {feature.included ? <FiCheck className="w-4 h-4" /> : <span className="text-xs">✕</span>}
                      </div>
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => onSelectPackage(pkg.id)}
                >
                  Continue ({pkg.price} {pkg.currency})
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Desktop View - Side by Side */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className={`relative border rounded-xl p-6 transition-all ${
              selectedPackage === pkg.id 
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                : 'border-zinc-800 bg-background-dark hover:border-primary/50'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-xs px-3 py-1 rounded-full flex items-center">
                  <FiStar className="mr-1 w-3 h-3" /> Popular
                </span>
              </div>
            )}
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">{pkg.name}</h4>
              <p className="text-gray-400 text-sm h-12">{pkg.description}</p>
            </div>
            
            <div className="mb-4">
              <span className="text-2xl font-bold">{pkg.price} {pkg.currency}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center">
                <FiClock className="mr-1 text-primary" />
                {pkg.deliveryTime} day{pkg.deliveryTime > 1 ? 's' : ''}
              </div>
              <div className="flex items-center">
                <FiRefreshCw className="mr-1 text-primary" />
                {pkg.revisions} revision{pkg.revisions > 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-3 mb-6 min-h-[200px]">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className={`mt-1 mr-3 ${feature.included ? 'text-primary' : 'text-gray-500'}`}>
                    {feature.included ? <FiCheck className="w-4 h-4" /> : <span className="text-xs">✕</span>}
                  </div>
                  <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            
            <Button 
              className={`w-full ${
                selectedPackage === pkg.id 
                  ? 'bg-primary hover:bg-primary/90 text-white' 
                  : 'bg-background border border-primary/50 text-primary hover:bg-primary/10'
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {selectedPackage === pkg.id ? 'Continue' : 'Select'}
            </Button>
          </div>
        ))}
      </div>
      
      {/* Compare Packages Button */}
      <div className="mt-6 text-center">
        <button className="text-primary hover:text-primary/80 text-sm font-medium underline">
          Compare package features
        </button>
      </div>
    </div>
  );
}

// Example usage:
export function ServicePackagesExample() {
  const examplePackages = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Simple video editing with basic transitions and color correction',
      price: 50,
      currency: 'SOL',
      deliveryTime: 2,
      revisions: 1,
      features: [
        { included: true, text: 'Basic video editing' },
        { included: true, text: 'Color correction' },
        { included: true, text: 'Simple transitions' },
        { included: false, text: 'Sound effects' },
        { included: false, text: 'Motion graphics' },
        { included: false, text: 'Premium transitions' },
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Professional editing with advanced transitions and sound effects',
      price: 100,
      currency: 'SOL',
      deliveryTime: 3,
      revisions: 2,
      popular: true,
      features: [
        { included: true, text: 'Professional video editing' },
        { included: true, text: 'Advanced color grading' },
        { included: true, text: 'Premium transitions' },
        { included: true, text: 'Sound effects' },
        { included: false, text: 'Motion graphics' },
        { included: false, text: 'Custom intro/outro' },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Complete package with motion graphics and custom intro/outro',
      price: 200,
      currency: 'SOL',
      deliveryTime: 5,
      revisions: 5,
      features: [
        { included: true, text: 'Professional video editing' },
        { included: true, text: 'Advanced color grading' },
        { included: true, text: 'Premium transitions' },
        { included: true, text: 'Sound effects' },
        { included: true, text: 'Motion graphics' },
        { included: true, text: 'Custom intro/outro' },
      ],
    },
  ];

  const handleSelectPackage = (packageId: string) => {
    console.log(`Selected package: ${packageId}`);
  };

  return <ServicePackages packages={examplePackages} onSelectPackage={handleSelectPackage} />;
} 