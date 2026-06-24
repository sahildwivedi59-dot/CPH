import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, Sparkles, XCircle } from 'lucide-react';
import { services } from '../data/services';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Service Not Found</div>;

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
       <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
              <div className="eyebrow" style={{ margin: '0 auto 16px' }}>
                <Sparkles size={16} className="glow-text" />
                <span>{service.timeline} planning estimate</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}><span className="glow-text">{service.title}</span></h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 34px' }}>
                 {service.description}
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/contact')}>Start Project Inquiry <ArrowRight size={18} /></button>
          </div>

          <div className="grid grid-2" style={{ gap: '34px', marginBottom: '54px' }}>
             <div className="glass-card">
                 <h3 style={{ fontSize: '1.55rem', marginBottom: '20px' }}>Problems it Solves</h3>
                 <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-muted)' }}>
                    {service.problems.map((p, i) => <li key={i} style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#FB7185" /> {p}</li>)}
                 </ul>
             </div>
             <div className="glass-card" style={{ border: '1px solid var(--accent-yellow)' }}>
                 <h3 style={{ fontSize: '1.55rem', marginBottom: '20px' }}>Features Included</h3>
                 <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {service.features.map((f, i) => <li key={i} style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="var(--accent-yellow)" /> {f}</li>)}
                 </ul>
             </div>
          </div>

          <div className="grid grid-3" style={{ gap: '24px', marginBottom: '70px' }}>
             <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Clock3 size={28} className="glow-text" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '10px' }}>Estimated Timeline</h4>
                <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'white' }}>{service.timeline}</div>
             </div>
             <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Sparkles size={28} className="glow-text" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '10px' }}>Starting Price Idea</h4>
                <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--accent-yellow)' }}>{service.startPrice}</div>
             </div>
             <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <CheckCircle2 size={28} className="glow-text" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '10px' }}>Future Upgrades</h4>
                <div style={{ fontSize: '1rem', color: 'white' }}>{service.upgrades.join(' / ')}</div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ServiceDetails;
