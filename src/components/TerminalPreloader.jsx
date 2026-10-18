import React, { useState, useEffect, useRef } from 'react';

const LINES = [
  { label: 'initializing portfolio...', status: 'ok' },
  { label: 'loading assets...', status: 'done' },
  { label: 'compiling components...', status: '8/8' },
  { label: 'establishing connection...', status: 'ok' },
  { label: 'loading developer profile...', status: 'Rahila Kareem' },
  { label: 'system ready', status: '' }
];

export default function TerminalPreloader({ onComplete }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedCount, setTypedCount] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const completedRef = useRef(false);

  // Lock body scroll during preloader
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const finishPreloader = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  // Keyboard shortcut (ESC, Space, Enter) to skip immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) {
        finishPreloader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Line-by-line typing engine
  useEffect(() => {
    if (currentLineIndex >= LINES.length) {
      // All lines finished typing -> show blinking cursor for a brief moment then open website
      const timer = setTimeout(() => {
        finishPreloader();
      }, 500);
      return () => clearTimeout(timer);
    }

    const currentLine = LINES[currentLineIndex];
    const fullText = currentLine.label + (currentLine.status ? ' ' + currentLine.status : '');

    if (typedCount < fullText.length) {
      // Snappy typing speed per character (14ms for fast, high-tech cadence)
      const timeout = setTimeout(() => {
        setTypedCount((prev) => prev + 1);
      }, 14);
      return () => clearTimeout(timeout);
    } else {
      // Current line completed -> slight pause then advance to next line
      const pauseDuration = currentLineIndex === LINES.length - 1 ? 300 : 75;
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setTypedCount(0);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, typedCount]);

  // Compute what to display for current typing line
  const currentLine = LINES[currentLineIndex] || null;
  let currentLabelPart = '';
  let currentStatusPart = '';
  if (currentLine) {
    if (typedCount <= currentLine.label.length) {
      currentLabelPart = currentLine.label.slice(0, typedCount);
    } else {
      currentLabelPart = currentLine.label;
      const statusChars = typedCount - currentLine.label.length - 1; // subtract space
      if (statusChars > 0) {
        currentStatusPart = currentLine.status.slice(0, statusChars);
      }
    }
  }

  return (
    <div
      onClick={finishPreloader}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.02] filter blur-[3px] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#030706',
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 50% 45%, rgba(16, 185, 129, 0.12) 0%, rgba(3, 7, 6, 0.96) 65%, #020504 100%),
          repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0.3) 1px, transparent 1px, transparent 2px)
        `
      }}
      title="Click anywhere to skip"
    >
      {/* Terminal Container */}
      <div 
        className="w-full max-w-2xl px-6 sm:px-8 py-6 font-mono text-[14px] sm:text-[16px] leading-relaxed tracking-wide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-emerald-950/60 text-slate-400 text-xs sm:text-sm">
          {/* 3 Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] inline-block" />
          </div>

          {/* Prompt Label */}
          <div className="flex items-center gap-1.5 text-slate-400 ml-1">
            <span className="text-emerald-400 font-bold">&gt;_</span>
            <span className="text-slate-400">rahila@portfolio:</span>
            <span className="text-slate-300">~/dev</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="pt-6 pb-2 space-y-3 min-h-[220px]">
          {/* Completed Lines */}
          {completedLines.map((line, idx) => (
            <div key={idx} className="flex items-center flex-wrap gap-x-2">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className={idx === 5 ? "text-emerald-400 font-semibold" : "text-emerald-400"}>
                {line.label}
              </span>
              {line.status && (
                <span className={idx === 4 ? "text-slate-300 font-medium ml-1" : "text-slate-500 font-normal ml-1"}>
                  {line.status}
                </span>
              )}
              {/* Keep blinking cursor on last line after system ready is done */}
              {idx === LINES.length - 1 && currentLineIndex >= LINES.length && (
                <span className="inline-block w-2.5 h-5 bg-emerald-400 animate-pulse ml-1 align-middle shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              )}
            </div>
          ))}

          {/* Currently Typing Line */}
          {currentLine && (
            <div className="flex items-center flex-wrap gap-x-2">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className={currentLineIndex === 5 ? "text-emerald-400 font-semibold" : "text-emerald-400"}>
                {currentLabelPart}
              </span>
              {currentStatusPart && (
                <span className={currentLineIndex === 4 ? "text-slate-300 font-medium ml-1" : "text-slate-500 font-normal ml-1"}>
                  {currentStatusPart}
                </span>
              )}
              {/* Blinking Cyan/Emerald Block Cursor */}
              <span className="inline-block w-2.5 h-5 bg-emerald-400 animate-pulse ml-0.5 align-middle shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            </div>
          )}
        </div>

        {/* Bottom Status Underline (matches screenshot) */}
        <div className="mt-4 pt-1 relative w-full">
          <div className="w-full h-[1px] bg-emerald-950/40" />
          <div className="absolute top-1 left-0 w-64 sm:w-80 h-[1.5px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        </div>

        {/* Subtle Skip Hint at bottom */}
        <div className="mt-8 flex items-center justify-between text-[11px] text-emerald-500/30 tracking-wider">
          <span>PORTFOLIO TERMINAL v2.4</span>
          <button
            onClick={finishPreloader}
            className="hover:text-emerald-400/80 transition-colors uppercase cursor-pointer"
          >
            [ click anywhere to skip ]
          </button>
        </div>
      </div>
    </div>
  );
}
