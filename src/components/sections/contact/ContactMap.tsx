export default function ContactMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      {/* Map placeholder */}
      <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 400">
            {/* Grid pattern to simulate a map */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Location pin */}
            <circle cx="400" cy="200" r="8" fill="#FF6B35" />
            <circle cx="400" cy="200" r="20" fill="#FF6B35" opacity="0.2" />
            <circle cx="400" cy="200" r="35" fill="#FF6B35" opacity="0.1" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <p className="font-heading text-lg font-bold text-primary">
            Roquemaure, Occitanie
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Disponible partout en France, en remote ou en présentiel
          </p>
        </div>
      </div>
    </div>
  );
}
