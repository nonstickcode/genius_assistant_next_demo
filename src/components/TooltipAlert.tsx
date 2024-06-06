import React, { useEffect } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'; // Ensure this import path matches your project structure

interface TooltipAlertProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
}

const TooltipAlert: React.FC<TooltipAlertProps> = ({ message, duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 mb-2">
          <div className="px-4 py-2 bg-gray-800 text-white rounded shadow-lg">
            {message}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {message}
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipAlert;
