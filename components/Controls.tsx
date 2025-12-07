import React from 'react';
import { TimerState } from '../types';

interface ControlsProps {
  state: TimerState;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ state, onStart, onStop, onReset, onLap }) => {
  return (
    <div className="flex items-center justify-center space-x-6 sm:space-x-12 mb-8">
      {state === TimerState.RUNNING ? (
        <>
           <button
            onClick={onLap}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 text-white font-semibold transition-all active:scale-95 flex items-center justify-center uppercase text-sm tracking-widest"
          >
            Lap
          </button>
          <button
            onClick={onStop}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-900/80 hover:bg-red-800 border-2 border-red-700 text-red-100 font-semibold transition-all active:scale-95 flex items-center justify-center uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(153,27,27,0.4)]"
          >
            Stop
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onReset}
            disabled={state === TimerState.IDLE}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 font-semibold transition-all flex items-center justify-center uppercase text-sm tracking-widest
              ${state === TimerState.IDLE 
                ? 'bg-gray-800/50 border-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white active:scale-95'
              }`}
          >
            Reset
          </button>
          <button
            onClick={onStart}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-900/80 hover:bg-emerald-800 border-2 border-emerald-700 text-emerald-100 font-semibold transition-all active:scale-95 flex items-center justify-center uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(6,95,70,0.4)]"
          >
            Start
          </button>
        </>
      )}
    </div>
  );
};
