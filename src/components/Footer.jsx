'use client';

export default function Footer() {
  return (
    <footer className="border-t border-phish-border bg-phish-card/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            Built for{' '}
            <span className="text-cyan-400 font-medium">
              TLN Cybersecurity Challenge 2026
            </span>
          </p>
          <p>
            PhishLighter uses AI to detect psychological manipulation — it does
            not replace professional security advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
