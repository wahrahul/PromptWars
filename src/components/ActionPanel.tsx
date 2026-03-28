import React, { useState } from 'react';
import type { GraphNode } from '../types';
import { Activity, ExternalLink, Network, Database, ShieldAlert, Cpu, CheckCircle, Sparkles, AlertCircle, Link2 } from 'lucide-react';
import { getAiInsight, getSynergyAnalysis } from '../lib/gemini';

interface ActionPanelProps {
  selectedNodes: GraphNode[];
}

const ActionPanel: React.FC<ActionPanelProps> = ({ selectedNodes }) => {
  const [actionState, setActionState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const getIcon = (group: string) => {
    switch (group) {
        case 'GeminiCore': return <Cpu size={18} />;
        case 'System': return <Database size={18} />;
        case 'Social': return <Network size={18} />;
        case 'KnowledgeGraph': return <Activity size={18} />;
        default: return <ShieldAlert size={18} />;
    }
  }

  // Use the primary selected node (last one clicked) for single-node actions
  const primaryNode = selectedNodes.length > 0 ? selectedNodes[selectedNodes.length - 1] : null;

  // Reset state when selection changes
  React.useEffect(() => {
    setActionState('idle');
    setAiInsight(null);
    setAiError(null);
  }, [selectedNodes.map(n => n.id).join(',')]);

  const handleAction = () => {
    setActionState('loading');
    setTimeout(() => {
      setActionState('success');
      setTimeout(() => setActionState('idle'), 3000);
    }, 1500);
  };

  const generateAiInsight = async () => {
    if (selectedNodes.length === 0) return;
    setIsAiLoading(true);
    setAiError(null);
    try {
      let insight = '';
      if (selectedNodes.length === 2) {
        insight = await getSynergyAnalysis(selectedNodes[0], selectedNodes[1]);
      } else {
        insight = await getAiInsight(primaryNode!.name, primaryNode!.group, primaryNode!.desc || '');
      }
      setAiInsight(insight);
    } catch (err: any) {
      setAiError(err.message || 'AI engine is offline.');
    } finally {
      setIsAiLoading(false);
    }
  };

  if (selectedNodes.length === 0) {
    return (
      <aside className="sidebar">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Network Operations</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select any node in the live topology to perform localized actions.</p>
        <div className="glass-panel" style={{ padding: '1.25rem', marginTop: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>System Status</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <span style={{color: '#10b981'}}>●</span> Local DB Linked
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <span style={{color: '#a855f7'}}>●</span> Auth Service Active
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <span style={{color: '#3b82f6'}}>●</span> Gemini Engine Ready
          </p>
        </div>
        <div style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
          * Tip: Use Shift + Click to select two nodes for synergy analysis.
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: primaryNode?.color || 'var(--primary-color)'
        }}>
          {getIcon(primaryNode!.group)}
        </div>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{primaryNode!.name}</h2>
      </div>

      <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
        {primaryNode!.desc}
      </p>

      {selectedNodes.length === 2 && (
        <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.25rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(59, 130, 246, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
            <Link2 size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Synergy Pairing</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#fff' }}>
            Target: <span style={{ color: selectedNodes[0].color }}>{selectedNodes[0].name}</span> + <span style={{ color: selectedNodes[1].color }}>{selectedNodes[1].name}</span>
          </p>
        </div>
      )}
      
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Properties</h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <li><strong>ID:</strong> <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>{primaryNode!.id}</span></li>
          <li><strong>Domain:</strong> <span style={{ color: primaryNode!.color }}>{primaryNode!.group}</span></li>
          <li><strong>Activity:</strong> {primaryNode!.val} nodes linked</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button 
          className={`btn ${selectedNodes.length === 2 ? 'btn-primary animate-pulse' : 'btn'}`} 
          onClick={generateAiInsight} 
          disabled={isAiLoading}
          style={{ 
            background: selectedNodes.length === 2 ? 'linear-gradient(135deg, var(--primary-color), var(--accent-color))' : 'rgba(168, 85, 247, 0.1)', 
            borderColor: selectedNodes.length === 2 ? 'none' : 'rgba(168, 85, 247, 0.3)', 
            color: selectedNodes.length === 2 ? '#fff' : 'var(--accent-color)', 
            fontWeight: 700,
            padding: '0.75rem'
          }}
        >
          {isAiLoading ? 'Synthesizing...' : <><Sparkles size={16} /> {selectedNodes.length === 2 ? 'Calculate AI Synergy' : 'AI Knowledge Insight'}</>}
        </button>

        {selectedNodes.length === 1 && (
          <button className="btn" onClick={handleAction} disabled={actionState !== 'idle'} style={{ marginTop: '0.25rem' }}>
            {actionState === 'idle' ? <><Activity size={16} /> Status Check</> : 
             actionState === 'loading' ? 'Querying...' : <><CheckCircle size={16} /> Online</>}
          </button>
        )}
      </div>

      {(aiInsight || aiError || isAiLoading) && (
        <div className="glass-panel" style={{ 
          marginTop: '1.25rem', 
          padding: '1.5rem', 
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${aiError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`, 
          background: aiError ? 'rgba(239, 68, 68, 0.05)' : 'rgba(168, 85, 247, 0.05)',
          boxShadow: aiError ? 'none' : '0 0 30px -10px rgba(168, 85, 247, 0.2)'
        }}>
          {isAiLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
              animation: 'scanLine 1.5s infinite linear'
            }} />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: aiError ? '#f87171' : 'var(--accent-color)' }}>
            {aiError ? <AlertCircle size={16} /> : <Sparkles size={16} className={isAiLoading ? 'animate-spin' : ''} />}
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {aiError ? 'Engine Error' : isAiLoading ? 'Synthesizing...' : selectedNodes.length === 2 ? 'Synergy Report' : 'Gemini Inference'}
            </span>
          </div>
          
          <div style={{ fontSize: '0.95rem', color: aiError ? '#f87171' : '#fff', lineHeight: '1.7', opacity: isAiLoading ? 0.5 : 1, transition: 'opacity 0.3s' }}>
            {isAiLoading ? 'Recalibrating quantum bridges... Analyzing social topology...' : (aiError || aiInsight)}
          </div>

          <style>{`
            @keyframes scanLine {
              0% { transform: translateY(-2px); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(200px); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </aside>
  );
};

export default ActionPanel;
