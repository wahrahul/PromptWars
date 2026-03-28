import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidebarNav from '../components/SidebarNav';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import type { GraphNode, GraphData } from '../types';

const DashboardLayout: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [dbRecordId, setDbRecordId] = useState<string>('');
  const { user } = useAuth();
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
      } else {
        // Fallback or empty state
        setGraphData({ nodes: [], links: [] });
      }
    });
  }, [user, navigate]);


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
    <div className="app-container">
      <Navbar />
      <div className="app-body">
        <SidebarNav />
        <main className="dashboard-content">
          <Outlet context={{ user, graphData, addMockConnection }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
