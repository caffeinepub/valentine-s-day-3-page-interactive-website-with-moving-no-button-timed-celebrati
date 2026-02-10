import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import ValentineLayout from '@/components/ValentineLayout';
import { useMovingNoButton } from '@/hooks/useMovingNoButton';

interface QuestionPageProps {
  onYesClick: () => void;
}

export default function QuestionPage({ onYesClick }: QuestionPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  
  const { position, handleNoClick } = useMovingNoButton({
    containerRef,
    buttonRef: noButtonRef,
  });

  return (
    <ValentineLayout>
      <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 text-valentine-primary animate-pulse">
            Will you be my valentine?🥺
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative">
            <Button
              onClick={onYesClick}
              size="lg"
              className="text-2xl md:text-3xl px-16 py-12 h-auto font-bold bg-valentine-accent hover:bg-valentine-accent-hover text-white shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-3xl"
            >
              Yes 💕
            </Button>
            
            <Button
              ref={noButtonRef}
              onClick={handleNoClick}
              variant="outline"
              size="sm"
              className="text-base px-6 py-4 h-auto font-semibold border-2 border-valentine-muted hover:bg-valentine-muted/20 rounded-2xl will-change-transform"
              style={{
                position: 'absolute',
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'none',
              }}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </ValentineLayout>
  );
}
