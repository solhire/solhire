import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { FiZap, FiGlobe, FiShield, FiCpu } from 'react-icons/fi';

export default function About() {
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to improve how creative professionals and clients connect and collaborate.',
    },
    {
      title: 'Transparency',
      description: 'We believe in clear, honest communication. Our review system and escrow mechanisms are designed to create trust between all parties.',
    },
    {
      title: 'Inclusivity',
      description: "We're building a global platform that welcomes creative talent from all backgrounds, locations, and experience levels.",
    },
    {
      title: 'Quality',
      description: "We're committed to maintaining a high-quality marketplace through careful curation and verification processes.",
    },
    {
      title: 'Creator Empowerment',
      description: 'We believe in fair compensation for creative work and have designed our platform to maximize opportunities for the talented individuals who use it.',
    },
  ];

  const solanaFeatures = [
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Speed',
      description: 'Transactions complete in seconds, not days',
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: 'Scalability',
      description: 'The network can handle thousands of transactions per second',
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Energy efficiency',
      description: 'Solana uses a fraction of the energy compared to other blockchains',
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: 'Developer-friendly',
      description: 'Enables us to build powerful smart contracts for secure escrow and payment systems',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background-light">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SolHire</h1>
          
          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-lg text-gray-300">
              At SolHire, we're bridging the gap between creative talent and clients through innovative blockchain technology. 
              Our mission is to create a global marketplace where video editors, graphic designers, developers, and other creative 
              professionals can connect with clients seamlessly, while enjoying the benefits of secure, instant payments through 
              the Solana blockchain.
            </p>
          </div>

          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">What We Do</h2>
            <p className="text-lg text-gray-300">
              SolHire provides a platform where creative professionals can showcase their portfolios, connect with potential clients, 
              and receive payments quickly and securely. For clients, we offer access to a diverse pool of talented creatives, 
              streamlined hiring processes, and the ability to make instant payments through Solana.
            </p>
          </div>

          {/* Why Solana */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Why Solana?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solanaFeatures.map((feature, index) => (
                <div key={index} className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The SolHire Advantage */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">The SolHire Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* For Creatives */}
              <div className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-white">For Creatives</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Receive payments instantly, regardless of location</li>
                  <li>• Build a global client base without currency or banking restrictions</li>
                  <li>• Showcase your portfolio to interested clients</li>
                  <li>• Secure payment protection through smart contract escrow</li>
                </ul>
              </div>

              {/* For Clients */}
              <div className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-white">For Clients</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Access a global pool of talented creative professionals</li>
                  <li>• Streamlined hiring and onboarding process</li>
                  <li>• Secure payment protection through escrow</li>
                  <li>• No international transfer fees or currency conversion costs</li>
                  <li>• Direct communication with your creative team</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Join SolHire */}
          <div className="text-center bg-background-dark p-12 rounded-2xl shadow-lg border border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Join SolHire</h2>
            <p className="text-lg text-gray-300 mb-8">
              Whether you're a creative professional looking for opportunities or a client seeking talented individuals, 
              SolHire is building the modern platform for creative collaboration.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                Sign Up Now
              </Link>
              <Link href="/contact" className="px-6 py-2 bg-transparent border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 