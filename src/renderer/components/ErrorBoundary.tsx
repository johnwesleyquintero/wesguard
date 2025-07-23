import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorId: "",
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    console.error(error);
    return { 
      hasError: true, 
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo);
    
    // Log to AI optimization service if available
    if (window.electronAPI?.aiOptimization) {
      window.electronAPI.aiOptimization.logCrash({
        timestamp: new Date().toISOString(),
        appName: "WesGuard",
        message: error.message,
        stackTrace: error.stack,
        severity: "high",
      });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    });
  };

  private handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorReport = {
      id: errorId,
      timestamp: new Date().toISOString(),
      error: {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
      },
      errorInfo: {
        componentStack: errorInfo?.componentStack,
      },
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    // In a real app, you would send this to your error reporting service
    console.log("Error Report:", errorReport);
    
    // Copy to clipboard for user to report
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => alert("Error report copied to clipboard"))
      .catch(() => console.error("Failed to copy error report"));
  };
  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="max-w-2xl w-full p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-destructive mb-4">
                Something went wrong
              </h1>
              <p className="text-muted-foreground mb-6">
                We're sorry, but something unexpected happened. The error has been logged 
                and our team will investigate.
              </p>
              
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Error Details (Development Mode)
                  </summary>
                  <div className="bg-muted p-4 rounded-md overflow-auto">
                    <p className="font-mono text-sm text-destructive mb-2">
                      {this.state.error.message}
                    </p>
                    <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                    {this.state.errorInfo && (
                      <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap mt-4">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={this.handleRetry} variant="default">
                  Try Again
                </Button>
                <Button onClick={this.handleReportError} variant="outline">
                  Report Error
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="secondary"
                >
                  Reload Page
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Error ID: {this.state.errorId}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
