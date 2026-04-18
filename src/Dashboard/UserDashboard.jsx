/**
 * Modern User Dashboard
 * Displays user tickets, support chat, and account information
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiSearch, FiFilter, FiClock, FiCheckCircle, FiAlertCircle, FiMessageSquare, FiSettings } from 'react-icons/fi';
import Toast from '../Alerts/Toast';

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tickets`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setTickets(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      Toast('error', 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'open' && !ticket.isSolved) ||
                         (filterStatus === 'resolved' && ticket.isSolved);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => !t.isSolved).length,
    resolved: tickets.filter(t => t.isSolved).length,
    avgResponseTime: '2 hours',
  };

  const getStatusIcon = (isSolved) => {
    return isSolved ? 
      <FiCheckCircle className="w-5 h-5 text-green-400" /> :
      <FiAlertCircle className="w-5 h-5 text-yellow-400" />;
  };

  const getStatusColor = (isSolved) => {
    return isSolved ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 sticky top-0 z-40 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">My Support Tickets</h1>
              <p className="text-slate-400">Track and manage your support requests</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition flex items-center gap-2">
              <FiPlus className="w-5 h-5" />
              New Ticket
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tickets', value: stats.total, icon: '📊', color: 'from-blue-500 to-blue-600' },
            { label: 'Open', value: stats.open, icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
            { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'from-green-500 to-green-600' },
            { label: 'Avg Response', value: stats.avgResponseTime, icon: '⚡', color: 'from-purple-500 to-purple-600' },
          ].map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br ${stat.color}/10 hover:border-slate-600/80 transition`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'open', 'resolved'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === status
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin">⚙️</div>
                <p className="text-slate-400 mt-2">Loading tickets...</p>
              </div>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 border border-slate-700/50 rounded-lg bg-slate-800/30">
              <FiMessageSquare className="w-12 h-12 mx-auto text-slate-500 mb-4" />
              <p className="text-slate-400">No tickets found</p>
              <p className="text-slate-500 text-sm mt-1">Create your first support ticket to get started</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-6 border rounded-xl hover:border-slate-600/80 hover:bg-slate-800/50 transition cursor-pointer ${getStatusColor(ticket.isSolved)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(ticket.isSolved)}
                      <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{ticket.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 bg-slate-700/50 rounded-md">
                        {ticket.type || 'General'}
                      </span>
                      {ticket.replies?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <FiMessageSquare className="w-4 h-4" />
                          {ticket.replies.length} replies
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                    ticket.isSolved 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {ticket.isSolved ? 'Resolved' : 'Open'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
