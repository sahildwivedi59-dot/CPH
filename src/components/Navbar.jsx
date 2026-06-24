import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from './Logo';

const navItems = [
  { label: 'Home', sectionId: 'home' },
  { label: 'Services', sectionId: 'services' },
  { label: 'Solutions', sectionId: 'solutions' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Process', sectionId: 'process' },
  { label: 'Pricing', sectionId: 'pricing' },
  { label: 'About', sectionId: 'about' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToContact = () => {
    setIsOpen(false);
    navigate('/contact');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="brand-link">
          <Logo />
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <a
              href={`#${item.sectionId}`}
              key={item.sectionId}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.sectionId);
              }}
            >
              {item.label}
            </a>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

          {isOpen && (
            <button className="btn btn-primary nav-mobile-cta" onClick={goToContact}>
              Start Project <ArrowRight size={16} />
            </button>
          )}
        </div>

        <div className="desktop-btn">
          <button className="btn btn-primary nav-cta" onClick={goToContact}>
            Start Project <ArrowRight size={16} />
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;