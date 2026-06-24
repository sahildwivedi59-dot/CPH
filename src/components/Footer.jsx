import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer style={{
      background: '#02040a',
      padding: '80px 0 30px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div className="container">
        <div className="grid grid-3" style={{ marginBottom: '60px' }}>
          <div>
            <Logo />
            <p style={{ color: 'var(--text-muted)', marginTop: '20px', maxWidth: '300px' }}>
              Smart Digital Solutions for Modern Businesses
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
              <li><a href="/#services" style={{ color: 'var(--text-muted)' }}>Services</a></li>
              <li><a href="/#projects" style={{ color: 'var(--text-muted)' }}>Projects</a></li>
              <li><a href="/#pricing" style={{ color: 'var(--text-muted)' }}>Pricing</a></li>
              <li><Link to="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Admin Panel</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-muted)' }}>
              <li>Central Application Hub (CPH)</li>
              <li>Founder: Sahil Dwivedi</li>
              <li>WhatsApp: <a href="https://wa.me/917581841039" style={{ color: 'var(--accent-yellow)' }}>7581841039</a></li>
              <li>Email: <a href="mailto:sahildwivedi59@gmail.com" style={{ color: 'var(--accent-yellow)' }}>sahildwivedi59@gmail.com</a></li>
              <li>Vijay Nagar, Indore, Pincode 482010</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '30px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          &copy; {new Date().getFullYear()} Central Application Hub (CPH). All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
