import React from 'react';
import { useOutletContext } from 'react-router-dom';
import type { GraphData } from '../types';
import { Database, Activity, ShieldAlert } from 'lucide-react';

interface DashboardContext {
  graphData: GraphData;
}

const SystemHooksView: React.FC = () => {
  const { graphData } = useOutletContext<DashboardContext>();

  // Filter only 'System' nodes
  const systemNodes = graphData.nodes.filter(n => n.group === 'System');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="content-header">
        <h2>Active System Hooks</h2>
        <p>A tabular overview of all external APIs and government services currently tethered to your profile.</p>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>System Identity</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Type</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {systemNodes.map((sys, idx) => (
              <tr key={sys.id} style={{ borderBottom: idx < systemNodes.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Database size={16} color="var(--system-gov)" />
                  <span style={{ fontWeight: 500 }}>{sys.name}</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}><span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>REST API</span></td>
                <td style={{ padding: '1rem' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#3b82f6', fontSize: '0.9rem' }}><Activity size={14}/> Active Sync</span></td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>{sys.desc}</td>
              </tr>
            ))}
            {systemNodes.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <ShieldAlert size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p>No external systems currently hooked into your profile.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemHooksView;
