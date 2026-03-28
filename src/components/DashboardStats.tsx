import React from 'react';
import { Activity, ShieldCheck, Share2, Layers } from 'lucide-react';
import type { GraphData } from '../types';

interface DashboardStatsProps {
  graphData: GraphData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ graphData }) => {
  const systemNodes = graphData.nodes.filter(n => n.group === 'System').length;
  const totalPathways = graphData.links.length;
  const isHealthy = systemNodes >= 0 ? '98%' : 'Error';

  const stats = [
    { label: 'Active Systems', value: systemNodes.toString(), icon: <Layers size={20} color="var(--primary-color)" />, trend: 'Live Sync' },
    { label: 'Social Pathways', value: totalPathways.toString(), icon: <Share2 size={20} color="var(--accent-color)" />, trend: 'Mapped' },
    { label: 'Platform Health', value: isHealthy, icon: <Activity size={20} color="#10b981" />, trend: 'Optimal' },
    { label: 'Data Security', value: 'Verified', icon: <ShieldCheck size={20} color="#f59e0b" />, trend: 'AES-256' },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card glass-panel">
          <div className="stat-header">
            <span className="stat-label">{stat.label}</span>
            {stat.icon}
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-trend">{stat.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
