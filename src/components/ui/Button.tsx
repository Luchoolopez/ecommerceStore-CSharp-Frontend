import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'px-8 py-4 uppercase flex items-center justify-center transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:active:scale-100 rounded-none';
  
  const variantStyles = {

    primary: 'bg-primary text-on-primary font-anton text-[24px] hover:scale-[1.03] hover:bg-primary/95',
    secondary: 'bg-transparent text-on-surface border border-on-surface font-hanken text-[16px] font-bold tracking-[0.1em] hover:bg-surface-bright',
  };

  const widthStyle = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};