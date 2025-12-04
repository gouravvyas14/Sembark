import React from 'react';

interface ToastProps {
    message: string;
    visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => {
    if (!visible) return null;

    return (
        <div className="toast-root" role="status" aria-live="polite">
            <div className="toast-card toast-success">
                <div className="toast-icon" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12.5l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                </div>
                <div className="toast-content">{message}</div>
            </div>
        </div>
    );
};

export default Toast;
