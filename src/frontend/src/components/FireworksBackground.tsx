import { useRef } from 'react';
import { useFireworksAnimation } from '@/hooks/useFireworksAnimation';

export default function FireworksBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useFireworksAnimation(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
