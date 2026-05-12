export interface Prospect {
  id: string;
  name: string;
  company: string;
  title: string;
  location: string;
  linkedin_url?: string;
  email?: string;
  receptiveness_score: number;
  estimated_budget?: string;
  qualified: boolean;
  created_at: Date;
}

export interface Interaction {
  id: string;
  prospect_id: string;
  type: 'email' | 'call' | 'linkedin_msg' | 'demo';
  direction: 'inbound' | 'outbound';
  content: string;
  pain_points: string[];
  objections: string[];
  enthusiasm_score: number;
  next_step?: string;
  created_at: Date;
}

export interface Deal {
  id: string;
  prospect_id: string;
  stage: 'awareness' | 'consideration' | 'decision' | 'implementation';
  value_estimated?: number;
  probability: number;
  expected_close_date?: Date;
  health_score: number;
  last_activity_at?: Date;
  created_at: Date;
}

export interface PlaybookVersion {
  id: string;
  version: string;
  positioning: Record<string, unknown>;
  pain_points: PainPoint[];
  objections: ObjectionEntry[];
  messaging: Record<string, unknown>;
  confidence_scores: Record<string, number>;
  conversations_analyzed: number;
  created_at: Date;
}

export interface PainPoint {
  rank: number;
  pain: string;
  mentions: string;
  confidence: number;
  messaging_suggestion: string;
}

export interface ObjectionEntry {
  objection: string;
  frequency: string;
  recommended_response: string;
  handling_effectiveness: number;
}

export interface LeadScoringResult {
  leads: ScoredLead[];
}

export interface ScoredLead {
  name: string;
  company: string;
  title: string;
  location: string;
  receptiveness_score: number;
  estimated_budget: string;
  why_qualified: string;
  next_action: string;
  priority: number;
}

export interface OutreachResult {
  prospect_id: string;
  variant: 'A' | 'B';
  platform: 'linkedin' | 'email';
  message: {
    opening: string;
    body: string;
    cta: string;
  };
  cadence: Record<string, string>;
}

export interface ConversationInsight {
  conversation_id: string;
  summary: string;
  pain_points: Array<{ pain: string; emotional_intensity: string }>;
  objections: Array<{ objection: string; severity: string; suggested_handling: string }>;
  buyer_signals: {
    stage: string;
    authority: string;
    timeline: string;
    budget?: string;
  };
  enthusiasm: number;
  qualified: boolean;
  next_step: {
    action: string;
    timing: string;
    suggested_messaging: string;
  };
}

export interface DealPrediction {
  deal_id: string;
  prospect: string;
  stage: string;
  closure_probability: number;
  estimated_close_date?: string;
  alerts: Array<{ type: string; severity: string; message: string; recommendation: string }>;
  recommendation: string;
}
