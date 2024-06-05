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
    <div className="mt-5 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Artist Name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        className="p-2 border text-black font-bold rounded"
      />
      <Button
        onClick={handleFetchTopSongs}
        size="lg"
        disabled={fetchingSongs}
      >
        {fetchingSongs ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            Fetching Top Songs...
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faMusic} className="mr-2" />
            Fetch Top Songs
          </>
        )}
      </Button>
    </div>
  );
};

export default ArtistTopSongsFetcher;
