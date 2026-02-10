import { ReactNode } from 'react';

interface ValentineLayoutProps {
  children: ReactNode;
  showFireworks?: boolean;
}

export default function ValentineLayout({ children, showFireworks = false }: ValentineLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-valentine-bg">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-pattern.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-valentine-gradient-start via-valentine-gradient-mid to-valentine-gradient-end opacity-90" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-4 text-center text-sm text-valentine-primary/70">
        <p>
          © {new Date().getFullYear()} · Built with 💖 using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-valentine-accent transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
