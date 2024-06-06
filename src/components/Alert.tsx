import React from 'react';
import { Button } from './ui/button';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-black mb-4">Alert</h2>
        <p className="mb-4 text-black">{message}</p>
        <Button
          variant="default"
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default Alert;
