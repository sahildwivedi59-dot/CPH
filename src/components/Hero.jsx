import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Cloud, Database, LayoutDashboard, MessageSquareText, Rocket, ShieldCheck, Smartphone, Sparkles, Workflow } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section premium-hero">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={16} className="glow-text" />
              <span>Websites / CRM / Apps / AI automation / SaaS</span>
            </div>

            <h1 className="hero-title">
              Premium digital systems for serious <span className="glow-text">business growth</span>
            </h1>

            <p className="hero-lead">
              Central Application Hub (CPH) designs modern websites, CRM systems, mobile apps, dashboards, automation workflows, and custom software that help teams capture leads, reduce manual work, and scale faster.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/contact')}>
                Start Your Project <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary" onClick={scrollToProjects}>
                View Projects
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-tile">
                <strong>10+</strong>
                <span>Business systems covered</span>
              </div>
              <div className="stat-tile">
                <strong>3-10</strong>
                <span>Days for starter websites</span>
              </div>
              <div className="stat-tile">
                <strong>24/7</strong>
                <span>Automation-ready workflows</span>
              </div>
            </div>
          </div>

          <div className="dashboard-showcase effect-3d">
            <div className="dashboard-card premium-console">
              <div className="dashboard-topbar">
                <div className="window-dots">
                  <span style={{ background: '#EF4444' }}></span>
                  <span style={{ background: '#F59E0B' }}></span>
                  <span style={{ background: '#22C55E' }}></span>
                </div>
                <div className="mock-pill">CPH Business Console</div>
              </div>

              <div className="hero-logo-panel">
                <img src="/cph-logo.jpeg" alt="Central Application Hub logo" />
                <div>
                  <span>Central Application Hub</span>
                  <strong>One premium place for websites, CRM, apps, SaaS, and automation</strong>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="mini-panel">
                  <p className="mini-label">Lead pipeline</p>
                  <div className="pipeline-list">
                    <div className="pipeline-row"><span>New inquiries</span><strong>48</strong></div>
                    <div className="pipeline-row"><span>Follow-ups</span><strong>19</strong></div>
                    <div className="pipeline-row"><span>Converted</span><strong>12</strong></div>
                    <div className="pipeline-row"><span>Automated alerts</span><strong>31</strong></div>
                  </div>
                </div>

                <div className="mini-panel">
                  <p className="mini-label">Weekly performance</p>
                  <div className="chart-bars" aria-hidden="true">
                    {[42, 64, 48, 82, 58, 90, 74].map((height, index) => (
                      <span key={index} style={{ height: `${height}%` }}></span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="workflow-row">
                <div className="workflow-step">
                  <MessageSquareText size={22} className="glow-text" />
                  <strong>Capture inquiry</strong>
                </div>
                <div className="workflow-step">
                  <Workflow size={22} className="glow-text" />
                  <strong>Trigger workflow</strong>
                </div>
                <div className="workflow-step">
                  <LayoutDashboard size={22} className="glow-text" />
                  <strong>Track results</strong>
                </div>
              </div>
            </div>

            <FloatingCard icon={<Database size={20} className="glow-text" />} title="CRM" style={{ top: '18px', left: '-18px' }} />
            <FloatingCard icon={<Bot size={20} className="glow-text" />} title="AI Automation" style={{ top: '124px', right: '-28px' }} />
            <FloatingCard icon={<Smartphone size={20} className="glow-text" />} title="Mobile App" style={{ bottom: '72px', left: '-10px' }} />
            <FloatingCard icon={<Cloud size={20} className="glow-text" />} title="SaaS" style={{ bottom: '18px', right: '34px' }} />
          </div>
        </div>

        <div className="trust-strip">
          <div className="trust-item"><Rocket size={22} className="glow-text" /> Fast launch planning</div>
          <div className="trust-item"><ShieldCheck size={22} className="glow-text" /> Secure admin structure</div>
          <div className="trust-item"><Workflow size={22} className="glow-text" /> Automation-ready builds</div>
          <div className="trust-item"><LayoutDashboard size={22} className="glow-text" /> Clear business dashboards</div>
        </div>
      </div>
    </section>
  );
};

const FloatingCard = ({ icon, title, style }) => (
  <div className="glass-card floating floating-card" style={style}>
    {icon}
    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{title}</span>
  </div>
);

export default Hero;