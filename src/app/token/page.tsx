import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { FiExternalLink, FiShield, FiDollarSign, FiUsers, FiStar, FiAward, FiLock } from 'react-icons/fi';

export const metadata: Metadata = {
  title: '$HIRE Token | SolHire',
  description: 'The official $HIRE token powering the SolHire ecosystem',
};

export default function TokenPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#FF9900]/20 via-[#FF9900]/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">The </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-[#FF9900] to-[#FFC266] text-transparent bg-clip-text [text-shadow:0_0_25px_rgba(255,153,0,0.6)]">
                  $HIRE
                </span>
                {/* Light swipe animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></span>
              </span>
              <span className="text-white"> Token</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Powering the SolHire ecosystem with utility, governance, and rewards
            </p>
          </div>
        </div>
      </section>

      {/* Official Source Warning */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-800/30 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiShield className="mr-2 text-red-500" /> Official Token Source
            </h2>
            <p className="mb-4">
              The $HIRE token will ONLY be deployed from the official PumpFun profile:
            </p>
            <a 
              href="https://pump.fun/profile/GGXrfcU9DWCweJR9UDbhyPzF57aaSy9JSqT1NNDmTLzB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-[#FF9900] hover:text-[#FFAA33] mb-4 font-mono text-sm break-all"
            >
              https://pump.fun/profile/GGXrfcU9DWCweJR9UDbhyPzF57aaSy9JSqT1NNDmTLzB
              <FiExternalLink className="ml-2 flex-shrink-0" />
            </a>
            
            <div className="mb-6 bg-[#FF9900]/10 p-4 rounded-lg border border-[#FF9900]/30">
              <h3 className="text-lg font-bold text-[#FF9900] mb-2">Contract Address Status:</h3>
              <p className="text-white">
                No official contract address has been deployed yet. The official contract address will be announced on our <a href="https://twitter.com/solhire" target="_blank" rel="noopener noreferrer" className="text-[#FF9900] hover:text-[#FFAA33] underline">Twitter</a> first, and then updated here when the token launches.
              </p>
            </div>
            
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
              <p className="text-lg font-bold text-red-400 mb-2">⚠️ IMPORTANT</p>
              <p>
                Any tokens claiming to be $HIRE from any address are NOT official and should be considered fraudulent at this time. 
                Always verify the contract address on this page before interacting with any token.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Utility */}
      <section className="py-12 bg-background-dark">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Token Utility</h2>
          <p className="text-xl text-center mb-12">The $HIRE token powers the SolHire ecosystem by:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background/50 p-6 rounded-xl border border-[#FF9900]/30 hover:border-[#FF9900]/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF9900]/20 flex items-center justify-center mb-4">
                <FiDollarSign className="text-[#FF9900] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reduced Fees</h3>
              <p className="text-gray-300">Reducing platform fees by up to 75% for token holders</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-[#FF9900]/30 hover:border-[#FF9900]/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF9900]/20 flex items-center justify-center mb-4">
                <FiStar className="text-[#FF9900] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Priority Visibility</h3>
              <p className="text-gray-300">Providing priority visibility for freelancers and job postings</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-[#FF9900]/30 hover:border-[#FF9900]/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF9900]/20 flex items-center justify-center mb-4">
                <FiUsers className="text-[#FF9900] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Governance Rights</h3>
              <p className="text-gray-300">Enabling governance voting rights on platform development</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-[#FF9900]/30 hover:border-[#FF9900]/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF9900]/20 flex items-center justify-center mb-4">
                <FiLock className="text-[#FF9900] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reputation Staking</h3>
              <p className="text-gray-300">Securing reputation through staking mechanisms</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-[#FF9900]/30 hover:border-[#FF9900]/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF9900]/20 flex items-center justify-center mb-4">
                <FiAward className="text-[#FF9900] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Rewards</h3>
              <p className="text-gray-300">Distributing rewards to active community members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Holder Benefits */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Holder Benefits</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start mb-6">
              <div className="w-8 h-8 rounded-full bg-[#FF9900]/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FiStar className="text-[#FF9900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Early Access</h3>
                <p className="text-gray-300">Get early access to new platform features before they're released to the general public.</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="w-8 h-8 rounded-full bg-[#FF9900]/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FiUsers className="text-[#FF9900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Exclusive Networking</h3>
                <p className="text-gray-300">Participate in exclusive networking events with top talent and employers in the Web3 space.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-[#FF9900]/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <FiDollarSign className="text-[#FF9900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fee Discounts</h3>
                <p className="text-gray-300">Enjoy significant discounts on platform fees, allowing you to maximize your earnings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#FF9900]/20 via-[#FF9900]/5 to-background">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community to receive the latest updates about the $HIRE token launch and ecosystem developments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://twitter.com/solhire" className="btn btn-outline border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-white px-8 py-3">
              Follow on Twitter
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 