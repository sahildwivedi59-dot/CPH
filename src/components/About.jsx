import React from 'react';
import { BadgeCheck, Building2, Cpu, UsersRound } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="cta-panel" style={{
          padding: '52px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(280px, 0.7fr)', gap: '42px', alignItems: 'center' }} className="grid-2">
            <div>
              <div className="eyebrow" style={{ marginBottom: '18px' }}>
                <Building2 size={16} className="glow-text" />
                <span>About Central Application Hub</span>
              </div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>About <span className="glow-text">CPH</span></h2>
              <p style={{ fontSize: '1.14rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '18px' }}>
                Central Application Hub (CPH) is founded by Sahil Dwivedi with the vision to help businesses build modern digital systems.
              </p>
              <p style={{ fontSize: '1.06rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                We create websites, CRM systems, mobile apps, SaaS software, AI automation workflows, and custom software solutions that reduce manual work and make business operations easier.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '14px' }}>
              <Metric icon={<Cpu size={22} className="glow-text" />} title="Digital-first" text="Systems planned for real operations" />
              <Metric icon={<UsersRound size={22} className="glow-text" />} title="Business focused" text="Built around company requirements" />
              <Metric icon={<BadgeCheck size={22} className="glow-text" />} title="Scalable" text="Ready for future modules and upgrades" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric = ({ icon, title, text }) => (
  <div className="glass-card" style={{ padding: '18px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
    <div className="icon-box" style={{ width: '44px', height: '44px' }}>{icon}</div>
    <div>
      <h4 style={{ marginBottom: '4px' }}>{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{text}</p>
    </div>
  </div>
);

export default About;
