import { useState } from 'react';
import ValentineLayout from '@/components/ValentineLayout';
import FireworksBackground from '@/components/FireworksBackground';

export default function FinalePage() {
  const [imageSrc, setImageSrc] = useState('/assets/IMG_6912-3.jpeg');
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    // If primary image fails, try fallback
    if (imageSrc === '/assets/IMG_6912-3.jpeg') {
      setImageSrc('/assets/IMG_6912-4.jpeg');
    } else {
      // Both images failed, show placeholder
      setImageError(true);
    }
  };

  return (
    <ValentineLayout showFireworks>
      <FireworksBackground />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center z-10 max-w-4xl w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            {!imageError ? (
              <img
                src={imageSrc}
                alt="This could be us"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full max-w-2xl mx-auto aspect-video bg-valentine-muted/30 rounded-2xl flex items-center justify-center">
                <p className="text-valentine-primary text-lg">
                  💝 Image will appear here once uploaded 💝
                </p>
              </div>
            )}
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-8 text-valentine-primary">
              This could be us🤭
            </h2>
          </div>
        </div>
      </div>
    </ValentineLayout>
  );
}
