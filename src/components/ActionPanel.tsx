import React, { useState } from 'react';
import type { GraphNode } from '../types';
import { Activity, ExternalLink, Network, Database, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

interface ActionPanelProps {
  selectedNode: GraphNode | null;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ selectedNode }) => {
  const [actionState, setActionState] = useState<'idle' | 'loading' | 'success'>('idle');

  const getIcon = (group: string) => {
    switch (group) {
        case 'GeminiCore': return <Cpu className="inline-block mb-1" />;
        case 'System': return <Database className="inline-block mb-1" />;
        case 'Social': return <Network className="inline-block mb-1" />;
        case 'KnowledgeGraph': return <Activity className="inline-block mb-1" />;
        default: return <ShieldAlert className="inline-block mb-1" />;
    }
  }

  // Reset action state when a new node is clicked
  React.useEffect(() => {
    setActionState('idle');
  }, [selectedNode?.id]);

  const handleAction = () => {
    setActionState('loading');
    setTimeout(() => {
      setActionState('success');
      setTimeout(() => setActionState('idle'), 3000);
    }, 1500);
  };

  if (!selectedNode) {
    return (
      <aside className="sidebar">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Network Operations</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select any node in the live topology to perform localized actions.</p>
        <div className="glass-panel" style={{ padding: '1rem', marginTop: '1.5rem' }}>
          <h4>System Status</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            <span style={{color: '#10b981'}}>●</span> Local DB Linked
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
            <span style={{color: '#a855f7'}}>●</span> Auth Service Active
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <h2>{getIcon(selectedNode.group)} {selectedNode.name}</h2>
      <p style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{selectedNode.desc}</p>
      
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <h4>Node Properties</h4>
        <ul style={{ listStyle: 'none', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <li style={{ padding: '0.25rem 0' }}><strong>ID:</strong> <span style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>{selectedNode.id}</span></li>
          <li style={{ padding: '0.25rem 0' }}><strong>Type:</strong> <span style={{ color: selectedNode.color || 'var(--primary-color)' }}>{selectedNode.group}</span></li>
          <li style={{ padding: '0.25rem 0' }}><strong>Weight:</strong> {selectedNode.val}</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {selectedNode.group === 'Social' && (
          <button className="btn btn-primary" onClick={handleAction} disabled={actionState !== 'idle'}>
            {actionState === 'idle' ? <><ExternalLink size={16} /> Connect API Endpoint</> : 
             actionState === 'loading' ? 'Authenticating...' : <><CheckCircle size={16} /> Sync Verified</>}
          </button>
        )}
        {(selectedNode.group === 'System' || selectedNode.group === 'User') && (
          <button className="btn btn-primary" onClick={handleAction} disabled={actionState !== 'idle'}>
            {actionState === 'idle' ? <><Activity size={16} /> Check Status Ping</> : 
             actionState === 'loading' ? 'Querying Data Store...' : <><CheckCircle size={16} /> Node Active 200 OK</>}
          </button>
        )}
        {selectedNode.group === 'GeminiCore' && (
          <button className={`btn btn-primary ${actionState === 'idle' ? 'animate-pulse' : ''}`} onClick={handleAction} disabled={actionState !== 'idle'}>
            {actionState === 'idle' ? <><Cpu size={16} /> Re-calibrate Weights</> : 
             actionState === 'loading' ? 'Processing Inference...' : <><CheckCircle size={16} /> Weights Aligned</>}
          </button>
        )}
      </div>
    </aside>
  );
};

export default ActionPanel;
