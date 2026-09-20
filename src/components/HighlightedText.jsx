'use client';

import { useMemo, useState } from 'react';

const SEVERITY_HIGHLIGHT = {
  critical: {
    bg: 'bg-red-500/20',
    border: 'border-b-2 border-red-500',
    hoverBg: 'hover:bg-red-500/30',
    tooltipBorder: 'border-red-500/50',
    text: 'text-red-300',
  },
  high: {
    bg: 'bg-orange-500/20',
    border: 'border-b-2 border-orange-500',
    hoverBg: 'hover:bg-orange-500/30',
    tooltipBorder: 'border-orange-500/50',
    text: 'text-orange-300',
  },
  medium: {
    bg: 'bg-yellow-500/15',
    border: 'border-b-2 border-yellow-500',
    hoverBg: 'hover:bg-yellow-500/25',
    tooltipBorder: 'border-yellow-500/50',
    text: 'text-yellow-300',
  },
  low: {
    bg: 'bg-blue-500/15',
    border: 'border-b-2 border-blue-500',
    hoverBg: 'hover:bg-blue-500/25',
    tooltipBorder: 'border-blue-500/50',
    text: 'text-blue-300',
  },
};

/**
 * Build an array of text segments from the original text and tactic quotes.
 * Each segment is either plain text or a highlighted quote.
 */
function buildSegments(originalText, tactics) {
  if (!tactics || tactics.length === 0) {
    return [{ text: originalText, type: 'plain' }];
  }

  // Find all quote positions — use case-insensitive search as fallback
  const highlights = [];
  for (const tactic of tactics) {
    if (!tactic.quote) continue;
    let startIndex = originalText.indexOf(tactic.quote);
    if (startIndex === -1) {
      // Try case-insensitive
      startIndex = originalText.toLowerCase().indexOf(tactic.quote.toLowerCase());
    }
    if (startIndex !== -1) {
      highlights.push({
        start: startIndex,
        end: startIndex + tactic.quote.length,
        tactic,
      });
    }
  }

  if (highlights.length === 0) {
    return [{ text: originalText, type: 'plain' }];
  }

  // Sort by start position
  highlights.sort((a, b) => a.start - b.start);

  // Remove overlaps — keep the first one in case of overlap
  const merged = [highlights[0]];
  for (let i = 1; i < highlights.length; i++) {
    const prev = merged[merged.length - 1];
    if (highlights[i].start >= prev.end) {
      merged.push(highlights[i]);
    }
    // Skip overlapping highlights
  }

  // Build segments
  const segments = [];
  let pos = 0;
  for (const h of merged) {
    if (h.start > pos) {
      segments.push({ text: originalText.slice(pos, h.start), type: 'plain' });
    }
    segments.push({
      text: originalText.slice(h.start, h.end),
      type: 'highlight',
      tactic: h.tactic,
    });
    pos = h.end;
  }
  if (pos < originalText.length) {
    segments.push({ text: originalText.slice(pos), type: 'plain' });
  }

  return segments;
}

function Tooltip({ tactic, position }) {
  const styles = SEVERITY_HIGHLIGHT[tactic.severity] || SEVERITY_HIGHLIGHT.medium;

  return (
    <div
      className={`
        absolute z-50 w-72 p-3 rounded-xl
        bg-slate-900/95 backdrop-blur-sm border ${styles.tooltipBorder}
        shadow-2xl shadow-black/50
        animate-fade-in
        pointer-events-none
      `}
      style={{
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '8px',
      }}
    >
      {/* Arrow */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid rgba(100, 116, 139, 0.5)',
        }}
      />

      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-xs font-bold uppercase ${styles.text}`}>
          {tactic.tactic}
        </span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">
        {tactic.explanation}
      </p>
    </div>
  );
}

export default function HighlightedText({
  text,
  tactics,
  activeTacticId,
  onTacticHover,
  onTacticLeave,
  isScanning,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const segments = useMemo(() => buildSegments(text, tactics), [text, tactics]);

  return (
    <div className="relative">
      {/* Scanning overlay */}
      {isScanning && (
        <div className="absolute inset-0 z-10 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent animate-scan" />
        </div>
      )}

      {/* Email text with highlights */}
      <div
        className={`
          font-mono text-sm leading-relaxed whitespace-pre-wrap break-words
          text-slate-300
          ${isScanning ? 'opacity-70' : ''}
          transition-opacity duration-300
        `}
      >
        {segments.map((segment, i) => {
          if (segment.type === 'plain') {
            return (
              <span
                key={i}
                className={`transition-opacity duration-300 ${
                  activeTacticId && !hoveredId ? 'opacity-40' : ''
                }`}
              >
                {segment.text}
              </span>
            );
          }

          const tactic = segment.tactic;
          const styles =
            SEVERITY_HIGHLIGHT[tactic.severity] || SEVERITY_HIGHLIGHT.medium;
          const isActive =
            activeTacticId === tactic.id || hoveredId === tactic.id;
          const isDimmed = (activeTacticId || hoveredId) && !isActive;

          return (
            <span
              key={i}
              className="relative inline"
              onMouseEnter={() => {
                setHoveredId(tactic.id);
                onTacticHover?.(tactic.id);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                onTacticLeave?.();
              }}
            >
              <mark
                className={`
                  relative cursor-pointer rounded-sm px-0.5 -mx-0.5
                  ${styles.bg} ${styles.border} ${styles.hoverBg}
                  ${isActive ? 'ring-1 ring-white/20 brightness-125' : ''}
                  ${isDimmed ? 'opacity-30' : ''}
                  transition-all duration-200
                  no-highlight-color
                `}
              >
                {segment.text}
              </mark>
              {hoveredId === tactic.id && <Tooltip tactic={tactic} />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
