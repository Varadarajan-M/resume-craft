import { Component, ErrorInfo, ReactElement, ReactNode } from "react";

interface PDFErrorBoundaryState {
  hasError: boolean;
  errorKey: number;
}

interface PDFErrorBoundaryProps {
  children: ReactElement; // The PDF document component
  fallback?: ReactNode; // Optional custom UI on error
  onError?: (error: Error, errorInfo: ErrorInfo) => void; // Optional hook
  retryDelay?: number; // Optional delay before retry (default: 1000ms)
}

class PDFErrorBoundary extends Component<
  PDFErrorBoundaryProps,
  PDFErrorBoundaryState
> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: PDFErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorKey: 0 };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<PDFErrorBoundaryState> {
    const msg = error.message || "";
    // Only handle React-PDF errors
    if (
      msg.toLowerCase().includes("eo is not a function") ||
      msg.toLowerCase().includes("cannot read properties of undefined") ||
      msg.toLowerCase().includes("canvas") ||
      msg.toLowerCase().includes("pdf") ||
      (error.stack && error.stack.toLowerCase().includes("react-pdf"))
    ) {
      return { hasError: true };
    }
    // Re-throw non-PDF errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    console.warn(
      "PDFErrorBoundary caught an error:",
      error.message,
      errorInfo.componentStack
    );

    // Schedule a retry after a brief delay
    const delay = this.props.retryDelay || 1000;
    this.retryTimeout = setTimeout(() => {
      this.setState((prev) => ({
        hasError: false,
        errorKey: prev.errorKey + 1,
      }));
      location.reload(); // Optionally reload the page
    }, delay);
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    const { fallback } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div style={{ padding: 20, textAlign: "center", color: "#333" }}>
          {fallback || <p>PDF generation failed. Recreating document…</p>}
        </div>
      );
    }

    // Force re-render by using errorKey as key
    return this.props.children;
  }
}

export default PDFErrorBoundary;
