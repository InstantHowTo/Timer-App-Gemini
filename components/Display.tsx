import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface DisplayProps {
  time: number;
}

export const Display: React.FC<DisplayProps> = ({ time }) => {
  const formatted = formatTime(time);
  // Split formatting to style mm:ss and .SS differently
  const [main, decimals] = formatted.split('.');

  return (
    <div className="flex justify-center items-baseline tabular-nums tracking-wider text-white mb-8">
      <span className="text-7xl sm:text-9xl font-mono font-bold drop-shadow-2xl">
        {main}
      </span>
      <span className="text-3xl sm:text-5xl font-mono text-gray-400 ml-1">
        .{decimals}
      </span>
    </div>
  );
};
