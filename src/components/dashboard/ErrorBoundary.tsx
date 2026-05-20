"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Dashboard error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8">
            <div className="brutal-card p-8 border-[var(--color-red)] bg-red-50">
              <h2 className="font-display text-2xl mb-4">Ceva nu a mers bine</h2>
              <p className="font-mono text-sm text-[var(--color-muted)] mb-6">
                A apărut o eroare neașteptată. Încearcă să reîmprospătezi pagina.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-brutal text-xs"
              >
                Reîncarcă pagina
              </button>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <pre className="mt-6 p-4 bg-[var(--color-bg-alt)] font-mono text-xs overflow-auto">
                  {this.state.error.message}
                </pre>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
