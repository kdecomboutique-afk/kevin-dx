import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  type?: "laptop" | "phone";
  children?: React.ReactNode;
  className?: string;
}

export default function DeviceFrame({
  type = "laptop",
  children,
  className,
}: DeviceFrameProps) {
  if (type === "phone") {
    return (
      <div className={cn("relative mx-auto", className)}>
        <div className="relative w-[180px] h-[360px] bg-surface-dark rounded-[2rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-surface-dark rounded-b-2xl z-10" />
          <div className="w-full h-full bg-white overflow-hidden pt-5">
            {children || (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative mx-auto", className)}>
      <div className="relative bg-surface-dark rounded-t-xl pt-6 pb-0 px-3 shadow-2xl">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
          <span className="w-2 h-2 rounded-full bg-green-400/80" />
        </div>
        <div className="rounded-t-lg overflow-hidden bg-white">
          {children || (
            <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
              <div className="text-center space-y-3 p-8">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 mx-auto flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-32 mx-auto bg-primary/10 rounded" />
                  <div className="h-2 w-48 mx-auto bg-primary/5 rounded" />
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  <div className="h-8 w-20 bg-accent/20 rounded-lg" />
                  <div className="h-8 w-20 bg-primary/10 rounded-lg" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative h-4 bg-gray-300 rounded-b-xl shadow-inner">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-b-lg" />
      </div>
    </div>
  );
}
