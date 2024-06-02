'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import LyricsModal from './LyricsModal';
import { Button } from './ui/button';

const SongFetcher: React.FC = () => {
  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [fetchingLyrics, setFetchingLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLyricsModal, setShowLyricsModal] = useState(false);

  const handleFetchLyrics = async () => {
    if (!artistName || !songTitle) {
      setError("Both artist name and song title are required.");
      return;
    }

    setFetchingLyrics(true);
    setError(null);
    setLyrics(null);
    try {
      const response = await fetch(`/api/genius?artistName=${encodeURIComponent(artistName)}&songTitle=${encodeURIComponent(songTitle)}`);
      const data = await response.json();

      if (response.ok) {
        setLyrics(data.lyrics);
        setShowLyricsModal(true);
      } else {
        setError(data.error || 'Failed to fetch lyrics');
      }
    } catch (err) {
      setError('Failed to fetch lyrics');
    } finally {
      setFetchingLyrics(false);
    }
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
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      
      <LyricsModal
        show={showLyricsModal}
        lyrics={lyrics || []}
        artistName={artistName}
        songTitle={songTitle}
        onClose={() => setShowLyricsModal(false)}
      />
    </div>
  );
};

export default SongFetcher;
