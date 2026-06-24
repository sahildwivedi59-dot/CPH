import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectMoreInfo from './pages/ProjectMoreInfo';
import ProjectDemo from './pages/ProjectDemo';
import ServiceDetails from './pages/ServiceDetails';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const adminRoutes = ['/admin', '/admin-login', '/admin-dashboard'];

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = adminRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id/more-info" element={<ProjectMoreInfo />} />
          <Route path="/project/:id/demo" element={<ProjectDemo />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
