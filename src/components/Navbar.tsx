import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onNavClick: (view: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, currentView }) => {
  return (
    <nav className="flex justify-center space-x-8 p-4 bg-black text-white font-semibold">
      <Button
        variant="ghost"
        onClick={() => onNavClick('topSongs')}
        className={`hover:bg-black hover:text-white hover:font-extrabold text-xl ${currentView === 'topSongs' ? 'text-green-500' : ''}`}
      >
        Fetch Top Songs
      </Button>
      <Button
        variant="ghost"
        onClick={() => onNavClick('lyrics')}
        className={`hover:bg-black hover:text-white hover:font-extrabold text-xl ${currentView === 'lyrics' ? 'text-green-500' : ''}`}
      >
        Fetch Song Lyrics
      </Button>
      
    </nav>
  );
};

export default Navbar;
