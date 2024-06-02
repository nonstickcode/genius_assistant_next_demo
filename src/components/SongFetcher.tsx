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
    <div className="mt-5 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Artist Name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        className="p-2 border text-black font-bold rounded"
      />
      <input
        type="text"
        placeholder="Song Title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
        className="p-2 border text-black font-bold rounded"
      />
      <Button
        onClick={handleFetchLyrics}
        size="lg"
        disabled={fetchingLyrics}
      >
        {fetchingLyrics ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            Fetching Lyrics...
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faMusic} className="mr-2" />
            Fetch Lyrics
          </>
        )}
      </Button>
    </div>
  );
};

export default SongFetcher;
