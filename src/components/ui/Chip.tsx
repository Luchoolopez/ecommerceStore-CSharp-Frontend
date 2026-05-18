import React from 'react';
import { Typography } from './Typography';

interface ChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  isActive = false,
  onClick,
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 border cursor-pointer transition-colors flex items-center justify-center rounded-none';
  const activeStyles = isActive
    ? 'border-primary bg-primary text-on-primary'
    : 'border-outline bg-transparent text-on-surface hover:border-primary';

  return (
    <div className={`${baseStyles} ${activeStyles} ${className}`} onClick={onClick}>
      <Typography variant="label-caps" as="span">
        {label}
      </Typography>
    </div>
  );
};
