'use client';

import Head from 'next/head';
import { useState } from 'react';
import SongFetcher from '@/components/SongFetcher';
import LyricsModal from '@/components/LyricsModal';
import ArtistTopSongsFetcher from '@/components/ArtistTopSongsFetcher';

const Page = () => {
  const [fetchingLyrics, setFetchingLyrics] = useState(false);
  const [fetchingSongs, setFetchingSongs] = useState(false);
  const [lyrics, setLyrics] = useState<string[] | null>(null);
  const [topSongs, setTopSongs] = useState<any[] | null>(null);
  const [artistName, setArtistName] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [showLyricsModal, setShowLyricsModal] = useState(false);

  const handleFetchLyrics = async (artistName: string, songTitle: string) => {
    setFetchingLyrics(true);
    setArtistName(artistName);
    setSongTitle(songTitle);

    try {
      const response = await fetch(`/api/genius/fetch-single-song?artistName=${encodeURIComponent(artistName)}&songTitle=${encodeURIComponent(songTitle)}`);
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

  const handleFetchTopSongs = async (artistName: string) => {
    setFetchingSongs(true);
    setArtistName(artistName);

    try {
      const response = await fetch(`/api/genius/fetch-top-songs?artistName=${encodeURIComponent(artistName)}`);
      const data = await response.json();
      if (response.ok) {
        setTopSongs(data.topSongs);
      } else {
        setTopSongs(null);
        console.error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch top songs:', error);
    } finally {
      setFetchingSongs(false);
    }
  };

  return (
    <div className="flex">
      <Head>
        <title>{artistName && songTitle ? `${artistName} - ${songTitle}` : "Fetch Lyrics and Top Songs"}</title>
        <meta name="description" content="Fetch song lyrics and top songs from Genius API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Fetch Song Lyrics and Top Songs</h1>
        <SongFetcher onFetchLyrics={handleFetchLyrics} fetchingLyrics={fetchingLyrics} />
        <ArtistTopSongsFetcher onFetchTopSongs={handleFetchTopSongs} fetchingSongs={fetchingSongs} />
        {lyrics && (
          <LyricsModal
            show={showLyricsModal}
            lyrics={lyrics}
            artistName={artistName}
            songTitle={songTitle}
            onClose={() => setShowLyricsModal(false)}
          />
        )}
        {topSongs && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Top 10 Songs by {artistName}</h2>
            <ul className="list-disc pl-5">
              {topSongs.map((song, index) => (
                <li key={index}>
                  <a href={song.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {song.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
