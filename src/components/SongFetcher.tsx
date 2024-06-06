'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Ensure this import path matches your project structure

interface SongFetcherProps {
  onFetchLyrics: (artistName: string, songTitle: string) => void;
  fetchingLyrics: boolean;
}

const SongFetcher: React.FC<SongFetcherProps> = ({
  onFetchLyrics,
  fetchingLyrics,
}) => {
  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');

  const handleFetchLyrics = () => {
    onFetchLyrics(artistName, songTitle);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-4 sm:w-4/5 md:w-4/5 lg:w-[500px] xl:w-[500px] p-4 border border-gray rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Fetch Individual Song Lyrics
        </h1>
        <Input
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="p-2 border border-white text-white bg-black font-bold rounded w-full"
        />
        <Input
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
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
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
