import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ValentineLayout from '@/components/ValentineLayout';

interface QuestionPageProps {
  onYesClick: () => void;
}

export default function QuestionPage({ onYesClick }: QuestionPageProps) {
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
  };

  // Calculate scale based on click count (shrinks progressively)
  const getNoButtonScale = () => {
    switch (noClickCount) {
      case 0:
        return 1;
      case 1:
        return 0.75;
      case 2:
        return 0.5;
      case 3:
        return 0.25;
      default:
        return 0;
    }
  };

  const noButtonScale = getNoButtonScale();
  const shouldShowNoButton = noClickCount < 4;

  return (
    <ValentineLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 text-valentine-primary animate-pulse">
            Will you be my valentine?🥺
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              onClick={onYesClick}
              size="lg"
              className="text-2xl md:text-3xl px-16 py-12 h-auto font-bold bg-valentine-accent hover:bg-valentine-accent-hover text-white shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-3xl"
            >
              Yes 💕
            </Button>
            
            {shouldShowNoButton && (
              <Button
                onClick={handleNoClick}
                variant="outline"
                size="sm"
                className="text-base px-6 py-4 h-auto font-semibold border-2 border-valentine-muted hover:bg-valentine-muted/20 rounded-2xl transition-transform duration-300"
                style={{
                  transform: `scale(${noButtonScale})`,
                }}
              >
                No
              </Button>
            )}
          </div>
        </div>
      </div>
    </ValentineLayout>
  );
}
