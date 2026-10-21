import React, { Component } from 'react';

/**
 * Reusable ErrorBoundary Component
 * Catches JavaScript errors anywhere in its child component tree,
 * logs errors safely, and displays a graceful fallback UI matching
 * the portfolio's black, orange, and white design system.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch details & component stack
    this.setState({ errorInfo });

    // Development debugging logs without leaking user data
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary caught error]:', error);
      console.error('[Component Stack]:', errorInfo?.componentStack);
    }

    // Optional external reporting callback
    if (typeof this.props.onError === 'function') {
      try {
        this.props.onError(error, errorInfo);
      } catch (err) {
        console.error('Error reporting callback failed:', err);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Automatically reset error boundary if resetKey changes (e.g., activeTab changes)
    if (this.state.hasError && this.props.resetKey !== undefined && this.props.resetKey !== prevProps.resetKey) {
      this.handleReset();
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  };

  handleGoHome = () => {
    this.handleReset();
    window.location.hash = '#home';
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  render() {
    if (this.state.hasError) {
      // Allow custom fallback prop if provided
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset,
          goHome: this.handleGoHome,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = Boolean(import.meta.env.DEV);
      const sectionName = this.props.sectionName || null;

      // Default high-polish Fallback UI matching the portfolio theme
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[50vh] w-full flex items-center justify-center p-4 sm:p-6 my-auto select-none"
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 sm:p-8 text-center border transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: '#120a07',
              borderColor: '#332219',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(213, 124, 99, 0.12)',
            }}
          >
            {/* Ambient orange background glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none filter blur-3xl opacity-30"
              style={{ backgroundColor: '#D57C63' }}
            />

            {/* Warning Shield Icon */}
            <div className="relative mx-auto mb-5 w-16 h-16 rounded-2xl bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,122,26,0.2)]">
              <svg
                className="w-8 h-8 text-[#ff7a1a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            {/* Error Heading */}
            <h2 className="relative text-2xl sm:text-3xl font-bold text-[#f7ede3] tracking-tight mb-2">
              {sectionName ? `Unable to load ${sectionName}` : 'Something Went Wrong'}
            </h2>

            {/* Friendly message for visitors */}
            <p className="relative text-sm sm:text-base text-[#bcab9e] leading-relaxed mb-6 max-w-md mx-auto">
              An unexpected error occurred while rendering this section. Don't worry — your data and active session are safe.
            </p>

            {/* Action Buttons */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              {/* Try Again Button */}
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#D57C63] to-[#ff7a1a] hover:from-[#e58a72] hover:to-[#ff9245] shadow-[0_4px_18px_rgba(213,124,99,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>Try Again</span>
              </button>

              {/* Back to Home Button */}
              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-[#bcab9e] hover:text-[#f7ede3] bg-[#1a110d] hover:bg-[#261913] border border-[#332219] hover:border-[#ff7a1a]/50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span>Return to Home</span>
              </button>
            </div>

            {/* Development Debug Accordion (Never rendered in Production) */}
            {isDev && this.state.error && (
              <details className="mt-6 text-left border-t border-[#332219] pt-4">
                <summary className="text-xs font-mono text-[#ff7a1a] cursor-pointer hover:underline focus:outline-none">
                  Developer Diagnostics (Dev Only)
                </summary>
                <div className="mt-3 p-3 rounded-lg bg-[#070402] border border-[#2e1911] text-[11px] font-mono text-orange-200/90 overflow-x-auto max-h-48 space-y-2">
                  <div>
                    <span className="text-red-400 font-bold">Error:</span> {this.state.error?.toString()}
                  </div>
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <span className="text-orange-400 font-bold">Component Stack:</span>
                      <pre className="whitespace-pre-wrap text-[10px] text-slate-400 mt-1 leading-tight">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
