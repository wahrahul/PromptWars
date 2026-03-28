import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = await api.getUser(username);
      if (existing.length > 0) {
        return setError('Username already taken');
      }

      // Create new user
      const newUser = await api.createUser({
        id: crypto.randomUUID(),
        username,
        password
      });

      // Initialize empty graph layout specifically for them
      await api.createGraphData({
        id: crypto.randomUUID(),
        userId: newUser.id,
        nodes: [
            { id: 'user_node', name: `${username}'s Network`, group: 'User', val: 8, color: '#f0f6fc', desc: 'Starting Node' }
        ],
        links: []
      });

      // Log them in immediately
      login({ id: newUser.id, username: newUser.username });
      navigate('/dashboard');

    } catch (err) {
      setError('Registration failed due to network error.');
    }
  };

  return (
    <div className="layout" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <LayoutDashboard size={48} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
          <h2>Create Account</h2>
          <p>Join the Universal Social Bridge</p>
        </div>
        
        {error && <div style={{ color: 'var(--system-health)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }}>Create Database Profile</button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-hover)', textDecoration: 'none' }}>Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
