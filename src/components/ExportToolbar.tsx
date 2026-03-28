import React, { useState } from 'react';
import { FileText, FileSpreadsheet, FileIcon, Cloud, CheckCircle, RefreshCcw } from 'lucide-react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { GraphData } from '../types';

interface ExportToolbarProps {
  graphData?: GraphData;
}

const ExportToolbar: React.FC<ExportToolbarProps> = ({ graphData }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const exportCSV = () => {
    if (!graphData) return;
    const data = graphData.nodes.map(n => ({
      Node_ID: n.id,
      System_Identity: n.name,
      Bridge_Category: n.group,
      Service_Weight: n.val,
      Description: n.desc
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'social_bridge_topology.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    if (!graphData) return;
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    
    // Header
    doc.setFillColor(5, 5, 10);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("UNIVERSAL SOCIAL BRIDGE", 20, 25);
    doc.setFontSize(10);
    doc.text("QUANTUM NETWORK INSIGHT REPORT", 20, 32);
    
    // Body Branding
    doc.setTextColor(59, 130, 246);
    doc.setFontSize(14);
    doc.text("System Topology Summary", 20, 55);
    doc.setDrawColor(59, 130, 246);
    doc.line(20, 58, 190, 58);
    
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated on: ${timestamp}`, 20, 65);
    doc.text(`Active Nodes: ${graphData.nodes.length}`, 20, 70);
    doc.text(`Established Links: ${graphData.links.length}`, 20, 75);
    
    let y = 90;
    doc.setFont("helvetica", "bold");
    doc.text("NODE IDENTITY", 25, y);
    doc.text("DOMAIN", 100, y);
    doc.text("WEIGHT", 160, y);
    
    doc.line(20, y+2, 190, y+2);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    graphData.nodes.forEach((node) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(String(node.name), 25, y);
      doc.text(String(node.group), 100, y);
      doc.text(String(node.val), 160, y);
      y += 8;
    });
    
    // Footer
    const pageCount = (doc.internal as any).getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`PROMPTWAR - GOOGLE BRIDGE SERVICE | PAGE ${i} OF ${pageCount}`, 105, 290, { align: 'center' });
    }
    
    doc.save("quantum_bridge_report.pdf");
  };

  const exportDOCX = () => {
    if (!graphData) return;
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "Universal Social Bridge - Intelligence Dashboard",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Generated Network Topology Report", bold: true, color: "3b82f6" }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
             text: `Global System Metrics: ${graphData.nodes.length} Verified Nodes`,
             heading: HeadingLevel.HEADING_3,
          }),
          ...graphData.nodes.map(node => (
            new Paragraph({
               children: [
                   new TextRun({ text: `● ${node.name}`, bold: true }),
                   new TextRun({ text: ` [${node.group}]`, color: "666666" }),
                   new TextRun({ text: `: ${node.desc || "No extended metadata available."}` })
               ]
            })
          ))
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'quantum_bridge_metadata.docx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleCloudSync = () => {
    setIsSyncing(true);
    // Mock simulation of Google Cloud sync
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
      setTimeout(() => setSyncComplete(false), 3000);
    }, 2000);
  };

  return (
    <div className="toolbar-overlay glass-panel" style={{ 
      display: 'flex', 
      gap: '0.75rem', 
      padding: '0.75rem 1rem', 
      background: 'rgba(15, 15, 25, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '99px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem', opacity: 0.6 }}>
        <Cloud size={14} color="var(--primary-color)" />
        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bridge Sync</span>
      </div>

      <button className="btn" onClick={exportPDF} title="Export as PDF">
        <FileIcon size={16} color="#f87171" />
      </button>
      <button className="btn" onClick={exportCSV} title="Export as CSV">
        <FileSpreadsheet size={16} color="#10b981" />
      </button>
      <button className="btn" onClick={exportDOCX} title="Export as DOCX">
        <FileText size={16} color="#3b82f6" />
      </button>

      <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }}></div>

      <button 
        className="btn" 
        onClick={handleCloudSync} 
        disabled={isSyncing}
        style={{ 
          background: syncComplete ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          borderColor: syncComplete ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)',
          color: syncComplete ? '#10b981' : 'var(--primary-color)',
          minWidth: '130px'
        }}
      >
        {isSyncing ? <><RefreshCcw size={14} className="animate-spin" /> Syncing...</> : 
         syncComplete ? <><CheckCircle size={14} /> Synced</> : 
         <><Cloud size={14} /> Sync to Google</>}
      </button>
    </div>
  );
};

export default ExportToolbar;
