import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDemo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Project Not Found</div>;

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <div className="container" style={{ textAlign: 'center', flex: 1 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px' }}>{project.name}</h1>
          <p style={{ color: 'var(--accent-yellow)', fontSize: '1.2rem', marginBottom: '40px' }}>{project.category} - {project.status}</p>

          <div style={{
            width: '100%',
            height: '60vh',
            maxHeight: '600px',
            background: 'linear-gradient(135deg, #111827, #050816)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
          }}>
             {project.demoAvailable ? (
                <iframe title="demo" src="about:blank" style={{ width: '100%', height: '100%', border: 'none', borderRadius: '24px' }}></iframe>
             ) : (
                <>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '20px' }}>Live Demo Coming Soon</div>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '500px', textAlign: 'center' }}>
                     This project is currently in progress. Real screenshots and a live demo link will be added here once completed.
                  </p>
                </>
             )}
          </div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
             <button className="btn btn-primary" onClick={() => navigate(`/project/${project.id}/more-info`)}>Know More</button>
             <button className="btn btn-secondary" onClick={() => navigate('/#projects')}>Back to Portfolio</button>
          </div>
       </div>
    </div>
  );
};

export default ProjectDemo;
