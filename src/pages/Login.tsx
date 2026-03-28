import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { LayoutDashboard } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = await api.getUser(username);
      if (users.length && users[0].password === password) {
        login({ id: users[0].id, username: users[0].username });
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Error connecting to database');
    }
  };

  return (
    <div className="layout" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <LayoutDashboard size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          <h2>Welcome Back</h2>
          <p>Login to Universal Social Bridge</p>
        </div>
        
        {error && <div style={{ color: 'var(--system-health)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Username</label>
            <input 
              type="text" 
              value={username} onChange={e => setUsername(e.target.value)} required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }}>Sign In</button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary-hover)', textDecoration: 'none' }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
