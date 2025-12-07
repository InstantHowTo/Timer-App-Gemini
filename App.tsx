import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Display } from './components/Display';
import { Controls } from './components/Controls';
import { LapList } from './components/LapList';
import { AIAnalysis } from './components/AIAnalysis';
import { TimerState, Lap, AnalysisResult } from './types';
import { analyzePerformance } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<TimerState>(TimerState.IDLE);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  
  // AI State
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // References for timing logic
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const previousElapsedRef = useRef<number>(0);

  const animate = useCallback(() => {
    const now = Date.now();
    const totalElapsed = now - startTimeRef.current + previousElapsedRef.current;
    setElapsedTime(totalElapsed);
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const handleStart = () => {
    if (state === TimerState.RUNNING) return;
    
    setState(TimerState.RUNNING);
    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleStop = () => {
    if (state !== TimerState.RUNNING) return;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    previousElapsedRef.current = elapsedTime;
    setState(TimerState.PAUSED);
  };

  const handleReset = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setState(TimerState.IDLE);
    setElapsedTime(0);
    previousElapsedRef.current = 0;
    setLaps([]);
    setAnalysis(null);
  };

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[laps.length - 1].time : 0;
    const currentSplit = elapsedTime - lastLapTime;
    
    const newLap: Lap = {
      id: laps.length + 1,
      time: elapsedTime,
      split: currentSplit,
    };

    setLaps((prev) => [...prev, newLap]);
    // Reset analysis if new data comes in
    if (analysis) setAnalysis(null); 
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzePerformance(laps);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-200 flex items-center gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          CHRONOGEN AI
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest">Precision Timing & Analytics</p>
      </header>

      {/* Main Display */}
      <main className="w-full max-w-lg flex flex-col h-[80vh] sm:h-auto">
        <div className="relative z-10">
          <Display time={elapsedTime} />
        </div>

        <Controls 
          state={state}
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
          onLap={handleLap}
        />

        <div className="flex-1 min-h-0 flex flex-col gap-4">
          <LapList laps={laps} />
          
          <AIAnalysis 
            analysis={analysis} 
            loading={isAnalyzing} 
            onAnalyze={handleAnalyze} 
            canAnalyze={laps.length >= 2} // Only analyze if we have at least 2 laps for meaningful data
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-gray-600 text-xs">
        <p>Powered by Google Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
