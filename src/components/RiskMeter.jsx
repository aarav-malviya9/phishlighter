'use client';

import { useEffect, useState } from 'react';

const SEVERITY_COLORS = {
  LOW: { bar: 'bg-green-500', glow: 'shadow-green-500/30', text: 'text-green-400', label: 'Low Risk' },
  MEDIUM: { bar: 'bg-yellow-500', glow: 'shadow-yellow-500/30', text: 'text-yellow-400', label: 'Medium Risk' },
  HIGH: { bar: 'bg-orange-500', glow: 'shadow-orange-500/30', text: 'text-orange-400', label: 'High Risk' },
  CRITICAL: { bar: 'bg-red-500', glow: 'shadow-red-500/30', text: 'text-red-400', label: 'Critical Risk' },
};

export default function RiskMeter({ riskScore, riskLevel, isLegitimate }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const colors = SEVERITY_COLORS[riskLevel] || SEVERITY_COLORS.LOW;

  useEffect(() => {
    setAnimatedScore(0);
    const timer = setTimeout(() => {
      const duration = 1200;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedScore(Math.round(riskScore * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 200);
    return () => clearTimeout(timer);
  }, [riskScore]);

  if (isLegitimate) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 sm:p-5 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-green-400 font-bold text-lg">Appears Legitimate</p>
            <p className="text-green-300/70 text-sm">No social engineering tactics detected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Threat Level</p>
          <p className={`text-lg font-bold ${colors.text}`}>{colors.label}</p>
        </div>
        <div className="text-right">
          <span className={`text-4xl font-black tabular-nums ${colors.text}`}>
            {animatedScore}
          </span>
          <span className="text-lg text-slate-500 font-medium">/100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colors.bar} shadow-lg ${colors.glow} transition-all duration-1000 ease-out`}
          style={{ width: `${animatedScore}%` }}
        />
      </div>

      {/* Scale markers */}
      <div className="flex justify-between mt-1 text-[10px] text-slate-600">
        <span>Safe</span>
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Critical</span>
      </div>
    </div>
  );
}
