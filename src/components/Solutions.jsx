import React from 'react';
import { Users, Calendar, LayoutDashboard, Settings, Monitor, UserCircle, TrendingUp, FileText, MessageCircle, CreditCard } from 'lucide-react';
import { solutions } from '../data/solutions';

const iconMap = {
  Users: <Users size={24} className="glow-text" />,
  Calendar: <Calendar size={24} className="glow-text" />,
  LayoutDashboard: <LayoutDashboard size={24} className="glow-text" />,
  Settings: <Settings size={24} className="glow-text" />,
  Monitor: <Monitor size={24} className="glow-text" />,
  UserCircle: <UserCircle size={24} className="glow-text" />,
  TrendingUp: <TrendingUp size={24} className="glow-text" />,
  FileText: <FileText size={24} className="glow-text" />,
  MessageCircle: <MessageCircle size={24} className="glow-text" />,
  CreditCard: <CreditCard size={24} className="glow-text" />
};

const Solutions = () => {
  return (
    <section id="solutions" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(17,24,39,0.5), transparent)' }}>
      <div className="container">
        <h2 className="section-title">Digital Systems for Business Needs</h2>
        <p className="section-subtitle">We build specialized internal tools and customer-facing systems to handle your specific requirements.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {solutions.map(sol => (
            <div key={sol.id} className="glass-card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '20px'
            }}>
              <div style={{
                background: 'rgba(250, 204, 21, 0.1)',
                padding: '10px',
                borderRadius: '10px'
              }}>
                {iconMap[sol.icon]}
              </div>
              <span style={{ fontWeight: '500', fontSize: '1.05rem' }}>{sol.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
