export interface Lap {
  id: number;
  time: number; // total elapsed time at lap
  split: number; // time since last lap
}

export enum TimerState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

export interface AnalysisResult {
  summary: string;
  insights: string[];
}
