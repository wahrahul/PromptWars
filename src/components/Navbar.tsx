import React from 'react';
import { Search, Bell, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-brand">
        <LayoutDashboard className="brand-icon" />
        <span className="brand-text">Universal Bridge</span>
      </div>
      
      <div className="navbar-search">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search knowledge graph, pathways, or systems..." className="search-input" />
        </div>
      </div>
      
      <div className="navbar-actions">
        <button className="icon-btn" title="Notifications"><Bell size={18} /></button>
        <button className="user-profile-btn" title="Profile">
          <div className="avatar">
            <User size={18} color="#fff" />
          </div>
          <span className="user-name">{user?.username || 'Guest'}</span>
        </button>
        <button className="icon-btn" title="Logout" onClick={handleLogout} style={{ marginLeft: '1rem' }}>
          <LogOut size={18} color="var(--system-health)" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
