import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, CheckCircle2, Clock3, Code, Cloud, Database, Globe, Smartphone, WalletCards } from 'lucide-react';
import { services } from '../data/services';

const iconMap = {
  Bot: <Bot size={28} className="glow-text" />,
  Globe: <Globe size={28} className="glow-text" />,
  Smartphone: <Smartphone size={28} className="glow-text" />,
  Database: <Database size={28} className="glow-text" />,
  Cloud: <Cloud size={28} className="glow-text" />,
  Code: <Code size={28} className="glow-text" />
};

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card service-card premium-service-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div className="icon-box">
          {iconMap[service.icon]}
        </div>
        <span className="chip"><Clock3 size={14} /> {service.timeline}</span>
      </div>

      <h3 style={{ fontSize: '1.42rem', marginBottom: '12px' }}>{service.title}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '18px', flex: 1 }}>{service.description}</p>

      <div className="chip-row service-feature-list" style={{ marginBottom: '22px' }}>
        {service.features.map(feature => (
          <span className="chip" key={feature}><CheckCircle2 size={14} color="var(--accent-teal)" /> {feature}</span>
        ))}
      </div>

      <div className="service-upgrades">
        <p>Upgrade options</p>
        <div>
          {service.upgrades.map(upgrade => (
            <span key={upgrade}>{upgrade}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Starts from</p>
          <strong style={{ color: 'var(--accent-yellow)', fontSize: '1.12rem' }}>{service.startPrice}</strong>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/contact?service=${service.id}`)}
            style={{ padding: '10px 12px' }}
          >
            Budget <WalletCards size={16} />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/service/${service.id}`)}
            style={{ padding: '10px 12px' }}
          >
            Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const uniqueOptions = Array.from(new Set(services.flatMap(service => [service.title, ...service.features, ...service.upgrades])));

const Services = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ margin: '0 auto 16px' }}>
            <Code size={16} className="glow-text" />
            <span>Business-first development</span>
          </div>
          <h2 className="section-title">Premium Services We Provide</h2>
          <p className="section-subtitle">Pick one service or combine multiple modules into a complete digital operating system for your business.</p>
        </div>

        <div className="grid grid-3">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="all-options-panel">
          <div>
            <span className="mini-label">All service options</span>
            <h3>Choose a single build or combine modules into one complete business system.</h3>
          </div>
          <div className="option-cloud">
            {uniqueOptions.map(option => (
              <span key={option}>{option}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;