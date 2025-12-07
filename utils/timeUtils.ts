/**
 * Formats milliseconds into mm:ss.SS
 * @param ms - time in milliseconds
 * @returns string formatted time
 */
export const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
};

/**
 * Formats milliseconds into a more detailed string for AI prompt
 */
export const formatTimeForAI = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  return `${minutes}m ${seconds}s ${milliseconds}ms`;
};
