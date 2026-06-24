import React, { useEffect } from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       <Contact />
    </div>
  );
};

export default ContactPage;
