import { useEffect } from 'react';
import ValentineLayout from '@/components/ValentineLayout';
import FireworksBackground from '@/components/FireworksBackground';

interface CelebrationPageProps {
  onComplete: () => void;
}

export default function CelebrationPage({ onComplete }: CelebrationPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <ValentineLayout showFireworks>
      <FireworksBackground />
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-valentine-primary animate-bounce">
            I knew you would say yes!!🤭
          </h1>
          
          <div className="flex justify-center items-center gap-4 mt-12">
            <img 
              src="/assets/generated/heart-sticker.dim_512x512.png" 
              alt="Heart" 
              className="w-24 h-24 md:w-32 md:h-32 animate-pulse"
            />
            <img 
              src="/assets/generated/heart-sticker.dim_512x512.png" 
              alt="Heart" 
              className="w-32 h-32 md:w-40 md:h-40 animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <img 
              src="/assets/generated/heart-sticker.dim_512x512.png" 
              alt="Heart" 
              className="w-24 h-24 md:w-32 md:h-32 animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>
    </ValentineLayout>
  );
}
