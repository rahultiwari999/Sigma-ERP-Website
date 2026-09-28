import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-soft hover:shadow-card active:scale-[0.98]',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]',
  ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98]',
  white:
    'bg-white text-brand-700 hover:bg-brand-50 shadow-soft hover:shadow-card active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
