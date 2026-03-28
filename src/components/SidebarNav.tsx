import React from 'react';
import { NavLink } from 'react-router-dom';
import { Network, Database, Settings, LifeBuoy, Zap } from 'lucide-react';

const SidebarNav: React.FC = () => {
  return (
    <nav className="sidebar-nav glass-panel">
      <ul className="nav-list">
        <li>
          <NavLink to="/dashboard/overview" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Zap size={20} />
            <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/graph" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Network size={20} />
            <span>Knowledge Graph</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/hooks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Database size={20} />
            <span>System Hooks</span>
          </NavLink>
        </li>
      </ul>

      <div className="nav-bottom">
        <ul className="nav-list">
          <li className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </li>
          <li className="nav-item">
            <LifeBuoy size={20} />
            <span>Help Center</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarNav;
