import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, LogIn } from 'lucide-react';
import Logo from '../components/Logo';
import { clearAdminSession, getAdminRecord, getAdminSession, signInAdmin } from '../utils/leadService';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const session = getAdminSession();
    if (!session?.access_token) return;

    getAdminRecord(session)
      .then(admin => {
        if (admin?.role === 'admin') navigate('/admin-dashboard', { replace: true });
      })
      .catch(() => clearAdminSession());
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const session = await signInAdmin(email.trim(), password);
      const admin = await getAdminRecord(session);

      if (!admin || admin.role !== 'admin') {
        clearAdminSession();
        setError('Access denied. This account is not registered as a CPH admin.');
        return;
      }

      navigate('/admin-dashboard', { replace: true });
    } catch {
      clearAdminSession();
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="admin-auth-page">
      <div className="admin-auth-shell">
        <div className="admin-auth-brand">
          <Logo />
          <div className="eyebrow">
            <LockKeyhole size={16} className="glow-text" />
            <span>Secure admin access</span>
          </div>
          <h1>Central Application Hub Admin Panel</h1>
          <p>Login to view and manage website enquiries. Credentials are never shown on this page.</p>
        </div>

        <form className="glass-card admin-login-card" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <p>Use your CPH admin Supabase Auth account to continue.</p>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter admin email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </label>

          {error && <div className="admin-error">{error}</div>}

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Login'} <LogIn size={18} />
          </button>

          <Link className="btn btn-secondary" to="/">
            <ArrowLeft size={18} /> Back to Website
          </Link>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;