
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
    vernacular_terms: string[];
    sentiment: string;
    anecdote_snippet?: string;
  };
  evidence: {
    signal_count: number;
    source_platform: string; // e.g., TikTok, Facebook, Internet TV
    top_urls: string[];
  };
  field_readiness: string[];
  created_at: string;
}

export type AfroAlert = AfroEvent;
