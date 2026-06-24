import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, LogIn } from 'lucide-react';
import Logo from '../components/Logo';
import { clearAdminSession, getAdminRecord, getAdminSession, signInAdmin } from '../utils/leadService';

const ADMIN_EMAIL = 'sahildwivedi59@gmail.com';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
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
        setError('Access denied. This email is not registered as a CPH admin in Supabase.');
        return;
      }

      navigate('/admin-dashboard', { replace: true });
    } catch {
      clearAdminSession();
      setError('Invalid admin email or password. Please check the Supabase Auth user credentials.');
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
          <p>Login with the CPH admin Supabase Auth account to view and manage website enquiries.</p>
        </div>

        <form className="glass-card admin-login-card" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <p>Admin email is set to {ADMIN_EMAIL}. Use the password configured for this user in Supabase Auth.</p>

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
              placeholder="Enter admin password"
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
