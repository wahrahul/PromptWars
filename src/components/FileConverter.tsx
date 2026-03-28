import React, { useState } from 'react';
import { Upload, FileUp, X, Check, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import type { GraphNode } from '../types';

interface FileConverterProps {
  onDataConverted: (nodes: GraphNode[]) => void;
}

const FileConverter: React.FC<FileConverterProps> = ({ onDataConverted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (file: File) => {
    setError(null);
    setSuccess(false);

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.json')) {
      setError("Unsupported format. Please use CSV or JSON.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let nodes: GraphNode[] = [];

        if (file.name.endsWith('.csv')) {
          const results = Papa.parse(content, { header: true });
          nodes = (results.data as any[]).map((row: any, i: number) => ({
            id: row.id || `uploaded_${Date.now()}_${i}`,
            name: row.name || row.System_Identity || `Node ${i}`,
            group: row.group || row.Bridge_Category || 'Uploaded',
            val: Number(row.val || row.Service_Weight) || 5,
            color: row.color || (row.group === 'User' ? 'var(--primary-color)' : '#f59e0b'),
            desc: row.desc || row.Description || 'Imported via Google Bridge Sync.'
          }));
        } else {
          // JSON
          const data = JSON.parse(content);
          nodes = Array.isArray(data) ? data : [data];
        }

        onDataConverted(nodes);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError("Failed to parse file. Ensure valid structure.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      className={`glass-panel ${isDragging ? 'dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
      }}
      style={{
        padding: '1.5rem',
        border: isDragging ? '2px dashed var(--primary-color)' : '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        background: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'rgba(15, 15, 25, 0.3)',
        marginBottom: '1rem'
      }}
    >
      <div style={{ marginBottom: '1rem', color: error ? '#f87171' : success ? '#10b981' : 'var(--text-secondary)' }}>
        {error ? <AlertCircle size={32} /> : success ? <Check size={32} /> : <FileUp size={32} />}
      </div>
      
      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>
        {error ? 'Conversion Failed' : success ? 'Bridge Established' : 'Quantum Bridge Converter'}
      </h4>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        {error || (success ? 'Data has been synthesized into the graph.' : 'Drag & Drop CSV/JSON to expand topology')}
      </p>

      {!success && (
        <label className="btn" style={{ cursor: 'pointer', display: 'inline-block', fontSize: '0.8rem' }}>
          <Upload size={14} style={{ marginRight: '0.5rem' }} /> Select File
          <input 
            type="file" 
            accept=".csv,.json" 
            style={{ display: 'none' }} 
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} 
          />
        </label>
      )}

      {error && (
        <button className="icon-btn" onClick={() => setError(null)} style={{ marginTop: '0.5rem' }}>
          <X size={14} /> Clear Error
        </button>
      )}
    </div>
  );
};

export default FileConverter;
