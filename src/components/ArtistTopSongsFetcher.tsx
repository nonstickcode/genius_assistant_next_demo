'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';

interface ArtistTopSongsFetcherProps {
  onFetchTopSongs: (artistName: string) => void;
  fetchingSongs: boolean;
}

const ArtistTopSongsFetcher: React.FC<ArtistTopSongsFetcherProps> = ({ onFetchTopSongs, fetchingSongs }) => {
  const [artistName, setArtistName] = useState('');

  const handleFetchTopSongs = () => {
    onFetchTopSongs(artistName);
  };

  return (
    <>
    
    <div className="flex items-center justify-center h-screen">
      
      <div className="flex flex-col gap-4 w-120">
      <h1 className="text-2xl font-bold mb-4">Fetch the Top Songs for an Artist</h1>
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="p-2 border border-white text-white bg-black font-bold rounded w-full"
        />
        <Button
          onClick={handleFetchTopSongs}
          size="lg"
          className="bg-white text-black hover:bg-gray-300 w-full"
          disabled={fetchingSongs}
        >
          {fetchingSongs ? (
            <div className="flex items-center justify-center relative">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2 absolute left-2" />
              Fetching Top Songs...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              Fetch Top Songs
            </div>
          )}
        </Button>
      </div>
    </div>
    </>
  );
};

export default ArtistTopSongsFetcher;
