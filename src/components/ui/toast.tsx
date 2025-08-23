
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

type ToastVariant = 'success' | 'error';

interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  onClose?: () => void;
  show?: boolean;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  variant = 'success', 
  title, 
  description, 
  onClose, 
  show = false,
  duration = 2000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const variants = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      titleColor: 'text-green-900',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200', 
      textColor: 'text-red-800',
      titleColor: 'text-red-900',
      icon: XCircle,
      iconColor: 'text-red-500'
    }
  };

  const config = variants[variant] || variants.success;
  const IconComponent = config.icon;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!show && !isVisible) return null;

  return (
    <div 
      className={`
        fixed top-4 right-4 z-50 
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`
        ${config.bgColor} 
        ${config.borderColor}
        border 
        rounded-lg 
        shadow-lg 
        p-4 
        w-96
        backdrop-blur-sm
      `}>
        <div className="flex items-start space-x-3">
          <div className={`${config.iconColor} mt-0.5 flex-shrink-0`}>
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`font-semibold text-sm ${config.titleColor} mb-1 leading-tight`}>
                {title}
              </h4>
            )}
            {description && (
              <p className={`text-sm ${config.textColor} leading-relaxed`}>
                {description}
              </p>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className={`${config.textColor} hover:opacity-70 transition-opacity duration-200 flex-shrink-0`}
            aria-label="Close toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};