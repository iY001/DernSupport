/**
 * Premium Admin Dashboard
 * Complete administration panel with analytics, ticket management, and user management
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiBarChart3,
  FiUsers,
  FiMessageSquare,
  FiTrendingUp,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiArrowUpRight,
  FiArrowDownRight,
} from 'react-icons/fi';
import Toast from '../Alerts/Toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [ticketsRes, usersRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/tickets`, { headers }),
        axios.get(`${process.env.REACT_APP_API_URL}/user`, { headers }),
      ]);

      setTickets(ticketsRes.data.data || []);
      setUsers(usersRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      Toast('error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Analytics calculations
  const analytics = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => !t.isSolved).length,
    resolvedTickets: tickets.filter(t => t.isSolved).length,
    resolutionRate: tickets.length > 0 ? ((tickets.filter(t => t.isSolved).length / tickets.length) * 100).toFixed(1) : 0,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.role !== 'admin').length,
    avgTicketsPerUser: users.length > 0 ? (tickets.length / users.length).toFixed(1) : 0,
    avgResponse: '2.3 hours',
  };

  const recentTickets = tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  const recentUsers = users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700/50 sticky top-0 z-40 backdrop-blur-md bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm">Manage your support platform</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-sm font-medium transition">
                Export Report
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Tickets',
              value: analytics.totalTickets,
              change: '+12%',
              positive: true,
              icon: '📋',
            },
            {
              title: 'Resolution Rate',
              value: `${analytics.resolutionRate}%`,
              change: '+5%',
              positive: true,
              icon: '✅',
            },
            {
              title: 'Active Users',
              value: analytics.activeUsers,
              change: '+8',
              positive: true,
              icon: '👥',
            },
            {
              title: 'Avg Response Time',
              value: analytics.avgResponse,
              change: '-15 min',
              positive: true,
              icon: '⚡',
            },
          ].map((metric, idx) => (
            <div key={idx} className="p-6 border border-slate-700/50 rounded-xl bg-slate-900/50 hover:bg-slate-800/30 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">{metric.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                  <p className={`text-xs mt-2 flex items-center gap-1 ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.positive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                    {metric.change} from last week
                  </p>
                </div>
                <span className="text-3xl">{metric.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-slate-700/50 overflow-x-auto">
          {['overview', 'tickets', 'users', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Tickets */}
            <div className="lg:col-span-2">
              <div className="border border-slate-700/50 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 bg-slate-900/50">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Tickets</h2>
                    <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View all →
                    </a>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-700/50 bg-slate-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTickets.map(ticket => (
                        <tr key={ticket.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 transition">
                          <td className="px-6 py-4 text-sm font-medium text-white truncate max-w-xs">
                            {ticket.subject}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{ticket.name}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">
                              {ticket.type || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-flex items-center gap-1 ${ticket.isSolved ? 'text-green-400' : 'text-yellow-400'}`}>
                              {ticket.isSolved ? <FiCheckCircle /> : <FiClock />}
                              {ticket.isSolved ? 'Resolved' : 'Open'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="border border-slate-700/50 rounded-xl p-6 bg-slate-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Support Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Open Tickets</span>
                      <span className="text-sm font-bold text-white">{analytics.openTickets}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${(analytics.openTickets / analytics.totalTickets) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Resolved Tickets</span>
                      <span className="text-sm font-bold text-white">{analytics.resolvedTickets}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${(analytics.resolvedTickets / analytics.totalTickets) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-slate-700/50 rounded-xl p-6 bg-slate-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Team Performance</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg per agent</span>
                    <span className="text-white font-bold">{analytics.avgTicketsPerUser}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Response time</span>
                    <span className="text-white font-bold">{analytics.avgResponse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resolution rate</span>
                    <span className="text-green-400 font-bold">{analytics.resolutionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-700/50 bg-slate-900/50">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 bg-slate-800 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <button className="px-4 py-2 border border-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-800 transition flex items-center gap-2">
                  <FiFilter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50 bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTickets.map(ticket => (
                    <tr key={ticket.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 transition">
                      <td className="px-6 py-4 text-sm text-slate-300">{ticket.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{ticket.subject}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{ticket.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1 ${ticket.isSolved ? 'text-green-400' : 'text-yellow-400'}`}>
                          {ticket.isSolved ? <FiCheckCircle /> : <FiClock />}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-slate-400 hover:text-slate-200">
                          <FiMoreVertical />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentUsers.map(user => (
              <div key={user.id} className="border border-slate-700/50 rounded-xl p-6 bg-slate-900/50 hover:border-slate-600/80 transition">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{user.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-red-500/20 text-red-300'
                      : user.role === 'agent'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-slate-700/50 text-slate-300'
                  }`}>
                    {user.role || 'Customer'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-slate-700/50 rounded-xl p-6 bg-slate-900/50">
              <h3 className="text-lg font-bold text-white mb-6">Ticket Trends</h3>
              <div className="space-y-4">
                {[
                  { label: 'Monday', value: 24, percent: 80 },
                  { label: 'Tuesday', value: 28, percent: 93 },
                  { label: 'Wednesday', value: 19, percent: 63 },
                  { label: 'Thursday', value: 32, percent: 100 },
                  { label: 'Friday', value: 26, percent: 87 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-300">{item.label}</span>
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-700/50 rounded-xl p-6 bg-slate-900/50">
              <h3 className="text-lg font-bold text-white mb-6">Ticket Types Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: 'Technical', count: 45, color: 'from-blue-500 to-blue-600' },
                  { label: 'Billing', count: 28, color: 'from-green-500 to-green-600' },
                  { label: 'Feature Request', count: 18, color: 'from-purple-500 to-purple-600' },
                  { label: 'General', count: 9, color: 'from-yellow-500 to-yellow-600' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg bg-gradient-to-r ${item.color}/10 border border-slate-700/50`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <span className="text-sm font-bold text-slate-300">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
