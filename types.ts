
export enum AlertLevel {
  WATCH = 'WATCH',
  WARNING = 'WARNING',
  HIGH = 'HIGH'
}

export enum SeverityLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum GradeLevel {
  GRADE_1 = 'Grade 1',
  GRADE_2 = 'Grade 2',
  GRADE_3 = 'Grade 3',
  UNGRADED = 'Ungraded'
}

export enum WorkflowStatus {
  NEW = 'new',
  TRIAGE = 'triage',
  UNDER_VERIFICATION = 'under_verification',
  VALIDATED = 'validated',
  PUBLISHED = 'published',
  CLOSED = 'closed'
}

export interface DiseaseInfo {
  code: string;
  name: string;
  syndrome: string;
}

export interface VernacularMapping {
  term: string;
  symptom_mapping: string;
}

export interface SignalTimelinePoint {
  timestamp: string;
  volume: number;
}

export interface AfroEvent {
  id: string;
  type: 'ALERT' | 'SIGNAL';
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
  epidemiology?: {
    confirmed_cases: number;
    deaths: number;
    cfr: string;
    severity: SeverityLevel;
  };
  community_pulse: {
    informal_signal_volume: 'low' | 'moderate' | 'high';
    context_explanation?: string;
    vernacular_terms: string[];
    vernacular_mapping?: VernacularMapping[];
    sentiment: string;
    anecdote_snippet?: string;
    signal_timeline?: SignalTimelinePoint[];
  };
  evidence: {
    signal_count: number;
    source_platform: string; 
    reliability_note?: string; 
    top_urls: string[];
  };
  field_readiness: string[];
  created_at: string;
}

export type AfroAlert = AfroEvent;
