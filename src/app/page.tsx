'use client';

import Head from 'next/head';
import { useState } from 'react';
import SongFetcher from '@/components/SongFetcher';
import LyricsModal from '@/components/LyricsModal';
import ArtistTopSongsFetcher from '@/components/ArtistTopSongsFetcher';
import TopSongsModal from '@/components/TopSongsModal';

const Page = () => {
  const [fetchingLyrics, setFetchingLyrics] = useState(false);
  const [fetchingSongs, setFetchingSongs] = useState(false);
  const [lyrics, setLyrics] = useState<string[] | null>(null);
  const [topSongs, setTopSongs] = useState<{ title: string, url: string }[] | null>(null);
  const [artistName, setArtistName] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [showSongsModal, setShowSongsModal] = useState(false);
  const [loadingSongTitle, setLoadingSongTitle] = useState<string | null>(null);

  const handleFetchLyrics = async (artistName: string, songTitle: string) => {
    setFetchingLyrics(true);
    setLoadingSongTitle(songTitle);
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
      setLoadingSongTitle(null);
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
        setShowSongsModal(true);
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

  const handleSongClick = (songTitle: string) => {
    handleFetchLyrics(artistName, songTitle);
  };

  return (
    <div className="flex flex-col">
      <Head>
        <title>{artistName && songTitle ? `${artistName} - ${songTitle}` : "Fetch Lyrics and Top Songs"}</title>
        <meta name="description" content="Fetch song lyrics and top songs from Genius API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <div className="flex justify-between">
          <div className="w-1/2 border p-4">
            <h1 className="text-2xl font-bold mb-4">Fetch Song Lyrics</h1>
            <SongFetcher onFetchLyrics={handleFetchLyrics} fetchingLyrics={fetchingLyrics} />
          </div>
          <div className="w-1/2 border p-4">
            <h1 className="text-2xl font-bold mb-4">Fetch Top Songs</h1>
            <ArtistTopSongsFetcher onFetchTopSongs={handleFetchTopSongs} fetchingSongs={fetchingSongs} />
          </div>
        </div>
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
          <TopSongsModal
            show={showSongsModal}
            topSongs={topSongs}
            artistName={artistName}
            onSongClick={handleSongClick}
            loadingSongTitle={loadingSongTitle}
            onClose={() => setShowSongsModal(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Page;
