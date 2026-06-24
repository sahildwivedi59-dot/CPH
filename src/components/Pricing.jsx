import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Gem, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic Website',
    price: 'Rs. 5,999',
    tag: 'Starter launch',
    features: ['1-3 page website', 'Mobile responsive design', 'Contact section', 'WhatsApp button', 'Basic SEO setup']
  },
  {
    name: 'Business Website',
    price: 'Rs. 9,999',
    tag: 'Most popular',
    features: ['5-7 page website', 'Service pages', 'Gallery / portfolio', 'Contact form', 'Google map section'],
    highlight: true
  },
  {
    name: 'CRM System',
    price: 'Rs. 14,999',
    tag: 'Lead tracking',
    features: ['Lead management', 'Customer details', 'Follow-up status', 'Simple dashboard', 'Admin panel concept']
  },
  {
    name: 'AI Automation',
    price: 'Rs. 29,999',
    tag: 'Workflow engine',
    features: ['Workflow automation', 'Lead alerts', 'Task automation', 'Report automation', 'Custom business logic']
  },
  {
    name: 'Custom SaaS / Software',
    price: 'Custom',
    tag: 'Built to scope',
    features: ['User login', 'Admin dashboard', 'Database', 'Subscription-ready structure', 'Custom modules']
  }
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="section" style={{ background: 'var(--bg-color-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ margin: '0 auto 16px' }}>
            <Gem size={16} className="glow-text" />
            <span>Clear starting packages</span>
          </div>
          <h2 className="section-title">Starting Pricing</h2>
          <p className="section-subtitle">Transparent entry prices for professional digital solutions. Final scope is shaped around features, integrations, and timeline.</p>
        </div>

        <div className="grid grid-3" style={{ alignItems: 'stretch' }}>
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`glass-card ${plan.highlight ? 'effect-3d' : ''}`} style={{
              padding: '34px 28px',
              border: plan.highlight ? '1px solid var(--accent-yellow)' : '1px solid var(--glass-border)',
              boxShadow: plan.highlight ? 'var(--shadow-glow-strong)' : 'none',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {plan.highlight && (
                 <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'var(--accent-yellow)',
                    color: '#000',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    fontSize: '0.74rem',
                    fontWeight: '800'
                 }}>RECOMMENDED</div>
              )}

              <span className="chip" style={{ width: 'fit-content', marginBottom: '18px' }}><Sparkles size={14} /> {plan.tag}</span>
              <h3 style={{ fontSize: '1.42rem', marginBottom: '10px', paddingRight: plan.highlight ? '92px' : 0 }}>{plan.name}</h3>
              <div style={{ fontSize: '2.1rem', fontWeight: '800', marginBottom: '26px', color: plan.highlight ? 'var(--accent-yellow)' : 'white' }}>
                {plan.price === 'Custom' ? 'Custom' : <>{plan.price}</>}
              </div>

              <ul style={{ marginBottom: '30px', flex: 1 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: 'var(--text-muted)' }}>
                    <Check size={18} color="var(--accent-yellow)" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
                onClick={() => navigate('/contact')}
              >
                Inquire Now <ArrowRight size={17} />
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '42px', color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '860px', marginLeft: 'auto', marginRight: 'auto' }}>
          Final pricing depends on pages, CRM complexity, automation level, app requirements, SaaS modules, integrations, and custom software needs.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
