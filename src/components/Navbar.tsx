import { Search, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const { notifications, clearNotifications } = useNotification();

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
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button className="icon-btn" title="Acknowledge Notifications" onClick={clearNotifications}>
            <span className="material-icons" style={{ fontSize: '20px' }}>notifications</span>
          </button>
          {notifications.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: '#ef4444',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 800,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-color)',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
            }}>
              {notifications.length}
            </span>
          )}
        </div>
        <button className="user-profile-btn" title="Profile">
          <div className="avatar">
            <User size={18} color="#fff" />
          </div>
          <span className="user-name">{user?.username || 'Guest'}</span>
        </button>
        <button className="icon-btn" title="Logout" onClick={onLogout} style={{ marginLeft: '1rem' }}>
          <LogOut size={18} color="#f87171" style={{ transition: 'all 0.2s', filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.2))' }} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
