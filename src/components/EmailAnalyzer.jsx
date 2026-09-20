'use client';

import { useState, useCallback } from 'react';
import SampleEmails from './SampleEmails';
import HighlightedText from './HighlightedText';
import RiskMeter from './RiskMeter';
import TacticCard from './TacticCard';

export default function EmailAnalyzer() {
  const [emailText, setEmailText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [activeTacticId, setActiveTacticId] = useState(null);
  const [currentSampleId, setCurrentSampleId] = useState(null);

  const handleAnalyze = useCallback(async (text, sampleId) => {
    if (!text || text.trim().length === 0) return;

    setError(null);
    setAnalysis(null);
    setIsAnalyzing(true);
    setIsScanning(true);
    setActiveTacticId(null);

    // Keep scanning animation for at least 1.5s for visual effect
    const scanPromise = new Promise((r) => setTimeout(r, 1500));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailText: text, sampleId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      await scanPromise; // Wait for scan animation
      setIsScanning(false);

      // Small delay before showing results for smooth transition
      await new Promise((r) => setTimeout(r, 300));
      setAnalysis(data);
    } catch (err) {
      await scanPromise;
      setIsScanning(false);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleSampleSelect = useCallback(
    (sample) => {
      setEmailText(sample.content);
      setCurrentSampleId(sample.id);
      setAnalysis(null);
      setError(null);
      // Auto-analyze after a brief pause
      setTimeout(() => handleAnalyze(sample.content, sample.id), 200);
    },
    [handleAnalyze]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleAnalyze(emailText, currentSampleId);
    },
    [emailText, currentSampleId, handleAnalyze]
  );

  const handleClear = useCallback(() => {
    setEmailText('');
    setAnalysis(null);
    setError(null);
    setCurrentSampleId(null);
    setActiveTacticId(null);
  }, []);

  const hasResults = analysis && !isAnalyzing;
  const tacticsCount = analysis?.tactics?.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Hero text */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Detect Social Engineering in Seconds
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Paste any email or message below. PhishLighter uses AI to identify
          psychological manipulation tactics and highlights the exact phrases
          designed to trick you.
        </p>
      </div>

      {/* Sample emails */}
      <div className="mb-6">
        <SampleEmails onSelect={handleSampleSelect} disabled={isAnalyzing} />
      </div>

      {/* Main content area */}
      <div className={`grid gap-6 ${hasResults ? 'lg:grid-cols-5' : 'lg:grid-cols-1 max-w-3xl mx-auto'}`}>
        {/* Left: Email input / highlighted text */}
        <div className={hasResults ? 'lg:col-span-3' : ''}>
          <div className="bg-phish-card border border-phish-border rounded-2xl overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-phish-border bg-phish-dark/50">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-sm font-medium text-slate-400">
                  {hasResults ? 'Analysis Results' : 'Email / Message'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {analysis?.source && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 uppercase tracking-wider">
                    {analysis.source === 'groq'
                      ? '⚡ AI (Groq)'
                      : analysis.source === 'ollama'
                        ? '🦙 AI (Ollama)'
                        : analysis.source === 'demo'
                          ? '📋 Demo Mode'
                          : '🔍 Heuristic'}
                  </span>
                )}
                {emailText && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    disabled={isAnalyzing}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 min-h-[300px]">
              {hasResults ? (
                <HighlightedText
                  text={emailText}
                  tactics={analysis.tactics}
                  activeTacticId={activeTacticId}
                  onTacticHover={setActiveTacticId}
                  onTacticLeave={() => setActiveTacticId(null)}
                  isScanning={false}
                />
              ) : isScanning ? (
                <HighlightedText
                  text={emailText}
                  tactics={[]}
                  isScanning={true}
                />
              ) : (
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={emailText}
                    onChange={(e) => {
                      setEmailText(e.target.value);
                      setCurrentSampleId(null);
                    }}
                    placeholder="Paste a suspicious email or message here...&#10;&#10;For example:&#10;&quot;Dear Customer, Your account has been compromised. Click here immediately to verify your identity or your account will be permanently suspended within 24 hours...&quot;"
                    className="w-full h-64 sm:h-72 bg-transparent text-slate-300 text-sm font-mono placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
                    disabled={isAnalyzing}
                  />
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-phish-border">
                    <span className="text-xs text-slate-600">
                      {emailText.length > 0
                        ? `${emailText.length.toLocaleString()} characters`
                        : 'Paste an email or select a sample above'}
                    </span>
                    <button
                      type="submit"
                      disabled={!emailText.trim() || isAnalyzing}
                      className="
                        flex items-center gap-2 px-5 py-2.5 rounded-xl
                        bg-gradient-to-r from-cyan-500 to-blue-600
                        hover:from-cyan-400 hover:to-blue-500
                        disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500
                        text-white text-sm font-semibold
                        shadow-lg shadow-cyan-500/20
                        disabled:shadow-none
                        transition-all duration-200
                        disabled:cursor-not-allowed
                      "
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      Analyze Email
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Legitimate reasons panel */}
          {hasResults && analysis.isLegitimate && analysis.legitimateReasons && (
            <div className="mt-4 bg-green-500/5 border border-green-500/20 rounded-xl p-4 animate-slide-up">
              <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why this appears safe:
              </h4>
              <ul className="space-y-1">
                {analysis.legitimateReasons.map((reason, i) => (
                  <li key={i} className="text-xs text-green-300/70 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back / Re-analyze buttons */}
          {hasResults && (
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-slate-400 border border-phish-border hover:border-slate-500 hover:text-slate-300 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Analyze Another
              </button>
              <button
                onClick={() => handleAnalyze(emailText, currentSampleId)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Re-analyze
              </button>
            </div>
          )}
        </div>

        {/* Right: Analysis sidebar */}
        {hasResults && (
          <div className="lg:col-span-2 space-y-4">
            {/* Risk Meter */}
            <div className="bg-phish-card border border-phish-border rounded-2xl p-4 sm:p-5">
              <RiskMeter
                riskScore={analysis.riskScore}
                riskLevel={analysis.riskLevel}
                isLegitimate={analysis.isLegitimate}
              />
            </div>

            {/* Summary */}
            <div className="bg-phish-card border border-phish-border rounded-2xl p-4 sm:p-5 animate-fade-in">
              <h3 className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">
                Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Tactics list */}
            {tacticsCount > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    Tactics Detected
                  </h3>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                    {tacticsCount} found
                  </span>
                </div>
                <div className="space-y-3">
                  {analysis.tactics.map((tactic, i) => (
                    <TacticCard
                      key={tactic.id || i}
                      tactic={tactic}
                      index={i}
                      isActive={activeTacticId === tactic.id}
                      onHover={setActiveTacticId}
                      onLeave={() => setActiveTacticId(null)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="mt-6 max-w-3xl mx-auto bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isAnalyzing && (
        <div className="mt-6 flex items-center justify-center gap-3 text-cyan-400 animate-fade-in">
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm font-medium">
            Scanning for manipulation tactics...
          </span>
        </div>
      )}
    </div>
  );
}
