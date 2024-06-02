'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

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
      <button
        onClick={handleFetchLyrics}
        className={cx(
          "bg-purple-500 hover:bg-purple-600 flex gap-2 items-center justify-center p-2 rounded",
          { 'animate-spin': fetchingLyrics }
        )}
      >
        <FontAwesomeIcon
          icon={fetchingLyrics ? faSpinner : faMusic}
          className={fetchingLyrics ? 'animate-spin' : ''}
        />
        <span>
          {fetchingLyrics ? "Fetching Lyrics..." : "Fetch Lyrics"}
        </span>
      </button>
    </div>
  );
};

export default SongFetcher;
