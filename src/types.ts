export interface GraphNode {
  id: string;
  name: string;
  group: 'User' | 'GeminiCore' | 'System' | 'Social' | 'KnowledgeGraph' | 'Action';
  val: number;
  color?: string;
  desc?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
