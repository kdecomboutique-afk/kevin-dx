export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="text-center">
        {/* Animated KD logo */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center animate-[logo-pulse_1.5s_ease-in-out_infinite]">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="20" fill="#FF6B35" />
            <text
              x="50%"
              y="54%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontWeight="bold"
              fontSize="32"
              fontFamily="system-ui"
            >
              KD
            </text>
          </svg>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mb-4 h-1 w-48 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-accent animate-[progress-bar_1.8s_ease-in-out_infinite]" />
        </div>

        <p className="text-sm font-medium text-text-muted">Chargement...</p>
      </div>
    </div>
  );
}
