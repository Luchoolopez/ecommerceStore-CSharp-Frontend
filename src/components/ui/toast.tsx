import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Typography } from './Typography';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-6 flex flex-col gap-4 z-50 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center justify-between min-w-[300px] p-4 border border-outline bg-surface shadow-[0_4px_0_0_#e5e2e1]
              ${toast.type === 'error' ? 'border-error shadow-[0_4px_0_0_#ffb4ab]' : ''}
              ${toast.type === 'success' ? 'border-green-500 shadow-[0_4px_0_0_#22c55e]' : ''}
            `}
          >
            <Typography variant="body-md" className="text-on-surface">
              {toast.message}
            </Typography>
            <button onClick={() => removeToast(toast.id)} className="text-on-surface hover:text-primary">
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
