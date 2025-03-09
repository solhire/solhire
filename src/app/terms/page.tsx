import MainLayout from '@/components/layout/MainLayout';

export default function Terms() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-background-light">
        <div className="container-custom">
          <div className="bg-background-dark p-8 md:p-12 rounded-2xl shadow-lg border border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">Terms of Service</h1>
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">1. Introduction</h2>
              <p className="text-gray-300">
                Welcome to SolHire. By accessing or using our website, mobile application, or any of our services, 
                you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">2. Definitions</h2>
              <ul className="space-y-3 text-gray-300">
                <li>"SolHire", "we", "us", or "our" refers to the SolHire platform.</li>
                <li>"User", "you", or "your" refers to any individual or entity using our Services.</li>
                <li>"Services" refers to the features, functions, and capabilities offered through the SolHire platform.</li>
                <li>"Creative Professional" refers to users who offer creative services through the platform.</li>
                <li>"Client" refers to users who seek and purchase creative services through the platform.</li>
                <li>"Solana" refers to the Solana blockchain and its native cryptocurrency.</li>
              </ul>
            </div>

            {/* Account Registration */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">3. Account Registration</h2>
              <div className="space-y-4 text-gray-300">
                <p>3.1 To use our Services, you must create an account by providing accurate and complete information.</p>
                <p>3.2 You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                <p>3.3 You must be at least 18 years old to create an account and use our Services.</p>
                <p>3.4 You agree to promptly notify us of any unauthorized use of your account.</p>
              </div>
            </div>

            {/* Wallet Integration */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">4. Wallet Integration</h2>
              <div className="space-y-4 text-gray-300">
                <p>4.1 To facilitate transactions on our platform, you will need to connect a compatible Solana wallet.</p>
                <p>4.2 You are solely responsible for the security of your wallet, including private keys and recovery phrases.</p>
                <p>4.3 SolHire does not store your private keys, recovery phrases, or have direct access to your cryptocurrency.</p>
                <p>4.4 You acknowledge the risks associated with cryptocurrency transactions, including but not limited to volatility, transaction failures, and security vulnerabilities.</p>
              </div>
            </div>

            {/* User Conduct */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">5. User Conduct</h2>
              <div className="space-y-4 text-gray-300">
                <p>5.1 You agree not to use our Services to:</p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the intellectual property rights of others</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Publish or transmit any content that is defamatory, obscene, or otherwise objectionable</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with the proper functioning of our Services</li>
                </ul>
                <p>5.2 You agree to interact professionally and respectfully with other users of the platform.</p>
              </div>
            </div>

            {/* Creative Professional Obligations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">6. Creative Professional Obligations</h2>
              <div className="space-y-4 text-gray-300">
                <p>6.1 As a Creative Professional, you agree to:</p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Provide accurate information about your skills, experience, and services</li>
                  <li>Deliver work as agreed upon with Clients</li>
                  <li>Communicate promptly and professionally with Clients</li>
                  <li>Respect Client confidentiality and intellectual property</li>
                  <li>Comply with all applicable laws, including tax regulations</li>
                </ul>
                <p>6.2 You retain ownership of your pre-existing intellectual property unless otherwise agreed upon with a Client.</p>
              </div>
            </div>

            {/* Client Obligations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">7. Client Obligations</h2>
              <div className="space-y-4 text-gray-300">
                <p>7.1 As a Client, you agree to:</p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Provide clear project requirements and expectations</li>
                  <li>Respond to communications in a timely manner</li>
                  <li>Fund escrow accounts as required before work begins</li>
                  <li>Review and approve completed work within reasonable timeframes</li>
                  <li>Respect the intellectual property rights of Creative Professionals</li>
                </ul>
                <p>7.2 You acknowledge that you must have sufficient funds in your connected Solana wallet to complete transactions.</p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">8. Intellectual Property</h2>
              <div className="space-y-4 text-gray-300">
                <p>8.1 Unless explicitly stated otherwise in a separate agreement between Client and Creative Professional:</p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Clients own the rights to the final deliverables they have paid for</li>
                  <li>Creative Professionals retain the rights to preliminary concepts not selected by the Client</li>
                  <li>Creative Professionals may include completed work in their portfolios unless confidentiality has been agreed upon</li>
                </ul>
                <p>8.2 SolHire retains all rights, title, and interest in our platform, including all intellectual property rights.</p>
              </div>
            </div>

            {/* Escrow and Payments */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">9. Escrow and Payments</h2>
              <div className="space-y-4 text-gray-300">
                <p>9.1 All payments on the platform are made using Solana cryptocurrency.</p>
                <p>9.2 Payments for services are held in smart contract escrow until the agreed conditions are met.</p>
                <p>9.3 Once a Client approves the work, funds are released from escrow to the Creative Professional's wallet.</p>
                <p>9.4 In case of disputes, SolHire reserves the right to make a final determination regarding the release of escrow funds.</p>
              </div>
            </div>

            {/* Disclaimers and Limitations of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">10. Disclaimers and Limitations of Liability</h2>
              <div className="space-y-4 text-gray-300">
                <p>10.1 Our Services are provided "as is" without warranties of any kind.</p>
                <p>10.2 We do not guarantee the quality, accuracy, or reliability of any user, service, or content on the platform.</p>
                <p>10.3 We are not responsible for any loss or damage resulting from:</p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Your use of our Services</li>
                  <li>Transactions conducted through our platform</li>
                  <li>Content posted by users</li>
                  <li>Disputes between users</li>
                  <li>Technical issues with the Solana blockchain</li>
                  <li>Security breaches outside our reasonable control</li>
                </ul>
                <p>10.4 Our liability is limited to the maximum extent permitted by law.</p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">11. Indemnification</h2>
              <p className="text-gray-300">
                You agree to indemnify and hold SolHire harmless from any claims, damages, liabilities, costs, or expenses 
                arising from your use of our Services, your violation of these Terms, or your infringement of any rights of another party.
              </p>
            </div>

            {/* Modifications to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">12. Modifications to Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>12.1 We reserve the right to modify these Terms at any time.</p>
                <p>12.2 We will provide notice of significant changes through our website or via email.</p>
                <p>12.3 Your continued use of our Services after such modifications constitutes your acceptance of the updated Terms.</p>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">13. Termination</h2>
              <div className="space-y-4 text-gray-300">
                <p>13.1 You may terminate your account at any time.</p>
                <p>13.2 We reserve the right to suspend or terminate your account for violations of these Terms or for any other reason at our discretion.</p>
                <p>13.3 Upon termination, you will lose access to our Services, but these Terms will continue to apply where applicable.</p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">14. Governing Law</h2>
              <p className="text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">15. Dispute Resolution</h2>
              <p className="text-gray-300">
                Any dispute arising from these Terms or your use of our Services shall be resolved through 
                confidential arbitration in [Jurisdiction], except that you or SolHire may seek equitable 
                relief in any court having jurisdiction.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">16. Contact Information</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us at contact@solhire.net.
              </p>
            </div>

            <div className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-800">
              Last Updated: 2025
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 