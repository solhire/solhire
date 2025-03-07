import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Privacy() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-background-light">
        <div className="container-custom">
          <div className="bg-background-dark p-8 md:p-12 rounded-2xl shadow-lg border border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">Privacy Policy</h1>
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                This Privacy Policy explains how SolHire ("we," "us," or "our") collects, uses, shares, and protects your personal 
                information when you use our website, application, or services (collectively, the "Services"). We respect your privacy 
                and are committed to protecting your personal information.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Information We Collect</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-white">Personal Information You Provide</h3>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-8 space-y-2 text-gray-300 leading-relaxed">
                  <li>Account information (name, email address, password)</li>
                  <li>Profile information (professional skills, portfolio items, biography)</li>
                  <li>Wallet addresses</li>
                  <li>Communication data (messages, proposals, project requirements)</li>
                  <li>Payment information</li>
                  <li>User feedback and ratings</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-white">Information Collected Automatically</h3>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  When you use our Services, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-8 space-y-2 text-gray-300 leading-relaxed">
                  <li>Usage data (pages visited, features used, time spent)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Location information (based on IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-white">Information From Third Parties</h3>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  We may receive information about you from third parties, including:
                </p>
                <ul className="list-disc pl-8 space-y-2 text-gray-300 leading-relaxed">
                  <li>Authentication providers if you choose to connect via third-party login</li>
                  <li>Blockchain data related to your on-chain activities relevant to our platform</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">How We Use Your Information</h2>
              <p className="text-gray-300 mb-3 leading-relaxed">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-300 leading-relaxed">
                <li>Providing, maintaining, and improving our Services</li>
                <li>Processing transactions and managing escrow services</li>
                <li>Connecting clients with creative professionals</li>
                <li>Communication with users about services, updates, and support</li>
                <li>Personalizing user experience</li>
                <li>Ensuring compliance with our Terms of Service</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Analyzing usage patterns to improve our platform</li>
              </ul>
            </div>

            {/* How We Share Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">How We Share Your Information</h2>
              <p className="text-gray-300 mb-3 leading-relaxed">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-300 leading-relaxed">
                <li>With other users as necessary to facilitate services (e.g., connecting clients and creatives)</li>
                <li>With service providers and partners who help us provide our Services</li>
                <li>To comply with legal obligations</li>
                <li>In connection with a merger, sale, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
              <p className="text-gray-300 mt-4 leading-relaxed">
                We do not sell your personal information to third parties.
              </p>
            </div>

            {/* Blockchain Transactions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Blockchain Transactions</h2>
              <p className="text-gray-300 leading-relaxed">
                Please note that transactions on the Solana blockchain are public and contain wallet addresses and transaction amounts. 
                While we do not directly link your identity to your wallet address, be aware that transactions made through our platform 
                will be visible on the blockchain.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method 
                of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </div>

            {/* Your Rights and Choices */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Your Rights and Choices</h2>
              <p className="text-gray-300 mb-3 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-300 leading-relaxed">
                <li>Accessing, correcting, or deleting your information</li>
                <li>Withdrawing consent</li>
                <li>Data portability</li>
                <li>Restricting or objecting to processing</li>
                <li>Opting out of communications</li>
              </ul>
              <p className="text-gray-300 mt-4 leading-relaxed">
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </div>

            {/* Cookies and Tracking Technologies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. 
                You can manage your cookie preferences through your browser settings.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our Services are not directed to children under 18 years of age. We do not knowingly collect personal information from children. 
                If we learn we have collected personal information from a child without parental consent, we will delete that information.
              </p>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">International Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence, which may have 
                different data protection laws.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-primary">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions or concerns about our Privacy Policy or data practices, please contact us at:
              </p>
              <p className="text-primary mt-4 font-medium">privacy@solhire.com</p>
            </div>

            <div className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-800">
              Last Updated: 2025
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 