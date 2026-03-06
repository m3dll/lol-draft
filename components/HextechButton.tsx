import React from 'react';

interface HextechButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const HextechButton: React.FC<HextechButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "relative px-6 py-2 font-bold uppercase tracking-widest title-font transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";
  
  const variants = {
    primary: "text-[#010a13] bg-gradient-to-r from-[#c89b3c] to-[#f0e6d2] hover:from-[#f0e6d2] hover:to-[#c89b3c] border border-[#f0e6d2]",
    secondary: "text-[#c8aa6e] bg-transparent border border-[#c8aa6e] hover:bg-[rgba(200,170,110,0.1)]",
    danger: "text-[#f0e6d2] bg-gradient-to-r from-[#7e1618] to-[#e33237] hover:from-[#e33237] hover:to-[#7e1618] border border-[#e33237]"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
        {children}
      </span>
    </button>
  );
};
