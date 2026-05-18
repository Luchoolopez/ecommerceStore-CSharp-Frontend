import React from 'react';

type Variant = 'headline-xl' | 'headline-lg' | 'headline-md' | 'body-lg' | 'body-md' | 'label-caps';

interface TypographyProps {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const variantStyles: Record<Variant, string> = {
  'headline-xl': 'font-anton text-[120px] font-normal leading-[110px] tracking-[-0.02em] uppercase',
  'headline-lg': 'font-anton text-[80px] font-normal leading-[80px] tracking-[0.01em] uppercase',
  'headline-md': 'font-anton text-[40px] font-normal leading-[44px] uppercase',
  'body-lg': 'font-hanken text-[18px] font-normal leading-[28px]',
  'body-md': 'font-hanken text-[16px] font-normal leading-[24px]',
  'label-caps': 'font-hanken text-[12px] font-bold leading-[16px] tracking-[0.1em] uppercase',
};

const defaultTags: Record<Variant, React.ElementType> = {
  'headline-xl': 'h1',
  'headline-lg': 'h2',
  'headline-md': 'h3',
  'body-lg': 'p',
  'body-md': 'p',
  'label-caps': 'span',
};

export const Typography: React.FC<TypographyProps> = ({ variant, children, className = '', as }) => {
  const Component = as || defaultTags[variant];
  return (
    <Component className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Component>
  );
};
