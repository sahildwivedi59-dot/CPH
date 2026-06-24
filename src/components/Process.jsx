import React from 'react';
import { ClipboardCheck, Code2, Handshake, LifeBuoy, PenTool, SearchCheck, TestTube2 } from 'lucide-react';

const steps = [
  { title: 'Understand Your Business', text: 'We clarify your customers, workflow, goals, and current pain points.', icon: SearchCheck },
  { title: 'Plan Website / CRM / App / Software', text: 'We map the required pages, modules, data, roles, and launch scope.', icon: ClipboardCheck },
  { title: 'Design UI and Workflow', text: 'We create a clean structure that is easy for users and admins to follow.', icon: PenTool },
  { title: 'Development', text: 'We build the selected modules with responsive layouts and practical logic.', icon: Code2 },
  { title: 'Testing and Review', text: 'We check forms, pages, flows, mobile views, and content before delivery.', icon: TestTube2 },
  { title: 'Delivery', text: 'We hand over a polished launch-ready system with the agreed features.', icon: Handshake },
  { title: 'Support and Future Upgrade', text: 'We keep room for new modules, automation, dashboards, and improvements.', icon: LifeBuoy }
];

const Process = () => {
  return (
    <section id="process" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">How We Work</h2>
        <p className="section-subtitle">A structured build process keeps the project clear from first discussion to launch.</p>

        <div style={{ maxWidth: '920px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(var(--accent-yellow), var(--accent-teal), transparent)',
            zIndex: 1
          }}></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: '24px',
                marginBottom: '22px',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  background: 'var(--bg-color-light)',
                  border: '2px solid var(--accent-yellow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-yellow)',
                  flexShrink: 0,
                  boxShadow: '0 0 15px rgba(250, 204, 21, 0.2)'
                }}>
                  <Icon size={25} />
                </div>
                <div className="glass-card" style={{ flex: 1, padding: '20px 24px' }}>
                  <p style={{ color: 'var(--accent-yellow)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '5px' }}>STEP {index + 1}</p>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
