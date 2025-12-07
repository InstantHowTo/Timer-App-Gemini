import React from 'react';
import { Lap } from '../types';
import { formatTime } from '../utils/timeUtils';

interface LapListProps {
  laps: Lap[];
}

export const LapList: React.FC<LapListProps> = ({ laps }) => {
  // Determine fastest and slowest laps for highlighting
  const splits = laps.map(l => l.split);
  const minSplit = Math.min(...splits);
  const maxSplit = Math.max(...splits);

  return (
    <div className="w-full max-w-md mx-auto flex-1 overflow-hidden flex flex-col min-h-0 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold">
        <span>Lap No.</span>
        <span className="text-center">Split</span>
        <span className="text-right">Total</span>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2 space-y-1">
        {[...laps].reverse().map((lap) => {
          const isFastest = laps.length > 2 && lap.split === minSplit;
          const isSlowest = laps.length > 2 && lap.split === maxSplit;
          
          return (
            <div 
              key={lap.id} 
              className={`grid grid-cols-3 gap-4 p-3 rounded-lg text-sm font-mono transition-colors
                ${isFastest ? 'bg-emerald-900/20 text-emerald-400' : ''}
                ${isSlowest ? 'bg-red-900/20 text-red-400' : ''}
                ${!isFastest && !isSlowest ? 'text-gray-300 hover:bg-gray-800/50' : ''}
              `}
            >
              <span className="font-sans text-gray-500 font-medium">#{String(lap.id).padStart(2, '0')}</span>
              <span className="text-center">{formatTime(lap.split)}</span>
              <span className="text-right text-gray-500">{formatTime(lap.time)}</span>
            </div>
          );
        })}
        {laps.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-600 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Ready to track</span>
          </div>
        )}
      </div>
    </div>
  );
};
