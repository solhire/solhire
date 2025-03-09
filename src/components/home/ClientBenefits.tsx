'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTarget, FiClock, FiTrendingUp } from 'react-icons/fi';

const ClientBenefits = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-primary/20 h-[500px]"
          >
            <Image
              src="/placeholder-image.jpg"
              alt="Client using SolHire platform"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

            {/* Stats Overlays */}
            <div className="absolute -top-2 -right-2 transform rotate-2 bg-background border border-primary/30 rounded-lg p-3 shadow-xl">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🔍</span>
                <div>
                  <div className="font-bold">Find creators fast</div>
                  <div className="text-sm text-gray-400">Average response time: 2 hours</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-2 transform -rotate-2 bg-background border border-blue-500/30 rounded-lg p-3 shadow-xl">
              <div className="flex items-center">
                <span className="text-2xl mr-2">⭐</span>
                <div>
                  <div className="font-bold">4.92/5</div>
                  <div className="text-sm text-gray-400">Avg. creator rating</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm border border-primary/30 rounded-lg p-4 shadow-xl w-[80%]">
              <div className="text-center mb-2 font-semibold">Satisfaction Guarantee</div>
              <div className="text-sm text-center text-gray-400">
                Work isn't released to the creator until you're 100% satisfied with the result
              </div>
            </div>
          </motion.div>

          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
              For Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find the Perfect Creative Professional for Your Project
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Get your creative projects completed quickly and efficiently with our vast network of talented professionals.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FiTarget className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Find the Perfect Match</h3>
                  <p className="text-gray-400">
                    Our advanced matchmaking algorithm helps you find creators with the exact skills and experience your project requires.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FiClock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Fast Turnaround Times</h3>
                  <p className="text-gray-400">
                    Most projects get responses within hours, not days. Our creators are located globally, so work happens around the clock.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pay Only for Quality Results</h3>
                  <p className="text-gray-400">
                    Our smart contract escrow system means you only release payment when you're satisfied with the completed work.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/post-job"
              className="btn btn-primary px-8 py-3 text-lg inline-flex items-center group"
            >
              <span>Post a Job Now</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientBenefits; 