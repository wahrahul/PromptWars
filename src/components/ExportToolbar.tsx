import React from 'react';
import { Download, FileText, FileSpreadsheet, FileIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import type { GraphData } from '../types';

interface ExportToolbarProps {
  graphData?: GraphData;
}

const ExportToolbar: React.FC<ExportToolbarProps> = ({ graphData }) => {
  const exportCSV = () => {
    if (!graphData) return;
    const data = graphData.nodes.map(n => ({
      ID: n.id,
      Name: n.name,
      Category: n.group,
      Description: n.desc
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'social_bridge_network.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    if (!graphData) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Universal Social Bridge - Insight Report", 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Generated Network Nodes:", 20, 30);
    
    let y = 40;
    graphData.nodes.forEach((node, index) => {
      doc.text(`${index + 1}. ${node.name} (${node.group})`, 20, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    
    doc.save("bridge_report.pdf");
  };

  const exportDOCX = () => {
    if (!graphData) return;
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Universal Social Bridge Report", bold: true, size: 32 }),
            ],
          }),
          new Paragraph({
             children: [new TextRun({ text: "Network Breakdown:", bold: true })]
          }),
          ...graphData.nodes.map(node => (
            new Paragraph({
               children: [new TextRun(`- ${node.name} (${node.group}): ${node.desc}`)]
            })
          ))
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bridge_report.docx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="toolbar-overlay">
      <h4><Download size={18} /> Export Insights</h4>
      <button className="btn" onClick={exportPDF}>
        <FileIcon size={16} /> PDF
      </button>
      <button className="btn" onClick={exportCSV}>
        <FileSpreadsheet size={16} /> CSV
      </button>
      <button className="btn" onClick={exportDOCX}>
        <FileText size={16} /> DOCX
      </button>
    </div>
  );
};

export default ExportToolbar;
