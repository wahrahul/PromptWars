import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData, GraphNode } from '../types';

interface NetworkGraphProps {
  data: GraphData;
  selectedNodeIds: string[];
  onNodeClick: (node: GraphNode, isMultiSelect: boolean) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data, selectedNodeIds, onNodeClick }) => {
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make graph responsive
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    // Slight delay to ensure flex layout finishes calculation
    setTimeout(updateDimensions, 100);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Re-center graph automatically when new data arrives (CRUD updates)
    if (fgRef.current && data.nodes.length > 0) {
      setTimeout(() => {
        fgRef.current.zoomToFit(600, 50);
        fgRef.current.d3ReheatSimulation();
      }, 300);
    }
  }, [data]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="name"
        nodeColor={(node: any) => node.color || '#fff'}
        nodeRelSize={6}
        linkColor={() => 'rgba(255,255,255,0.2)'}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d: any) => d.value * 0.001 || 0.005}
        onNodeClick={(node, event) => onNodeClick(node as GraphNode, event.shiftKey || event.ctrlKey || event.metaKey)}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          if (isNaN(node.x) || isNaN(node.y)) return;
          const label = node.name;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Inter, Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          // Always render the node circle regardless of weight
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val || 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#fff';
          ctx.fill();
          
          if(node.group === 'GeminiCore') {
              ctx.beginPath();
              ctx.arc(node.x, node.y, (node.val || 5) + 3, 0, 2 * Math.PI, false);
              ctx.lineWidth = 1/globalScale;
              ctx.strokeStyle = 'rgba(88, 166, 255, 0.4)';
              ctx.stroke();
          }

          // Active Selection Halo
          if(selectedNodeIds.includes(node.id)) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, (node.val || 5) + 5, 0, 2 * Math.PI, false);
              ctx.setLineDash([2, 2]);
              ctx.strokeStyle = '#fff';
              ctx.lineWidth = 2/globalScale;
              ctx.stroke();
              ctx.setLineDash([]); // Reset
          }

          ctx.fillStyle = 'rgba(22, 27, 34, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + node.val + 2, bckgDimensions[0], bckgDimensions[1]);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#f0f6fc';
          ctx.fillText(label, node.x, node.y + node.val + 2 + bckgDimensions[1]/2);
        }}
      />
    </div>
  );
};

export default NetworkGraph;
