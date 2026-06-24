import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectMoreInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Project Not Found</div>;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
       {/* Hero */}
       <div className="container" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ color: 'var(--accent-yellow)', fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>{project.category}</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px' }}>{project.name}</h1>
          <div style={{ display: 'inline-block', background: 'rgba(250, 204, 21, 0.1)', border: '1px solid var(--accent-yellow)', padding: '5px 15px', borderRadius: '20px', color: 'var(--text-color)', marginBottom: '30px' }}>
             Status: {project.status}
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 40px' }}>
             {project.shortDescription}
          </p>

          <div style={{
            height: '400px',
            background: 'linear-gradient(45deg, #111827, #1f2937)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            border: '1px solid var(--glass-border)'
          }}>
             <div style={{ fontSize: '4rem', opacity: '0.1', fontWeight: '900' }}>CPH Project Demo</div>
          </div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
             <button className="btn btn-primary" onClick={() => window.open('https://wa.me/917581841039', '_blank')}>Request Similar Project</button>
             <button className="btn btn-secondary" onClick={() => navigate('/contact')}>Contact Us</button>
             <button className="btn btn-secondary" onClick={() => navigate('/#projects')}>Back to Projects</button>
          </div>
       </div>

       {/* Content */}
       <div className="container">
          <div className="grid grid-2" style={{ gap: '60px', marginBottom: '80px' }}>
             <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>The Business Problem</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{project.problem}</p>
             </div>
             <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Our Solution</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{project.solution}</p>
             </div>
          </div>

          <div style={{ marginBottom: '80px' }}>
             <h3 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '50px' }}>Features & Modules Included</h3>
             
             <div className="grid grid-2" style={{ gap: '30px' }}>
                <div className="glass-card">
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--accent-yellow)' }}>Key Features</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     {project.features.map((f, i) => <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', background: 'var(--accent-yellow)', borderRadius: '50%' }}></div> {f}</li>)}
                  </ul>
                </div>

                <div className="glass-card">
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--accent-yellow)' }}>Pages / Modules</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     {project.modules.map((m, i) => <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', background: 'var(--accent-yellow)', borderRadius: '50%' }}></div> {m}</li>)}
                  </ul>
                </div>
             </div>
          </div>

          <div className="grid grid-2" style={{ gap: '40px', marginBottom: '80px' }}>
             <div className="glass-card">
                 <h4 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Timeline Estimate</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{project.timeline}</p>
             </div>
             <div className="glass-card">
                 <h4 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Technology Stack</h4>
                 <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {project.tech.map((t, i) => (
                       <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '15px', fontSize: '0.9rem' }}>{t}</span>
                    ))}
                 </div>
             </div>
          </div>

          <div className="glass-card" style={{ padding: '60px', textAlign: 'center', background: 'linear-gradient(to right, rgba(17,24,39,0.9), rgba(5,8,22,0.9))' }}>
             <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Want a similar project for your business?</h2>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 40px' }}>
                Share your requirement and Central Application Hub (CPH) will help you plan a website, CRM, app, SaaS software, automation workflow, or custom software based on your business needs.
             </p>
             <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => window.open('https://wa.me/917581841039', '_blank')}>WhatsApp Now</button>
                <button className="btn btn-secondary" onClick={() => window.location.href = 'mailto:sahildwivedi59@gmail.com'}>Send Email</button>
             </div>
          </div>

       </div>
    </div>
  );
}

export default ProjectMoreInfo;
