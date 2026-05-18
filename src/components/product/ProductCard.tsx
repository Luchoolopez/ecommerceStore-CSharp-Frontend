import React from 'react';
import { Typography } from '../ui';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  onClick?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={`border border-outline cursor-pointer group flex flex-col rounded-none ${className}`}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden border-b border-outline">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-6 bg-surface group-hover:bg-surface-bright transition-colors">
        <Typography variant="body-lg" as="h3" className="text-on-surface line-clamp-1">
          {name}
        </Typography>
        <Typography variant="label-caps" as="span" className="text-on-surface">
          ${price.toFixed(2)}
        </Typography>
      </div>
    </div>
  );
};
