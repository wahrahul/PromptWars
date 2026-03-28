import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import NetworkGraph from '../components/NetworkGraph';
import ActionPanel from '../components/ActionPanel';
import ExportToolbar from '../components/ExportToolbar';
import type { GraphNode, GraphData } from '../types';
import { getSystemSummary } from '../lib/gemini';
import { Sparkles, Activity } from 'lucide-react';

interface DashboardContext {
  user: any;
  graphData: GraphData;
  addMockConnection: () => void;
}

const OverviewView: React.FC = () => {
  const { user, graphData, addMockConnection } = useOutletContext<DashboardContext>();
  const [selectedNodes, setSelectedNodes] = useState<GraphNode[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('Analyzing system architecture...');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      if (graphData.nodes.length === 0) return;
      setIsAiLoading(true);
      try {
        const summary = await getSystemSummary(graphData);
        setAiSummary(summary);
      } catch (err) {
        setAiSummary("AI Analysis unavailable.");
      } finally {
        setIsAiLoading(false);
      }
    };
    fetchSummary();
  }, [graphData.nodes.length]);

  const handleNodeClick = (node: GraphNode, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedNodes(prev => {
        const exists = prev.find(n => n.id === node.id);
        if (exists) return prev.filter(n => n.id !== node.id);
        if (prev.length >= 2) return [prev[1], node];
        return [...prev, node];
      });
    } else {
      setSelectedNodes([node]);
    }
  };

  return (
    <>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{user.username}'s Social Workbench</h2>
          <p>Monitor your active system connections, AI insights, and personal pathways safely stored in your DB.</p>
        </div>
        <button className="btn btn-primary" onClick={addMockConnection}>+ Sync New System</button>
      </div>
      
      <DashboardStats graphData={graphData} />

      <div className="glass-panel" style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem', 
        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          background: 'rgba(168, 85, 247, 0.1)', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--accent-color)'
        }}>
          {isAiLoading ? <Activity size={24} className="animate-pulse" /> : <Sparkles size={24} />}
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>System Intelligence Report</h4>
          <p style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 500, margin: 0 }}>
            {aiSummary}
          </p>
        </div>
        <div style={{ opacity: 0.5 }}>
          <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>MODEL: GEMINI-1.5-FLASH</span>
        </div>
      </div>
      
      <div className="workbench">
        <div className="graph-card glass-panel">
          <div className="card-header">
            <h3>Live Network Topology (Local DB)</h3>
            <ExportToolbar graphData={graphData} />
          </div>
          <div className="graph-wrapper">
            <NetworkGraph 
              data={graphData} 
              selectedNodeIds={selectedNodes.map(n => n.id)} 
              onNodeClick={handleNodeClick} 
            />
          </div>
        </div>
        
        <div className="action-card-wrapper">
            <ActionPanel selectedNodes={selectedNodes} />
        </div>
      </div>
    </>
  );
};

export default OverviewView;
