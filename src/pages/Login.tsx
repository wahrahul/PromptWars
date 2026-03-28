import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { LayoutDashboard } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await api.getAllUsers();
        setAllUsers(users);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      background: '#050505',
      backgroundImage: `
        radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)
      `,
      fontFamily: 'var(--font-family)'
    }}>
      <div className="glass-panel" style={{ 
        padding: '3.5rem 3rem', 
        width: '100%', 
        maxWidth: '440px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem',
        animation: 'fadeIn 0.6s ease-out',
        background: 'rgba(15, 15, 25, 0.7)',
        backdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '72px', 
            height: '72px', 
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', 
            borderRadius: '22px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
          }}>
            <LayoutDashboard size={36} color="#fff" />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.04em', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>PromptWars</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1rem' }}>Enter the Universal Social Bridge</p>
        </div>
        
        {error && (
          <div style={{ 
            color: '#f87171', 
            background: 'rgba(239, 68, 68, 0.1)', 
            padding: '0.75rem', 
            borderRadius: '10px', 
            textAlign: 'center', 
            fontSize: '0.9rem',
            border: '1px solid rgba(239, 68, 68, 0.2)' 
          }}>{error}</div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.02em' }}>Username</label>
            <input 
              type="text" 
              value={username} onChange={e => setUsername(e.target.value)} required
              placeholder="Enter your handle"
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.02em' }}>Password</label>
            <input 
              type="password" 
              value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', fontWeight: 700, borderRadius: '12px', fontSize: '1rem', letterSpacing: '0.01em' }}>Sign In</button>
        </form>

        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Quick Access</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {allUsers.map(user => (
              <button 
                key={user.id}
                type="button"
                onClick={(e) => { 
                  e.preventDefault();
                  setUsername(user.username); 
                  setPassword(user.password); 
                }}
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  background: 'rgba(255,255,255,0.02)', 
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: user.id === 'user_1' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 700, color: user.id === 'user_1' ? '#3b82f6' : '#a855f7', justifyContent: 'center' }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.username}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{user.id === 'user_1' ? 'Admin' : 'Tester'}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>Join Nebula</Link>
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
