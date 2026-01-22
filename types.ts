
export enum AlertLevel {
  WATCH = 'WATCH',
  WARNING = 'WARNING',
  HIGH = 'HIGH'
}

export enum GradeLevel {
  GRADE_3 = 'Grade 3', // Regional/Global Emergency
  GRADE_2 = 'Grade 2', // Major Scale
  GRADE_1 = 'Grade 1', // Limited/Single Country
  UNGRADED = 'Ungraded'
}

export enum WorkflowStatus {
  SIGNAL = 'signal', // Raw unverified data
  TRIAGED = 'triaged', // AI filtered
  VALIDATED = 'validated', // Confirmed alert
}

export interface DiseaseInfo {
  code: string;
  name: string;
  syndrome: string;
}

export interface AfroEvent {
  id: string;
  type: 'SIGNAL' | 'ALERT';
  country_iso3: string;
  country_name: string;
  admin1?: string;
  disease?: DiseaseInfo;
  title: string;
  summary: string;
  alert_level: AlertLevel;
  grade: GradeLevel;
  confidence: number;
  status: WorkflowStatus;
  
  community_pulse: {
    informal_signal_volume: 'low' | 'medium' | 'high';
    vernacular_terms: string[];
    sentiment: 'panic' | 'concern' | 'neutral';
  };
  
  evidence: {
    signal_count: number;
    source_types: string[];
    top_urls: string[];
  };
  
  field_readiness: string[];
  created_at: string;
}
