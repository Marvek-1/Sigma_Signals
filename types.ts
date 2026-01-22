
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

export enum WorkflowStatus {
  NEW = 'new',
  TRIAGE = 'triage',
  UNDER_VERIFICATION = 'under_verification',
  VALIDATED = 'validated',
  PUBLISHED = 'published',
  SUPPRESSED = 'suppressed',
  CLOSED = 'closed'
}

export interface DiseaseInfo {
  code: string;
  name: string;
  syndrome: string;
}

export interface AfroAlert {
  alert_id: string;
  alert_type: 'AFRO_MEDIA_DISEASE' | 'AFRO_NASA_HAZARD' | 'AFRO_FUSION';
  country_iso3: string;
  admin1?: string;
  disease?: DiseaseInfo;
  title: string;
  summary: string;
  alert_level: AlertLevel;
  confidence: number;
  severity: SeverityLevel;
  priority: number;
  status: WorkflowStatus;
  evidence: {
    signal_count: number;
    unique_sources: number;
    source_ids: string[];
    top_urls: string[];
  };
  recommended_afro_actions: string[];
  created_at: string;
}

export interface MediaSignal {
  signal_id: string;
  country_iso3: string;
  source_name: string;
  headline: string;
  published_at: string;
  matched_keywords: string[];
}
