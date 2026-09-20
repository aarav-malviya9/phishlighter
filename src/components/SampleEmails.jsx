'use client';

import { sampleEmails } from '@/lib/mockData';

export default function SampleEmails({ onSelect, disabled }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
        Try a sample email
      </p>
      <div className="flex flex-wrap gap-2">
        {sampleEmails.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSelect(sample)}
            disabled={disabled}
            className={`
              group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              border border-phish-border bg-phish-card
              hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-400
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              ${sample.id === 'legitimate' ? 'text-green-400' : 'text-slate-300'}
            `}
          >
            <span>{sample.icon}</span>
            <span>{sample.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
