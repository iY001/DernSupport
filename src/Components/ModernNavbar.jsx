/**
 * Premium Modern Navigation Bar
 * Sticky navbar with dropdown menus and authentication
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiHome,
  FiHelpCircle,
  FiMessageSquare,
  FiLogOut,
  FiUser,
  FiSettings,
} from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    setDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/home', icon: FiHome },
    { label: 'Problems', path: '/problems', icon: FiHelpCircle },
    { label: 'Support', path: '/support', icon: FiMessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate('/home')}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DernSupport
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'text-blue-400'
                    : 'text-slate-300 hover:text-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/signin')}
                  className="px-6 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-300">{user.name || 'User'}</span>
                  <FiChevronDown className={`w-4 h-4 transition ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-700/50 bg-slate-900/50">
                      <p className="text-sm text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                      {user.role && (
                        <span className={`inline-block mt-2 px-3 py-1 rounded text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-red-500/20 text-red-300'
                            : user.role === 'agent'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-slate-700/50 text-slate-300'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      )}
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/mytickets');
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition flex items-center gap-2"
                      >
                        <FiMessageSquare className="w-4 h-4" />
                        My Tickets
                      </button>

                      <button
                        onClick={() => {
                          navigate('/settings');
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition flex items-center gap-2"
                      >
                        <FiSettings className="w-4 h-4" />
                        Settings
                      </button>

                      {user.role === 'admin' && (
                        <button
                          onClick={() => {
                            navigate('/dashboard');
                            setDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition flex items-center gap-2"
                        >
                          <FiSettings className="w-4 h-4" />
                          Admin Dashboard
                        </button>
                      )}
                    </div>

                    <div className="border-t border-slate-700/50 p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition flex items-center gap-2"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-200 transition"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-700/50 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/signin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/mytickets');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
                >
                  My Tickets
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Settings
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
