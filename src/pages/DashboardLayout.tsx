import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import SidebarNav from '../components/SidebarNav';
import SyncConsole from '../components/SyncConsole';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { api } from '../utils/api';
import type { GraphNode, GraphData } from '../types';
import { LogOut } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [dbRecordId, setDbRecordId] = useState<string>('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load user's private graph data from Local JSON Server
    api.getGraphData(user.id).then((records) => {
      if (records && records.length > 0) {
        setDbRecordId(records[0].id);
        const { id, userId, ...coreData } = records[0];
        setGraphData(coreData);
        
        // Trigger Quantum Handshake Notifications
        setTimeout(() => addNotification("Bridge Handshake with Google Cloud Run successful.", "success"), 800);
        setTimeout(() => addNotification("Gemini 1.5 Flash service initialized.", "info"), 1600);
        setTimeout(() => addNotification("Universal Social Bridge Kernel is now online.", "success"), 2400);
      } else {
        // Fallback or empty state
        setGraphData({ nodes: [], links: [] });
      }
    });
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const addMockConnection = async () => {
    if (!graphData || !dbRecordId) return;
    
    // Demonstrate CRUD UPDATE operation
    const newNode: GraphNode = {
      id: `sys_${Date.now()}`,
      name: `Integrations API ${Math.floor(Math.random() * 100)}`,
      group: 'System',
      val: 6,
      color: '#f59e0b',
      desc: 'Dynamically generated linked node via local database.'
    };
    
    // Find the current root user node
    const rootNode = graphData.nodes.find(n => n.group === 'User');
    
    // Clean up D3 object mutations back to pure string IDs before saving
    const sanitizedLinks = graphData.links.map((link: any) => ({
      ...link,
      source: typeof link.source === 'object' ? link.source.id : link.source,
      target: typeof link.target === 'object' ? link.target.id : link.target
    }));
    
    const newGraph = {
      nodes: [...graphData.nodes, newNode],
      links: [...sanitizedLinks, { source: rootNode ? rootNode.id : 'user_demo', target: newNode.id, label: 'Linked API' }]
    };

    // Update Local JSON Server
    await api.updateGraphData(dbRecordId, newGraph);
    setGraphData(newGraph);
  };

  if (!user || !graphData) {
    return <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading Private Dashboard...</div>;
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar />
      <Navbar onLogout={() => setShowLogoutConfirm(true)} />
      <div className="app-body" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SidebarNav />
        <main className="dashboard-content" style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet context={{ user, graphData, setGraphData, addMockConnection, dbRecordId }} />
        </main>
      </div>
      <SyncConsole />

      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(16px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="glass-panel" style={{
            padding: '3rem',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            background: 'rgba(10, 10, 20, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 32px 128px rgba(0, 0, 0, 0.8)',
            animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#ef4444',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
            }}>
              <LogOut size={32} />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Secure Termination</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', fontSize: '1.05rem' }}>
              Are you sure you want to end your current session? This will disconnect your terminal from the bridge.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="btn"
                style={{ flex: 1, padding: '1rem', fontWeight: 600 }}
              >
                Abort
              </button>
              <button 
                onClick={handleLogout}
                className="btn btn-primary"
                style={{ flex: 1, padding: '1rem', background: '#ef4444', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)' }}
              >
                Confirm Exit
              </button>
            </div>
          </div>
          <style>{`
            @keyframes scaleUp {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
