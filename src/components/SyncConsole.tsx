import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Zap, Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'SYNC' | 'AI' | 'AUTH' | 'SYS';
  message: string;
}

const SyncConsole: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockMessages = [
    { type: 'SYNC', msg: 'Validating OAuth pathways for Social Bridge...' },
    { type: 'AI', msg: 'Gemini Core recalibrating neural weights...' },
    { type: 'SYS', msg: 'Government DB Handshake: 200 OK' },
    { type: 'AUTH', msg: 'Session token refreshed for current user.' },
    { type: 'SYNC', msg: 'Pushing node updates to local graph store...' },
    { type: 'SYS', msg: 'Heartbeat detected in encrypted healthcare tunnel.' },
    { type: 'AI', msg: 'Inference engine status: Optimal (1.5 Flash)' },
    { type: 'SYNC', msg: 'Cross-platform relay active: FB -> LinkedIn' },
  ];

  useEffect(() => {
    // Initial logs
    setLogs([
      { id: 'start-1', timestamp: new Date().toLocaleTimeString(), type: 'SYS', message: 'Universal Bridge Kernel Initialized.' },
      { id: 'start-2', timestamp: new Date().toLocaleTimeString(), type: 'AUTH', message: 'Secure login verified. Permissions: ADMIN.' }
    ]);

    const interval = setInterval(() => {
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: randomMsg.type as any,
        message: randomMsg.msg
      };
      setLogs(prev => [...prev.slice(-19), newLog]); // Keep last 20 logs
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SYNC': return <Zap size={12} className="text-primary" />;
      case 'AI': return <Activity size={12} className="text-accent" />;
      case 'AUTH': return <Shield size={12} style={{ color: '#10b981' }} />;
      default: return <Terminal size={12} style={{ color: '#94a3b8' }} />;
    }
  };

  return (
    <div className="glass-panel" style={{ 
      height: '160px', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      background: 'rgba(5, 5, 10, 0.8)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: '0'
    }}>
      <div style={{ 
        padding: '0.4rem 1rem', 
        background: 'rgba(255, 255, 255, 0.03)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
          <Terminal size={14} /> System Sync Console
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.65rem', color: '#10b981' }}>
          <span className="animate-pulse">● LIVE RELAY</span>
          <span style={{ color: 'var(--text-secondary)' }}>KERNEL: v1.0.4-LUNA</span>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          padding: '0.75rem 1rem', 
          overflowY: 'auto', 
          fontFamily: 'monospace', 
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}
      >
        {logs.map(log => (
          <div key={log.id} style={{ display: 'flex', gap: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
            <span style={{ color: 'rgba(255,255,255,0.2)', width: '70px', flexShrink: 0 }}>[{log.timestamp}]</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', width: '60px', flexShrink: 0, fontWeight: 700, fontSize: '0.7rem' }}>
              {getTypeIcon(log.type)} {log.type}
            </span>
            <span style={{ color: '#cbd5e1' }}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyncConsole;
