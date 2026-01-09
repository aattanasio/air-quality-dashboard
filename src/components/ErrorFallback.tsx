import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Something went wrong</h1>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                        I'm sorry, but the application encountered an unexpected error.
                        Please try again or refresh the page.
                    </p>

                    <details className="bg-red-50/80 border border-red-200 rounded-xl p-4 backdrop-blur-sm">
                        <summary className="cursor-pointer text-sm font-medium text-red-800 mb-2">
                            Error Details
                        </summary>
                        <pre className="text-xs text-red-700 overflow-auto mt-2">
                            {error.message}
                        </pre>
                    </details>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={resetErrorBoundary}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-xl hover:shadow-md transition-all font-medium"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-all font-medium"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}
