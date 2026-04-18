/**
 * DernSupport - Modern SaaS Landing Page
 * Premium, professional customer support platform
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiMessageSquare, FiBarChart3, FiZap } from 'react-icons/fi';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: FiMessageSquare,
      title: 'Smart Ticket Management',
      description: 'Organize, prioritize, and resolve customer issues with intelligent routing and assignment.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FiMessageSquare,
      title: 'AI-Powered Support',
      description: 'Get instant AI suggestions, auto-summarize tickets, and detect urgency automatically.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FiMessageSquare,
      title: 'Analytics & Insights',
      description: 'Track response times, satisfaction scores, and team performance with real-time dashboards.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Built for speed. Sub-second response times and optimized database queries.',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  const testimonials = [
    {
      name: 'Emma Wilson',
      role: 'CEO, TechStart',
      image: '👩‍💼',
      text: 'DernSupport transformed our customer support. Response times dropped by 70% and satisfaction increased to 4.9/5.',
    },
    {
      name: 'David Chen',
      role: 'Support Manager, SaaS Co',
      image: '👨‍💼',
      text: 'The AI suggestions save our team hours daily. Best investment we made for customer service.',
    },
    {
      name: 'Lisa Martinez',
      role: 'Product Manager, Creative Studio',
      image: '👩‍🎨',
      text: 'Intuitive interface, powerful features. Our team was productive from day one.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '29',
      description: 'Perfect for small teams',
      features: ['Up to 5 users', '1000 tickets/month', 'Email support', 'Basic analytics', 'Community access'],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '99',
      description: 'For growing businesses',
      features: ['Up to 25 users', 'Unlimited tickets', 'Priority support', 'Advanced analytics', 'AI features', 'Custom integrations'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: ['Unlimited users', 'Unlimited tickets', '24/7 phone support', 'Custom reports', 'AI suite', 'Dedicated account manager'],
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: 'How quickly can we get started?',
      answer: 'You can start in minutes. Sign up, create your first ticket, and invite team members instantly.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use enterprise-grade encryption, SOC 2 compliance, and regular security audits.',
    },
    {
      question: 'Can we integrate with other tools?',
      answer: 'Absolutely. We support integrations with Slack, email, webhooks, and custom APIs.',
    },
    {
      question: 'What about training and onboarding?',
      answer: 'We provide interactive tutorials, video guides, and dedicated onboarding for Enterprise plans.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Try DernSupport free for 14 days with full access to all features.',
    },
    {
      question: 'Can you migrate our existing data?',
      answer: 'Yes. Our team handles data migration from other platforms at no additional cost.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DernSupport
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/signin')}
              className="px-6 py-2 text-sm font-medium hover:text-blue-400 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-sm font-medium text-blue-300">✨ The modern support platform your customers deserve</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Customer support
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> reimagined</span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Deliver exceptional customer support with AI-powered insights, intelligent ticket management, and real-time collaboration. Built for teams that care about their customers.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105 flex items-center gap-2"
            >
              Start Free Trial <FiArrowRight />
            </button>
            <button className="px-8 py-4 border border-slate-600 rounded-lg font-semibold hover:bg-slate-800 transition">
              Watch Demo
            </button>
          </div>

          {/* Demo Video/Image */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/50 backdrop-blur p-2">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <FiPlay className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <p className="text-slate-400">Dashboard preview coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Powerful features, simple to use</h2>
          <p className="text-xl text-slate-400">Everything you need to deliver world-class customer support</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-8 border border-slate-700/50 rounded-2xl hover:border-slate-600/80 hover:bg-slate-800/50 transition group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">How it works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Create Tickets', desc: 'Customers submit issues via email, chat, or form' },
              { num: '2', title: 'Smart Assignment', desc: 'AI routes to the best agent automatically' },
              { num: '3', title: 'Collaborate', desc: 'Team works together to resolve quickly' },
              { num: '4', title: 'Track & Improve', desc: 'Analytics show what\'s working' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Loved by teams everywhere</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 border border-slate-700/50 rounded-2xl hover:border-slate-600/80 hover:bg-slate-800/30 transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-300 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 text-center">Simple, transparent pricing</h2>
          <p className="text-center text-slate-400 mb-16">Start free. Scale as you grow.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl transition border ${
                  plan.highlighted
                    ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative ring-1 ring-blue-500/20'
                    : 'border-slate-700/50 hover:border-slate-600/80'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-bold">
                    Most popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.price === 'Custom' ? (
                    <p className="text-4xl font-bold">Contact us</p>
                  ) : (
                    <>
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-slate-400">/month</span>
                    </>
                  )}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/50'
                      : 'border border-slate-600 hover:bg-slate-700/50'
                  }`}
                >
                  Get started
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm">
                      <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Frequently asked questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="p-6 border border-slate-700/50 rounded-xl group cursor-pointer hover:border-slate-600/80 transition"
            >
              <summary className="flex items-center justify-between font-semibold">
                <span>{faq.question}</span>
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="mt-4 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to transform your support?</h2>
          <p className="text-xl mb-10 text-blue-100">Join thousands of teams delivering exceptional customer experiences.</p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
              Schedule Demo
            </button>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-400">DernSupport</h3>
              <p className="text-slate-400 text-sm">Modern customer support platform built for teams.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 DernSupport. All rights reserved. Premium Customer Support Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for play button
const FiPlay = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default LandingPage;
