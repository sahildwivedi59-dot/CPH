import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { createLead, REQUIRED_SERVICE_OPTIONS } from '../utils/leadService';

const defaultBudgetByService = {
  'AI Automation Work': 'Rs. 29,999+',
  'Website Development': 'Rs. 5,999+',
  'App Building': 'Custom Pricing',
  'CRM Development': 'Rs. 14,999+',
  'SaaS Software Development': 'Custom Pricing',
  'Custom Software Development': 'Custom Pricing'
};

const Contact = () => {
  const [selectedService, setSelectedService] = useState(() => {
    const serviceFromUrl = new URLSearchParams(window.location.search).get('service');
    const serviceMap = {
      'website-development': 'Website Development',
      'crm-development': 'CRM Development',
      'ai-automation': 'AI Automation Work',
      'app-building': 'App Building',
      'saas-software': 'SaaS Software Development',
      'custom-software': 'Custom Software Development'
    };
    return serviceMap[serviceFromUrl] || '';
  });
  const [budget, setBudget] = useState(selectedService ? defaultBudgetByService[selectedService] : '');
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceChange = (serviceName) => {
    setSelectedService(serviceName);
    setBudget(defaultBudgetByService[serviceName] || '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!selectedService) {
      setSubmitStatus({ type: 'error', message: 'Please select a required service.' });
      return;
    }

    const formData = new FormData(form);
    const lead = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim() || null,
      phone: String(formData.get('phone') || '').trim(),
      business_type: String(formData.get('businessType') || '').trim() || null,
      required_service: selectedService,
      budget,
      project_requirement: String(formData.get('requirement') || '').trim()
    };

    setIsSubmitting(true);
    setSubmitStatus({ type: 'saving', message: 'Submitting your requirement...' });

    try {
      await createLead(lead);
      setSubmitStatus({ type: 'success', message: 'Requirement submitted successfully!' });
      form?.reset?.();
      setSelectedService('');
      setBudget('');
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your requirement could not be submitted. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
          gap: '60px',
          alignItems: 'center'
        }} className="grid-2">
          <div>
            <div className="eyebrow" style={{ marginBottom: '18px' }}>
              <MessageCircle size={16} className="glow-text" />
              <span>Quick project inquiry</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.15' }}>Start Your <span className="glow-text">Digital Project</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '34px' }}>
              Share what you want to build. CPH can help plan your website, CRM, app, SaaS product, dashboard, or automation workflow from idea to launch.
            </p>

            <div style={{ display: 'grid', gap: '16px' }}>
              <InfoRow icon={<Phone size={20} className="glow-text" />} label="Phone / WhatsApp" value={<a href="https://wa.me/917581841039" target="_blank" rel="noreferrer" style={{ color: 'white' }}>7581841039</a>} />
              <InfoRow icon={<Mail size={20} className="glow-text" />} label="Email" value={<a href="mailto:sahildwivedi59@gmail.com" style={{ color: 'white' }}>sahildwivedi59@gmail.com</a>} />
              <InfoRow icon={<MapPin size={20} className="glow-text" />} label="Location" value="Vijay Nagar, Indore - 482010" />
            </div>
          </div>

          <div className="glass-card" style={{ padding: '34px' }}>
            <h3 style={{ fontSize: '1.45rem', marginBottom: '8px' }}>Send an Inquiry</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '26px' }}>Submit your requirement and the CPH team will contact you soon.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2">
                <input name="name" type="text" placeholder="Name" required style={inputStyle} />
                <input name="email" type="email" placeholder="Email" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2">
                <input name="phone" type="tel" placeholder="Phone / WhatsApp" required style={inputStyle} />
                <input name="businessType" type="text" placeholder="Business Type" style={inputStyle} />
              </div>

              <div>
                <p style={{ color: 'var(--accent-yellow)', fontSize: '0.9rem', fontWeight: '800', marginBottom: '10px' }}>Required Service</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }} className="grid-2">
                  {REQUIRED_SERVICE_OPTIONS.map(service => {
                    const isSelected = service === selectedService;
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceChange(service)}
                        style={{
                          ...serviceButtonStyle,
                          borderColor: isSelected ? 'var(--accent-yellow)' : 'rgba(255,255,255,0.1)',
                          background: isSelected ? 'rgba(250, 204, 21, 0.12)' : 'rgba(255,255,255,0.04)',
                          boxShadow: isSelected ? '0 0 18px rgba(250, 204, 21, 0.18)' : 'none'
                        }}
                      >
                        <span style={{ color: 'var(--accent-yellow)', fontWeight: '800' }}>{service}</span>
                        <span style={{ color: 'var(--accent-yellow)', fontWeight: '700' }}>{defaultBudgetByService[service]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea name="requirement" placeholder="Project Requirement" rows={4} required style={inputStyle}></textarea>

              {submitStatus.message && (
                <p style={{
                  color: submitStatus.type === 'error' ? '#FB7185' : submitStatus.type === 'success' ? 'var(--accent-green)' : 'var(--accent-yellow)',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  {submitStatus.message}
                </p>
              )}

              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: '6px', fontSize: '1.05rem', opacity: isSubmitting ? 0.72 : 1 }}>
                {isSubmitting ? 'Submitting...' : 'Submit Requirement'} <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px' }}>
    <div className="icon-box" style={{ width: '44px', height: '44px' }}>{icon}</div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      <p style={{ fontWeight: '700' }}>{value}</p>
    </div>
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '15px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s ease'
};

const serviceButtonStyle = {
  width: '100%',
  minHeight: '78px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '12px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
  transition: 'all 0.25s ease'
};

export default Contact;

