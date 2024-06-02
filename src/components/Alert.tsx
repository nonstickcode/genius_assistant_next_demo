import React, { useEffect } from 'react';

interface AlertProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="absolute bottom-full left-1/6 transform -translate-x-1/2 mb-2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
};

export default Alert;
