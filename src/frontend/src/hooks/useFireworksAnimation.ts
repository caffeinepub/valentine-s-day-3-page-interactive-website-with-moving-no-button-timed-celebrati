import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  exploded: boolean;
  particles: Particle[];
  color: string;
}

const COLORS = [
  '#FF1461', // Valentine pink
  '#FF6B9D', // Light pink
  '#FFC0CB', // Soft pink
  '#FFD700', // Gold
  '#FF69B4', // Hot pink
  '#FF85A2', // Rose pink
];

export function useFireworksAnimation(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const fireworksRef = useRef<Firework[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const targetY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      return {
        x,
        y: canvas.height,
        targetY,
        vy: -8 - Math.random() * 4,
        exploded: false,
        particles: [],
        color,
      };
    };

    const createParticles = (x: number, y: number, color: string): Particle[] => {
      const particles: Particle[] = [];
      const particleCount = 30 + Math.floor(Math.random() * 20);

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          color,
          size: 2 + Math.random() * 2,
        });
      }

      return particles;
    };

    const animate = (timestamp: number) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn new fireworks periodically
      if (timestamp - lastSpawnRef.current > 600 + Math.random() * 400) {
        fireworksRef.current.push(createFirework());
        lastSpawnRef.current = timestamp;
      }

      // Update and draw fireworks
      fireworksRef.current = fireworksRef.current.filter((firework) => {
        if (!firework.exploded) {
          // Rising phase
          firework.y += firework.vy;
          firework.vy += 0.15; // Gravity

          // Draw rocket
          ctx.fillStyle = firework.color;
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Check if reached target height
          if (firework.y <= firework.targetY || firework.vy > 0) {
            firework.exploded = true;
            firework.particles = createParticles(firework.x, firework.y, firework.color);
          }

          return true;
        } else {
          // Explosion phase
          let hasAliveParticles = false;

          firework.particles.forEach((particle) => {
            if (particle.life > 0) {
              hasAliveParticles = true;

              // Update particle
              particle.x += particle.vx;
              particle.y += particle.vy;
              particle.vy += 0.08; // Gravity
              particle.vx *= 0.99; // Air resistance
              particle.life--;

              // Draw particle
              const alpha = particle.life / particle.maxLife;
              ctx.fillStyle = particle.color;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          ctx.globalAlpha = 1;
          return hasAliveParticles;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef]);
}
