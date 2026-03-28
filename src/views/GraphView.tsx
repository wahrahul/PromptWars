import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NetworkGraph from '../components/NetworkGraph';
import ActionPanel from '../components/ActionPanel';
import ExportToolbar from '../components/ExportToolbar';
import type { GraphNode, GraphData } from '../types';

interface DashboardContext {
  graphData: GraphData;
}

const GraphView: React.FC = () => {
  const { graphData } = useOutletContext<DashboardContext>();
  const [selectedNode, setSelectedNode] = React.useState<GraphNode | null>(null);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div className="content-header" style={{ marginBottom: '0' }}>
        <h2>Immersive Knowledge Graph</h2>
        <p>A pure, unbroken view of your interconnected semantic network and ecosystem branches.</p>
      </div>

      <div className="workbench" style={{ flex: 1, minHeight: 0 }}>
        <div className="graph-card glass-panel" style={{ flex: 4 }}>
          <div className="card-header">
            <h3>Topology Explorer</h3>
            <ExportToolbar graphData={graphData} />
          </div>
          <div className="graph-wrapper" style={{ height: 'calc(100% - 60px)' }}>
            <NetworkGraph data={graphData} onNodeClick={handleNodeClick} />
          </div>
        </div>

        <div className="action-card-wrapper" style={{ flex: 1.5 }}>
          <ActionPanel selectedNode={selectedNode} />
        </div>
      </div>
    </div>
  );
};

export default GraphView;
