'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';

interface SongFetcherProps {
  onFetchLyrics: (artistName: string, songTitle: string) => void;
  fetchingLyrics: boolean;
}

const SongFetcher: React.FC<SongFetcherProps> = ({ onFetchLyrics, fetchingLyrics }) => {
  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');

  const handleFetchLyrics = () => {
    onFetchLyrics(artistName, songTitle);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 w-120">
      <h1 className="text-2xl font-bold mb-4">Fetch Individual Song Lyrics</h1>
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="p-2 border border-white text-white bg-black font-bold rounded w-full"
        />
        <input
          type="text"
          placeholder="Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="p-2 border border-white text-white bg-black font-bold rounded w-full"
        />
        <Button
          onClick={handleFetchLyrics}
          size="lg"
          className="bg-white text-black hover:bg-gray-300 w-full"
          disabled={fetchingLyrics}
        >
          {fetchingLyrics ? (
            <div className="flex items-center justify-center relative">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2 absolute left-2" />
              Fetching Lyrics...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              Fetch Lyrics
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SongFetcher;
