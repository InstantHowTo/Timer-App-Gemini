import React from 'react';
import { AnalysisResult } from '../types';

interface AIAnalysisProps {
  analysis: AnalysisResult | null;
  loading: boolean;
  onAnalyze: () => void;
  canAnalyze: boolean;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis, loading, onAnalyze, canAnalyze }) => {
  if (!canAnalyze && !analysis && !loading) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {!analysis && !loading && (
        <button
          onClick={onAnalyze}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-900/30 flex items-center justify-center space-x-2 group"
        >
          <svg className="w-5 h-5 text-indigo-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Analyze Performance with Gemini</span>
        </button>
      )}

      {loading && (
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 animate-pulse text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-2"></div>
          <p className="text-indigo-300 text-sm font-medium">Gemini is analyzing your splits...</p>
        </div>
      )}

      {analysis && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Coach's Corner
            </h3>
            <button 
              onClick={onAnalyze} 
              className="text-xs text-indigo-200 hover:text-white underline decoration-dashed"
            >
              Refresh
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1 uppercase tracking-wider font-semibold">Summary</p>
              <p className="text-gray-100 italic">"{analysis.summary}"</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">Key Insights</p>
              <ul className="space-y-2">
                {analysis.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
