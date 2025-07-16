import React, { Component, ReactNode } from "react";

interface PDFErrorBoundaryState {
  hasError: boolean;
  errorCount: number;
  lastErrorTime: number;
}

interface PDFErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class PDFErrorBoundary extends Component<
  PDFErrorBoundaryProps,
  PDFErrorBoundaryState
> {
  private retryTimer: NodeJS.Timeout | null = null;
  private readonly maxRetries: number;
  private readonly retryDelay: number;

  constructor(props: PDFErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorCount: 0,
      lastErrorTime: 0,
    };
    this.maxRetries = props.maxRetries || 3;
    this.retryDelay = props.retryDelay || 500;
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<PDFErrorBoundaryState> {
    // Check if it's a React-PDF related error
    const isReactPDFError =
      error.message?.includes("EO is not a function") ||
      error.message?.includes("Cannot read properties of undefined") ||
      error.message?.includes("PDFRenderer") ||
      error.stack?.includes("react-pdf");

    if (isReactPDFError) {
      return {
        hasError: true,
        lastErrorTime: Date.now(),
      };
    }

    // For non-React-PDF errors, let them bubble up
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Log error details for debugging
    console.warn("PDFErrorBoundary caught an error:", {
      error: error.message,
      errorCount: this.state.errorCount + 1,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Update error count
    this.setState((prevState) => ({
      errorCount: prevState.errorCount + 1,
    }));

    // Auto-retry logic
    if (this.state.errorCount < this.maxRetries) {
      this.scheduleRetry();
    }
  }

  private scheduleRetry = () => {
    // Clear any existing timer
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }

    // Schedule retry with exponential backoff
    const delay = this.retryDelay * Math.pow(2, this.state.errorCount);

    this.retryTimer = setTimeout(() => {
      this.setState({
        hasError: false,
      });
    }, delay);
  };

  private handleManualRetry = () => {
    this.setState({
      hasError: false,
      errorCount: 0,
      lastErrorTime: 0,
    });
  };

  private handleReset = () => {
    this.setState({
      hasError: false,
      errorCount: 0,
      lastErrorTime: 0,
    });
  };

  componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError, errorCount } = this.state;

    if (hasError) {
      // Custom fallback UI
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      const isRetrying = errorCount < this.maxRetries;
      const nextRetryIn = this.retryDelay * Math.pow(2, errorCount);

      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            color: "#666",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#f59e0b", marginBottom: "8px" }}
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="m12 17 .01 0" />
            </svg>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              PDF Generation Error
            </h3>
            <p style={{ margin: "0", fontSize: "14px", color: "#888" }}>
              {isRetrying
                ? `Retrying automatically... (${errorCount}/${this.maxRetries})`
                : `Failed after ${this.maxRetries} attempts`}
            </p>
          </div>

          {!isRetrying && (
            <div
              style={{ display: "flex", gap: "8px", justifyContent: "center" }}
            >
              <button
                onClick={this.handleManualRetry}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Retry Now
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Reset
              </button>
            </div>
          )}

          {isRetrying && (
            <div
              style={{
                marginTop: "12px",
                fontSize: "12px",
                color: "#888",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #e0e0e0",
                  borderTop: "2px solid #3b82f6",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <span>Next retry in {Math.round(nextRetryIn / 1000)}s</span>
            </div>
          )}
        </div>
      );
    }

    return children;
  }
}

export default PDFErrorBoundary;

// CSS for spinner animation (add to your global styles)
export const pdfErrorBoundaryStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Hook version for functional components (optional)
export const usePDFErrorHandler = (onError?: (error: Error) => void) => {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes("EO is not a function")) {
        event.preventDefault();
        if (onError) {
          onError(event.error);
        }
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [onError]);
};
