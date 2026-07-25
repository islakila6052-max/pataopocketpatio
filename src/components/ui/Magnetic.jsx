import { useRef, useEffect, useState } from 'react';
import { cn } from '../utils/helpers';

/**
 * Magnetic button wrapper — button gently follows cursor on hover
 * and snaps back with a spring feel on leave.
 */
export default function Magnetic({ children, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      setPos({ x, y });
    };
    const handleLeave = () => { setHovered(false); setPos({ x: 0, y: 0 }); };
    const handleEnter = () => setHovered(true);
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('mouseenter', handleEnter);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  return (
    <div ref={ref} className={cn('inline-block', className)}
      style={{ transform: hovered ? `translate(${pos.x}px, ${pos.y}px)` : 'translate(0px, 0px)', transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      {children}
    </div>
  );
}
