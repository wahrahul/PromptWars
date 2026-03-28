import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NetworkGraph from '../components/NetworkGraph';
import ActionPanel from '../components/ActionPanel';
import ExportToolbar from '../components/ExportToolbar';
import FileConverter from '../components/FileConverter';
import { api } from '../utils/api';
import type { GraphNode, GraphData } from '../types';

interface DashboardContext {
  graphData: GraphData;
  setGraphData: (data: GraphData) => void;
  dbRecordId: string;
}

const GraphView: React.FC = () => {
  const { graphData, setGraphData, dbRecordId } = useOutletContext<DashboardContext>();
  const [selectedNodes, setSelectedNodes] = React.useState<GraphNode[]>([]);

  const handleNodeClick = (node: GraphNode, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedNodes(prev => {
        const exists = prev.find(n => n.id === node.id);
        if (exists) return prev.filter(n => n.id !== node.id);
        if (prev.length >= 2) return [prev[1], node]; // Max 2 for synergy
        return [...prev, node];
      });
    } else {
      setSelectedNodes([node]);
    }
  };

  const clearSelection = () => setSelectedNodes([]);

  const handleDataConverted = async (newNodes: GraphNode[]) => {
    if (!graphData || !dbRecordId) return;

    // Build automated links for new nodes (connecting them to the root user)
    const rootNode = graphData.nodes.find(n => n.group === 'User');
    
    // Clean up D3 object mutations back to pure string IDs before saving
    const sanitizedLinks = graphData.links.map((link: any) => ({
      ...link,
      source: typeof link.source === 'object' ? link.source.id : link.source,
      target: typeof link.target === 'object' ? link.target.id : link.target
    }));

    const newLinks = newNodes.map(node => ({
      source: rootNode ? rootNode.id : 'user_demo',
      target: node.id,
      label: 'Imported Bridge'
    }));

    const updatedGraph = {
      nodes: [...graphData.nodes, ...newNodes],
      links: [...sanitizedLinks, ...newLinks]
    };

    // Update Local JSON Server
    await api.updateGraphData(dbRecordId, updatedGraph);
    setGraphData(updatedGraph);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div className="content-header" style={{ marginBottom: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Immersive Knowledge Graph</h2>
          <p>Multi-select nodes (Shift+Click) to calculate AI Synergy Pathways.</p>
        </div>
        {selectedNodes.length > 0 && (
          <button className="btn" onClick={clearSelection} style={{ fontSize: '0.7rem' }}>Clear Selection ({selectedNodes.length})</button>
        )}
      </div>

      <div className="workbench" style={{ flex: 1, minHeight: 0 }}>
        <div className="graph-card glass-panel" style={{ flex: 4 }}>
          <div className="center-header" style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Topology Explorer</h3>
            <ExportToolbar graphData={graphData} />
          </div>
          <div className="graph-wrapper" style={{ height: 'calc(100% - 50px)' }}>
            <NetworkGraph 
              data={graphData} 
              selectedNodeIds={selectedNodes.map(n => n.id)} 
              onNodeClick={handleNodeClick} 
            />
          </div>
        </div>

        <div className="action-card-wrapper" style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FileConverter onDataConverted={handleDataConverted} />
          <ActionPanel selectedNodes={selectedNodes} />
        </div>
      </div>
    </div>
  );
};

export default GraphView;
