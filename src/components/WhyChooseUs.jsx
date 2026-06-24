import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  "Business-focused digital systems",
  "Premium 3D modern website design",
  "Custom CRM and software development",
  "AI automation-ready approach",
  "Scalable SaaS software structure",
  "Mobile responsive development",
  "Support after delivery",
  "Honest project status and real portfolio approach",
  "Solutions built as per company requirements"
];

const WhyChooseUs = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-color-light)' }}>
      <div className="container">
        <h2 className="section-title">Why Choose Central Application Hub (CPH)</h2>
        <p className="section-subtitle">We believe in transparent, scalable, and premium quality digital solutions.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          marginTop: '50px'
        }}>
          {reasons.map((reason, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <CheckCircle2 color="var(--accent-yellow)" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '1.05rem', fontWeight: '500' }}>{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
