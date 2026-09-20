'use client';

import { useState } from 'react';

const SEVERITY_STYLES = {
  critical: {
    border: 'border-red-500/40',
    bg: 'bg-red-500/5',
    badge: 'bg-red-500/20 text-red-400',
    icon: '🔴',
  },
  high: {
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/5',
    badge: 'bg-orange-500/20 text-orange-400',
    icon: '🟠',
  },
  medium: {
    border: 'border-yellow-500/40',
    bg: 'bg-yellow-500/5',
    badge: 'bg-yellow-500/20 text-yellow-400',
    icon: '🟡',
  },
  low: {
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/5',
    badge: 'bg-blue-500/20 text-blue-400',
    icon: '🔵',
  },
};

export default function TacticCard({ tactic, index, isActive, onHover, onLeave }) {
  const styles = SEVERITY_STYLES[tactic.severity] || SEVERITY_STYLES.medium;

  return (
    <div
      className={`
        rounded-xl border p-3 sm:p-4 transition-all duration-300 cursor-pointer
        ${styles.border} ${styles.bg}
        ${isActive ? 'ring-2 ring-cyan-400/50 scale-[1.02]' : 'hover:scale-[1.01]'}
        animate-slide-up
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => onHover?.(tactic.id)}
      onMouseLeave={() => onLeave?.()}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm flex-shrink-0">{styles.icon}</span>
          <h4 className="text-sm font-semibold text-white truncate">{tactic.tactic}</h4>
        </div>
        <span
          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${styles.badge}`}
        >
          {tactic.severity}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-xs text-slate-400 italic border-l-2 border-slate-600 pl-3 mb-2 line-clamp-2">
        &ldquo;{tactic.quote}&rdquo;
      </blockquote>

      {/* Explanation */}
      <p className="text-xs text-slate-300 leading-relaxed">
        {tactic.explanation}
      </p>
    </div>
  );
}
