'use client';

import React, { useState } from 'react';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend, FiUser } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Contact Us | SolHire',
  description: 'Get in touch with the SolHire team for support, partnerships, or general inquiries',
};

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="relative py-16 bg-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help you with anything related to SolHire.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background-dark border border-gray-800 rounded-2xl p-8 shadow-xl"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSend className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-background border border-gray-700 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-background border border-gray-700 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMessageCircle className="text-gray-500" />
                      </div>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="bg-background border border-gray-700 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Billing Question">Billing Question</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Feature Request">Feature Request</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="bg-background border border-gray-700 text-white rounded-lg block w-full p-2.5 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background-dark border border-gray-800 rounded-2xl p-8 shadow-xl mb-8"
              >
                <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-400 mb-1">For general inquiries:</p>
                      <a href="mailto:hello@solhire.com" className="text-primary hover:underline">
                        hello@solhire.com
                      </a>
                      <p className="text-gray-400 mt-2 mb-1">For support issues:</p>
                      <a href="mailto:support@solhire.com" className="text-primary hover:underline">
                        support@solhire.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <FiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-400 mb-1">Customer Service:</p>
                      <a href="tel:+18005550123" className="text-primary hover:underline">
                        +1 (800) 555-0123
                      </a>
                      <p className="text-gray-400 mt-2 mb-1">Hours of operation:</p>
                      <p className="text-white">Monday - Friday: 9AM - 6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <FiMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Our Location</h3>
                      <p className="text-gray-400 mb-1">Headquarters:</p>
                      <p className="text-white">
                        123 Blockchain Boulevard<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-background-dark border border-gray-800 rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                <p className="text-gray-400 mb-6">
                  Connect with other creators, clients, and the SolHire team on our community channels.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://discord.gg/solhire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.874-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                    Discord
                  </a>
                  
                  <a
                    href="https://twitter.com/solhire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </a>
                  
                  <a
                    href="https://t.me/solhire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.5 6.394-.753 8.475-.107.875-.35 1.166-.57 1.195-.484.065-1.055-.248-1.495-.48-1.097-.585-2.03-1.184-2.773-1.623-.829-.49-1.832-1.237-.203-2.228l6.35-5.636c.307-.29.489-.51.19-.762-.278-.23-.71-.214-1.001-.14-.408.093-2.831 1.805-7.949 5.296-.49.326-.925.492-1.251.478-.392-.015-1.134-.251-1.889-.486-.836-.255-1.493-.39-1.435-.8.034-.317.336-.522.936-.704 3.45-1.487 7.55-3.277 10.592-4.608.827-.37 1.883-.905 2.937-1.121.378-.057.59-.052.756-.039z" />
                    </svg>
                    Telegram
                  </a>
                  
                  <a
                    href="https://reddit.com/r/solhire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-[#FF5700]/10 hover:bg-[#FF5700]/20 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3 text-[#FF5700]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                    Reddit
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage; 