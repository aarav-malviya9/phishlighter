'use client';

export default function Header() {
  return (
    <header className="relative border-b border-phish-border bg-phish-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-phish-dark animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Phish<span className="text-cyan-400">Lighter</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 -mt-0.5">
                AI Social Engineering Detector
              </p>
            </div>
          </div>

          {/* Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-cyan-400 font-medium">
              Powered by AI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
