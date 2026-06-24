import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, Layers3, MonitorSmartphone } from 'lucide-react';
import { projects } from '../data/projects';

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card project-card">
      <div className="project-visual">
        <div className="project-status">{project.status}</div>
        <div className="mock-screen" aria-hidden="true">
          <header>
            <span className="mock-line gold" style={{ width: '44%' }}></span>
            <span className="mock-line" style={{ width: '24%' }}></span>
          </header>
          <span className="mock-line" style={{ width: '78%' }}></span>
          <span className="mock-line" style={{ width: '58%' }}></span>
          <div className="mock-cards">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ color: 'var(--accent-yellow)', fontSize: '0.82rem', fontWeight: '700', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {project.category}
        </p>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>{project.name}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', flex: 1, fontSize: '0.95rem' }}>
          {project.shortDescription}
        </p>

        <div className="chip-row" style={{ marginBottom: '22px' }}>
          {project.features.slice(0, 3).map(feature => (
            <span className="chip" key={feature}>{feature}</span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/project/${project.id}/demo`)}
            style={{ padding: '10px' }}
          >
            Demo <ExternalLink size={15} />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/project/${project.id}/more-info`)}
            style={{ padding: '10px' }}
          >
            More <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const featured = projects.slice(0, 6);

  return (
    <section id="projects" className="section section-band">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ margin: '0 auto 16px' }}>
            <MonitorSmartphone size={16} className="glow-text" />
            <span>Project ideas ready for real businesses</span>
          </div>
          <h2 className="section-title">Project Showcase</h2>
          <p className="section-subtitle">Explore website, CRM, app, SaaS, automation, and custom software concepts that can be adapted for your industry.</p>
        </div>

        <div className="grid grid-3">
          {featured.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="cta-panel" style={{ marginTop: '42px', padding: '34px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <Layers3 size={24} className="glow-text" />
              <h3 style={{ fontSize: '1.45rem' }}>Need a different business system?</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>CPH can plan custom modules for booking, billing, staff, leads, reports, customer portals, and automation workflows.</p>
          </div>
          <button className="btn btn-primary" onClick={() => window.location.href = '/contact'}>
            Discuss Requirement <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
