import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Thin scroll progress bar at the very top of the viewport.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-label="Page scroll progress"
    />
  );
}
