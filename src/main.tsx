import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import { ErrorFallback } from './components/ErrorFallback'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset any app state here if needed
        window.location.href = '/';
      }}
      onError={(error, errorInfo) => {
        // Log error to console or error tracking service
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
