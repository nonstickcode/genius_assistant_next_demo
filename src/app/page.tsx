'use client';

import Head from 'next/head';
import { useState } from 'react';
import SongFetcher from '@/components/SongFetcher';
import LyricsModal from '@/components/LyricsModal';

const Page = () => {
  const [fetchingLyrics, setFetchingLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<string[] | null>(null);
  const [artistName, setArtistName] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [showLyricsModal, setShowLyricsModal] = useState(false);

  const handleFetchLyrics = async (artistName: string, songTitle: string) => {
    setFetchingLyrics(true);
    setArtistName(artistName);
    setSongTitle(songTitle);

    try {
      const response = await fetch(`/api/genius?artistName=${encodeURIComponent(artistName)}&songTitle=${encodeURIComponent(songTitle)}`);
      const data = await response.json();
      if (response.ok) {
        setLyrics(data.lyrics);
        setShowLyricsModal(true);
      } else {
        setLyrics(null);
        console.error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch lyrics:', error);
    } finally {
      setFetchingLyrics(false);
    }
  };

  return (
    <div>
      <Head>
        <title>{artistName && songTitle ? `${artistName} - ${songTitle}` : "Fetch Lyrics"}</title>
        <meta name="description" content="Fetch song lyrics from Genius API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Fetch One Songs Lyrics</h1>
        <SongFetcher onFetchLyrics={handleFetchLyrics} fetchingLyrics={fetchingLyrics} />
        {lyrics && (
          <LyricsModal
            show={showLyricsModal}
            lyrics={lyrics}
            artistName={artistName}
            songTitle={songTitle}
            onClose={() => setShowLyricsModal(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Page;
