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
      <section className="relative py-20 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">The </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-purple-500 to-blue-600 text-transparent bg-clip-text [text-shadow:0_0_25px_rgba(124,58,237,0.6)]">
                  $HIRE
                </span>
                {/* Light swipe animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></span>
              </span>
              <span className="text-white"> Token</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Powering the SolHire ecosystem with utility and governance features
            </p>
          </div>
        </div>
      </section>

      {/* Official Source Warning */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-800/30 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiShield className="mr-2 text-red-500" /> Official Token Status
            </h2>
            
            <div className="mb-6 bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <h3 className="text-lg font-bold text-blue-500 mb-2">Token Status:</h3>
              <div className="text-md text-gray-300">
                <p className="mb-4">We are carefully designing the token mechanics to ensure it provides real utility to the platform. Updates on the token launch will be shared on our <a href="https://twitter.com/solhire" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-blue-500 underline">Twitter</a> first, and then updated here.</p>
                <p className="mb-0">Please be vigilant about scams. The official token will only be announced through our official channels.</p>
              </div>
            </div>
            
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
              <p className="text-lg font-bold text-red-400 mb-2">⚠️ WARNING</p>
              <p>
                Any tokens currently claiming to be $HIRE are NOT official and should be considered fraudulent. 
                Do not interact with any tokens claiming to be $HIRE at this time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Source Warning */}
      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto bg-background/50 p-6 rounded-xl border border-purple-500/30 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FiShield className="text-purple-500 text-xl" />
            <h2 className="text-xl font-bold text-white">Official Token Deployment</h2>
          </div>
          <p className="text-gray-300 mb-4">
            The official $HIRE token will be deployed from our verified Pump.fun profile:
          </p>
          <a 
            href="https://pump.fun/profile/solhire1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>@solhire1</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
          <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-sm text-purple-300">
              ⚠️ Always verify the token address and ensure you're interacting with our official contract. 
              The only official deployment will be from our verified Pump.fun profile.
            </p>
          </div>
        </div>
      </div>

      {/* Token Utility */}
      <section className="py-12 bg-background-dark">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Token Utility</h2>
          <p className="text-xl text-center mb-12">The $HIRE token powers the SolHire ecosystem by:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-background/50 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FiDollarSign className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fee Reduction</h3>
              <p className="text-gray-300">Reducing platform fees for active platform participants</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FiStar className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Features</h3>
              <p className="text-gray-300">Unlocking premium platform features and capabilities</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FiUsers className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Governance</h3>
              <p className="text-gray-300">Enabling participation in platform governance decisions</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FiLock className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-gray-300">Enhancing platform security through decentralization</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <FiAward className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
              <p className="text-gray-300">Promoting active participation in the SolHire ecosystem</p>
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

      {/* How It Works Section */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start mb-8">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FiStar className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Platform Integration</h3>
                  <p className="text-gray-300">The $HIRE token is deeply integrated into the SolHire platform, enabling access to enhanced features and providing utility across various aspects of the marketplace.</p>
                </div>
              </div>
              
              <div className="flex items-start mb-8">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FiUsers className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Governance</h3>
                  <p className="text-gray-300">The token enables a community-driven approach to platform development, allowing participants to have a voice in key decisions about features and policies.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FiDollarSign className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Sustainable Economics</h3>
                  <p className="text-gray-300">Our token model is designed with sustainable economics in mind, focusing on long-term utility and growth rather than short-term speculation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community to receive the latest updates about the $HIRE token launch and ecosystem developments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="https://twitter.com/solhire" className="btn btn-outline border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-3">
                Follow on Twitter
              </Link>
              <Link href="https://discord.gg/solhire" className="btn btn-primary px-8 py-3">
                Join our Discord
              </Link>
            </div>
            
            <p className="text-sm text-gray-400">
              We'll never share your information with third parties.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 