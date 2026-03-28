import type { GraphData } from '../types';

export const mockGraphData: GraphData = {
  nodes: [
    { id: 'user_1', name: 'User Profile', group: 'User', val: 8, color: '#f0f6fc', desc: 'The starting point. Input user needs, status, and goals.' },
    { id: 'gemini_core', name: 'Gemini AI Core', group: 'GeminiCore', val: 12, color: '#58a6ff', desc: 'The intelligent engine orchestrating connections and generating insights.' },
    
    // Systems
    { id: 'sys_gov', name: 'Government Services', group: 'System', val: 6, color: '#3fb950', desc: 'ID verification, benefits portal, taxation APIs.' },
    { id: 'sys_health', name: 'Healthcare Portals', group: 'System', val: 6, color: '#ff7b72', desc: 'Medical records, appointment scheduling, insurance verification.' },
    { id: 'sys_edu', name: 'Education Platforms', group: 'System', val: 6, color: '#d2a8ff', desc: 'Degree checks, lifelong learning, certification pathways.' },
    { id: 'sys_fin', name: 'Financial Systems', group: 'System', val: 6, color: '#e3b341', desc: 'Banking APIs, credit scoring, loan applications.' },
    
    // Social
    { id: 'soc_fb', name: 'Facebook Network', group: 'Social', val: 5, color: '#1f6feb', desc: 'Community groups, event organizing, local peer support.' },
    { id: 'soc_linkedin', name: 'LinkedIn Professional', group: 'Social', val: 5, color: '#0a66c2', desc: 'Job matching, professional endorsements, skill mapping.' },
    { id: 'soc_x', name: 'X / Twitter Info Hub', group: 'Social', val: 5, color: '#1da1f2', desc: 'Real-time news, trending social benefits, announcements.' },
    { id: 'soc_ig', name: 'Instagram Visuals', group: 'Social', val: 5, color: '#e1306c', desc: 'Visual sharing, campaigns, community highlights.' },
    
    // Actions & Engine
    { id: 'kg_engine', name: 'Knowledge Graph Engine', group: 'KnowledgeGraph', val: 10, color: '#ff8c00', desc: 'Maps relationships and discovers hidden pathway opportunities.' },
    { id: 'act_pdf', name: 'PDF Report Generator', group: 'Action', val: 4, color: '#ff4444', desc: 'Compile paths into a printable document.' },
    { id: 'act_csv', name: 'CSV Exporter', group: 'Action', val: 4, color: '#00c851', desc: 'Export tabular network data to spreadsheet.' },
    { id: 'act_docx', name: 'DOCX Compiler', group: 'Action', val: 4, color: '#33b5e5', desc: 'Create editable word documents from AI summaries.' }
  ],
  links: [
    { source: 'user_1', target: 'gemini_core', label: 'Queries / Intent' },
    
    // Core to Systems
    { source: 'gemini_core', target: 'sys_gov', label: 'Verify ID/Benefits' },
    { source: 'gemini_core', target: 'sys_health', label: 'Check Vitals/Records' },
    { source: 'gemini_core', target: 'sys_edu', label: 'Map Skills' },
    { source: 'gemini_core', target: 'sys_fin', label: 'Calculate Eligibility' },
    
    // Core to Social
    { source: 'gemini_core', target: 'soc_fb', label: 'Find Groups' },
    { source: 'gemini_core', target: 'soc_linkedin', label: 'Push Resume' },
    { source: 'gemini_core', target: 'soc_x', label: 'Broadcast Need' },
    { source: 'gemini_core', target: 'soc_ig', label: 'Share Story' },
    
    // Knowledge Graph orchestrating cross-system sync
    { source: 'kg_engine', target: 'gemini_core', label: 'Contextualize' },
    { source: 'kg_engine', target: 'sys_gov', label: 'Sync' },
    { source: 'kg_engine', target: 'sys_health', label: 'Sync' },
    { source: 'kg_engine', target: 'soc_linkedin', label: 'Sync' },
    
    // Core to Actions
    { source: 'gemini_core', target: 'act_pdf', label: 'Format Output' },
    { source: 'gemini_core', target: 'act_csv', label: 'Format Output' },
    { source: 'gemini_core', target: 'act_docx', label: 'Format Output' }
  ]
};
