import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Solutions from '../components/Solutions';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Solutions />
      <Projects />
      <Process />
      <Pricing />
      <About />
      <WhyChooseUs />
      <Contact />
    </div>
  );
};

export default Home;
