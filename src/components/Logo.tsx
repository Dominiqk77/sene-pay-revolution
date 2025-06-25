
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
  interactive?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  showText = true, 
  variant = 'default',
  interactive = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const textColorClasses = {
    default: 'gradient-text',
    white: 'text-white',
    dark: 'text-senepay-dark'
  };

  return (
    <div className={cn(
      'flex items-center space-x-2',
      interactive && 'transition-all duration-500 hover:scale-110 cursor-pointer group',
      className
    )}>
      {/* Logo Image avec animations premium */}
      <div className={cn(
        sizeClasses[size],
        'relative overflow-hidden rounded-xl',
        interactive && 'transform transition-all duration-500 group-hover:rotate-12 group-hover:shadow-2xl'
      )}>
        <img 
          src="/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png"
          alt="SenePay Logo"
          className={cn(
            'w-full h-full object-cover',
            interactive && 'transition-all duration-500 group-hover:scale-110'
          )}
        />
        {interactive && (
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>

      {/* Texte du logo */}
      {showText && (
        <span className={cn(
          textSizeClasses[size],
          textColorClasses[variant],
          'font-bold tracking-tight',
          interactive && 'transition-all duration-500 group-hover:tracking-wide'
        )}>
          SenePay
        </span>
      )}
    </div>
  );
};

export default Logo;
