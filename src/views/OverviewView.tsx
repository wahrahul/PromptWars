import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import NetworkGraph from '../components/NetworkGraph';
import ActionPanel from '../components/ActionPanel';
import ExportToolbar from '../components/ExportToolbar';
import type { GraphNode, GraphData } from '../types';

interface DashboardContext {
  user: any;
  graphData: GraphData;
  addMockConnection: () => void;
}

const OverviewView: React.FC = () => {
  const { user, graphData, addMockConnection } = useOutletContext<DashboardContext>();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
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
      
      <div className="workbench">
        <div className="graph-card glass-panel">
          <div className="card-header">
            <h3>Live Network Topology (Local DB)</h3>
            <ExportToolbar graphData={graphData} />
          </div>
          <div className="graph-wrapper">
            <NetworkGraph data={graphData} onNodeClick={handleNodeClick} />
          </div>
        </div>
        
        <div className="action-card-wrapper">
            <ActionPanel selectedNode={selectedNode} />
        </div>
      </div>
    </>
  );
};

export default OverviewView;
