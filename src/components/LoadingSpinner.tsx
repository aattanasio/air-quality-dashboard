import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center">
            <Loader2
                className={`${sizeClasses[size]} text-blue-500 animate-spin`}
            />
        </div>
    );
}
