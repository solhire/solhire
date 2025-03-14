'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiActivity, FiDollarSign, FiFolder, FiStar, FiUsers, 
  FiClock, FiCheckCircle, FiAlertCircle, FiEdit, FiEye,
  FiArrowRight, FiRefreshCw, FiBriefcase, FiBookmark,
  FiMessageSquare, FiHelpCircle, FiBell, FiSettings,
  FiSearch
} from 'react-icons/fi';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useWallet } from '@solana/wallet-adapter-react';
import EmptyState from '@/components/EmptyState';
import { useRouter } from 'next/navigation';

// Mock data - Replace with actual API calls
const mockData = {
  earnings: {
    total: 0,
    pending: 0,
    thisMonth: 0,
    currency: 'SOL'
  },
  stats: {
    completionRate: 0,
    responseTime: '0 hours',
    activeProjects: 0,
    totalReviews: 0
  },
  activeOrders: [],
  jobPostings: [],
  recommendedJobs: []
};

export default function Dashboard() {
  const [view, setView] = useState<'creator' | 'client'>('creator');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New job application received', type: 'info', time: '2 hours ago' },
    { id: 2, message: 'Payment released for Website Redesign', type: 'success', time: '5 hours ago' }
  ]);
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  // Status color mapping
  const statusColors = {
    'pending': 'bg-yellow-500/20 text-yellow-500',
    'in-progress': 'bg-blue-500/20 text-blue-500',
    'reviewing': 'bg-purple-500/20 text-purple-500',
    'completed': 'bg-green-500/20 text-green-500'
  };

  return (
    <MainLayout>
      <div className="container-custom pt-24 pb-12">
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setView('creator')}
              className={`px-4 py-2 rounded-full transition-all ${
                view === 'creator'
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                  : 'bg-background-dark text-gray-400 hover:text-white hover:bg-background-light/30'
              }`}
            >
              Creator View
            </button>
            <button
              onClick={() => setView('client')}
              className={`px-4 py-2 rounded-full transition-all ${
                view === 'client'
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                  : 'bg-background-dark text-gray-400 hover:text-white hover:bg-background-light/30'
              }`}
            >
              Client View
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex space-x-4">
            <button className="btn btn-primary btn-sm px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/20 transition-all duration-300">
              {view === 'creator' ? 'Create Service' : 'Post a Job'}
            </button>
            <button className="p-2 rounded-full bg-background-dark text-gray-400 hover:text-white hover:bg-primary/10 transition-all duration-300 border border-zinc-800 hover:border-primary/50">
              <FiBell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-background-dark text-gray-400 hover:text-white hover:bg-primary/10 transition-all duration-300 border border-zinc-800 hover:border-primary/50">
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Creator Dashboard */}
        {view === 'creator' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-zinc-800 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Total Earnings</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiDollarSign className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{mockData.earnings.total} SOL</p>
                <p className="text-sm text-gray-400 mt-2">
                  +{mockData.earnings.thisMonth} SOL this month
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card bg-gradient-to-br from-background to-background-dark border border-zinc-800 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Active Projects</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiBriefcase className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{mockData.stats.activeProjects}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {mockData.stats.completionRate}% completion rate
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card bg-gradient-to-br from-background to-background-dark border border-zinc-800 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Response Time</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{mockData.stats.responseTime}</p>
                <p className="text-sm text-gray-400 mt-2">Average response time</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card bg-gradient-to-br from-background to-background-dark border border-zinc-800 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Reviews</h3>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiStar className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{mockData.stats.totalReviews}</p>
                <p className="text-sm text-gray-400 mt-2">Total client reviews</p>
              </motion.div>
            </div>

            {/* Active Orders */}
            <div className="card bg-gradient-to-br from-background to-background-dark border border-zinc-800 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Active Orders</h2>
                <Link href="/orders" className="text-primary hover:text-primary-light flex items-center group">
                  <span>View All</span>
                  <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              {mockData.activeOrders.length === 0 ? (
                <EmptyState
                  title="No Active Orders"
                  description="You don't have any active orders yet. Start by browsing available jobs or creating a service."
                  action={{
                    label: "Browse Jobs",
                    onClick: () => router.push('/services')
                  }}
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-4">Project</th>
                        <th className="pb-4">Client</th>
                        <th className="pb-4">Deadline</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.activeOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-800">
                          <td className="py-4">{order.title}</td>
                          <td className="py-4">{order.client}</td>
                          <td className="py-4">{new Date(order.deadline).toLocaleDateString()}</td>
                          <td className="py-4">{order.amount} SOL</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <button className="p-2 rounded-full bg-background-dark text-gray-400 hover:text-white hover:bg-primary/10 transition-all duration-300 border border-zinc-800 hover:border-primary/50">
                                <FiEye className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-full bg-background-dark text-gray-400 hover:text-white hover:bg-primary/10 transition-all duration-300 border border-zinc-800 hover:border-primary/50">
                                <FiMessageSquare className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recommended Jobs */}
            <div className="card bg-gradient-to-br from-background to-background-dark border border-zinc-800 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recommended Jobs</h2>
                <button className="text-primary hover:text-primary-light p-2 rounded-full hover:bg-primary/10 transition-all duration-300">
                  <FiRefreshCw className="w-5 h-5" />
                </button>
              </div>
              {mockData.recommendedJobs.length === 0 ? (
                <EmptyState
                  title="No Recommendations Yet"
                  description="Complete your profile and add your skills to get personalized job recommendations."
                  action={{
                    label: "Complete Profile",
                    onClick: () => router.push('/profile/settings')
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockData.recommendedJobs.map((job) => (
                    <div key={job.id} className="p-4 rounded-xl bg-background-dark border border-zinc-800 hover:border-primary/50 transition-all duration-300 shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white">{job.title}</h3>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {job.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Budget: {job.budget}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Posted {job.postedDate}</span>
                        <button className="text-xs px-3 py-1 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Client Dashboard */}
        {view === 'client' && (
          <div className="space-y-8">
            {/* Job Postings */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Job Postings</h2>
                <Link href="/post-a-job" className="btn btn-primary btn-sm">
                  Post New Job
                </Link>
              </div>
              {mockData.jobPostings.length === 0 ? (
                <EmptyState
                  title="No Job Postings"
                  description="You haven't posted any jobs yet. Create your first job posting to find talented creators."
                  action={{
                    label: "Post a Job",
                    onClick: () => router.push('/post-job')
                  }}
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-4">Title</th>
                        <th className="pb-4">Applications</th>
                        <th className="pb-4">Posted Date</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.jobPostings.map((job) => (
                        <tr key={job.id} className="border-b border-gray-800">
                          <td className="py-4">{job.title}</td>
                          <td className="py-4">{job.applications} applications</td>
                          <td className="py-4">{job.postedDate}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                              {job.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <button className="p-2 rounded-full bg-background-light text-gray-400 hover:text-white">
                                <FiEye className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-full bg-background-light text-gray-400 hover:text-white">
                                <FiEdit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Wallet & Payments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Wallet Balance</h2>
                  <button className="text-primary hover:text-primary-light">
                    <FiRefreshCw className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-background-light p-6 rounded-xl mb-4">
                  <p className="text-gray-400 mb-2">Available Balance</p>
                  <p className="text-3xl font-bold">32.5 SOL</p>
                </div>
                <div className="flex space-x-4">
                  <button className="btn btn-primary flex-1">Deposit</button>
                  <button className="btn btn-outline flex-1">Withdraw</button>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/services" className="p-4 rounded-xl bg-background-light hover:bg-background-light/80 transition-colors">
                    <FiSearch className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-semibold">Find Services</h3>
                    <p className="text-sm text-gray-400">Browse creator services</p>
                  </Link>
                  <Link href="/bookmarks" className="p-4 rounded-xl bg-background-light hover:bg-background-light/80 transition-colors">
                    <FiBookmark className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-semibold">Saved Items</h3>
                    <p className="text-sm text-gray-400">View bookmarked creators</p>
                  </Link>
                  <Link href="/messages" className="p-4 rounded-xl bg-background-light hover:bg-background-light/80 transition-colors">
                    <FiMessageSquare className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-semibold">Messages</h3>
                    <p className="text-sm text-gray-400">Chat with creators</p>
                  </Link>
                  <Link href="/help" className="p-4 rounded-xl bg-background-light hover:bg-background-light/80 transition-colors">
                    <FiHelpCircle className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-semibold">Help Center</h3>
                    <p className="text-sm text-gray-400">Get support</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 