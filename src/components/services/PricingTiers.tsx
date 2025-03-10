'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheck, FiX, FiArrowRight, FiInfo } from 'react-icons/fi';

interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  deliveryDays: number;
  revisions: number;
  color?: string;
}

interface PricingTiersProps {
  serviceName: string;
  creatorId: string;
  tiers: PricingTier[];
  hireTokenDiscount?: number;
}

const colorClasses = {
  blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 hover:border-blue-500/50',
  green: 'from-green-500/20 to-green-600/5 border-green-500/30 hover:border-green-500/50',
  purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 hover:border-purple-500/50',
  primary: 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50',
};

const PricingTiers = ({ serviceName, creatorId, tiers, hireTokenDiscount = 5 }: PricingTiersProps) => {
  const [selectedTier, setSelectedTier] = useState<number>(
    tiers.findIndex(tier => tier.popular) !== -1 ? tiers.findIndex(tier => tier.popular) : 0
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => {
          const colorClass = tier.color ? colorClasses[tier.color as keyof typeof colorClasses] : colorClasses.primary;
          
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-2xl border bg-gradient-to-b ${colorClass} p-6 transition-all ${
                selectedTier === index ? 'scale-105 shadow-xl z-10' : 'scale-100 hover:scale-[1.02]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2 pt-2">{tier.name}</h3>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold">{tier.price}</span>
                  <span className="ml-1 text-sm text-gray-400">SOL</span>
                </div>
                {hireTokenDiscount > 0 && (
                  <div className="text-xs text-blue-400 mt-1 flex items-center">
                    <span>-{hireTokenDiscount}% with platform tokens</span>
                    <button className="ml-1 text-gray-400 hover:text-white transition-colors">
                      <FiInfo className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-400 mb-6 h-12">{tier.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center text-sm mb-2">
                  <span className="mr-2">⏱️</span>
                  <span className="text-gray-300">Delivered within {tier.deliveryDays} days</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">🔄</span>
                  <span className="text-gray-300">{tier.revisions} revisions included</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex text-sm">
                    {feature.included ? (
                      <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <FiX className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.name}
                      {feature.tooltip && (
                        <button className="ml-1 text-gray-500 hover:text-gray-400">
                          <FiInfo className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                {selectedTier === index ? (
                  <Link
                    href={`/order/${creatorId}?service=${encodeURIComponent(serviceName)}&tier=${index + 1}`}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    <span>Continue</span>
                    <FiArrowRight className="ml-2" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setSelectedTier(index)}
                    className="btn btn-outline w-full"
                  >
                    Select
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-background-dark rounded-xl border border-gray-800">
        <h4 className="font-medium mb-2 flex items-center">
          <span className="bg-primary/20 text-primary p-1 rounded mr-2">
            <FiInfo className="w-4 h-4" />
          </span>
          Secure Payment with Solana
        </h4>
        <p className="text-sm text-gray-400">
          All payments are securely processed through Solana blockchain smart contracts. Your payment is held in escrow until the work is completed and you're satisfied with the delivery.
        </p>
      </div>
    </div>
  );
};

export default PricingTiers; 