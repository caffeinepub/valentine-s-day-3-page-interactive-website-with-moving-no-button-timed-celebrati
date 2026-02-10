import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

interface UseMovingNoButtonProps {
  containerRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
}

interface Position {
  x: number;
  y: number;
}

export function useMovingNoButton({ containerRef, buttonRef }: UseMovingNoButtonProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 100 });
  const targetRef = useRef<Position>({ x: 0, y: 100 });
  const animationFrameRef = useRef<number | null>(null);

  const getRandomPosition = useCallback((): Position => {
    if (!containerRef.current || !buttonRef.current) {
      return { x: 0, y: 100 };
    }

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    const minX = 20;
    const minY = 20;
    
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    
    return { x, y };
  }, [containerRef, buttonRef]);

  const handleNoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const newTarget = getRandomPosition();
    targetRef.current = newTarget;
  }, [getRandomPosition]);

  // Smooth continuous animation using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      setPosition((current) => {
        const target = targetRef.current;
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If close enough to target, we're done
        if (distance < 1) {
          return target;
        }

        // Smooth interpolation (ease towards target)
        const speed = 0.05; // Adjust for faster/slower movement
        return {
          x: current.x + dx * speed,
          y: current.y + dy * speed,
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Change target position every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      targetRef.current = getRandomPosition();
    }, 2000);

    return () => clearInterval(interval);
  }, [getRandomPosition]);

  // Initial position after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialPos = getRandomPosition();
      setPosition(initialPos);
      targetRef.current = initialPos;
    }, 100);

    return () => clearTimeout(timer);
  }, [getRandomPosition]);

  return { position, handleNoClick };
}
