/**
 * Error Boundary: catches React crashes and displays a friendly error page
 * instead of a white screen. Shows helpful error message and recovery options.
 * Uses <a href="/"> instead of <Link> so the fallback works when rendered outside Router.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      const message = this.state.error.message || 'Something went wrong.';
      const isDev = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground mb-4">
              We encountered an unexpected error. Please try again or return to the home page.
            </p>
            {isDev && (
              <div className="text-left bg-muted rounded-lg p-4 mb-6">
                <p className="text-xs font-mono text-destructive break-all">{message}</p>
                {this.state.errorInfo && (
                  <pre className="text-xs font-mono text-muted-foreground mt-2 overflow-auto max-h-32 whitespace-pre-wrap break-all">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition-colors"
              >
                <Home className="h-4 w-4" />
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
