import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HowItWorks() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 bg-background-light">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How SolHire Works</h1>
          <p className="text-lg text-gray-300 mb-12">
            SolHire connects creative professionals with clients who need their services, all powered by the Solana blockchain for fast, secure payments. Here's how our platform works for both clients and creative professionals.
          </p>

          {/* For Clients Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">For Clients</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Create Your Account",
                  description: "Sign up for a free SolHire account. Fill in your profile details, including your company information, the types of creative work you're looking for, and your budget range."
                },
                {
                  title: "Post a Job",
                  description: "Create a detailed job posting specifying your project requirements, timeline, budget, and any specific skills or experience you're looking for. Our smart matching system will help connect you with the right talent."
                },
                {
                  title: "Connect Your Solana Wallet",
                  description: "Link your Solana wallet to your SolHire account. We support popular wallets like Phantom, Solflare, and Sollet. This will allow you to make secure and instant payments to your hired creatives."
                },
                {
                  title: "Review Proposals & Hire",
                  description: "Browse through proposals from qualified creatives. Review their portfolios, ratings, and previous work. Once you've found the perfect match, hire them directly through our platform."
                },
                {
                  title: "Fund the Project Escrow",
                  description: "When you're ready to start the project, you'll fund our secure smart contract escrow with the agreed amount in SOL. This protects both you and the creative - the funds are only released when project milestones are met."
                },
                {
                  title: "Collaborate & Approve",
                  description: "Work with your creative through our built-in collaboration tools. Once you're satisfied with the delivered work, approve the release of funds from the escrow to the creative's wallet."
                }
              ].map((step, index) => (
                <div key={index} className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-primary">{index + 1}. {step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For Creative Professionals Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">For Creative Professionals</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Create Your Professional Profile",
                  description: "Sign up and build a compelling profile showcasing your skills, experience, and portfolio. Highlight your expertise in video editing, graphic design, coding, or other creative services."
                },
                {
                  title: "Connect Your Solana Wallet",
                  description: "Link your Solana wallet to receive payments. If you're new to Solana, don't worry - we provide step-by-step guides to help you set up a wallet and understand how it works."
                },
                {
                  title: "Browse Available Jobs",
                  description: "Explore our job marketplace to find projects that match your skills and interests. Use our advanced filters to find the perfect opportunities."
                },
                {
                  title: "Submit Proposals",
                  description: "Send custom proposals to clients, outlining your approach, timeline, and pricing. Stand out by demonstrating your understanding of the project requirements."
                },
                {
                  title: "Get Hired & Start Working",
                  description: "Once a client selects your proposal, you'll receive a notification. Confirm the job details and start working on the project according to the agreed timeline."
                },
                {
                  title: "Receive Secure Payments",
                  description: "As you complete project milestones, the client will approve releases from the escrow. Payments in SOL will be instantly transferred to your connected wallet - no waiting for bank transfers or payment processing."
                }
              ].map((step, index) => (
                <div key={index} className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-primary">{index + 1}. {step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The SolHire Advantage Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">The SolHire Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Lightning-Fast Payments",
                  description: "Solana's high-performance blockchain allows for near-instant payments with transaction fees of less than $0.01, regardless of the payment amount."
                },
                {
                  title: "Secure Escrow System",
                  description: "Our smart contract escrow ensures both parties are protected throughout the transaction. Clients know their funds are secure, and creatives know they'll get paid for completed work."
                },
                {
                  title: "Global Talent Pool",
                  description: "Connect with professionals from around the world without worrying about currency conversion or international transfer fees."
                },
                {
                  title: "Transparent Reviews",
                  description: "Our blockchain-verified review system ensures all feedback is genuine, helping maintain a high-quality marketplace."
                },
                {
                  title: "Lower Fees",
                  description: "Traditional freelance platforms charge 20% or more. SolHire's blockchain-powered system allows us to charge significantly lower fees, meaning more money for creatives and better value for clients."
                }
              ].map((advantage, index) => (
                <div key={index} className="bg-background-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-primary">{advantage.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-xl text-gray-300 mb-8">
              Ready to experience the future of creative hiring? Sign up today or browse available talent
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                Sign Up Now
              </button>
              <button className="px-6 py-2 bg-transparent border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
                Browse Talent
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 