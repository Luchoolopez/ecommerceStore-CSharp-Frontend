import React from 'react';
import { Typography } from './Typography';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <Typography variant="label-caps" as="label" className="text-on-surface">
          {label}
        </Typography>
        <input
          ref={ref}
          className={`
            bg-transparent border border-outline px-4 py-3 rounded-none
            text-on-surface font-hanken text-[16px] outline-none
            focus:border-primary transition-colors
            ${error ? 'border-error focus:border-error' : ''}
          `}
          {...props}
        />
        {error && (
          <Typography variant="body-md" as="span" className="text-error text-sm">
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
