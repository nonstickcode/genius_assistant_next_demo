'use client';

import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SongFetcher from '@/components/SongFetcher';
import LyricsModal from '@/components/LyricsModal';
import ArtistTopSongsFetcher from '@/components/ArtistTopSongsFetcher';
import TopSongsModal from '@/components/TopSongsModal';
import Alert from '@/components/Alert';

const Page = () => {
  const [view, setView] = useState<string>('topSongs');
  const [fetchingLyrics, setFetchingLyrics] = useState(false);
  const [fetchingSongs, setFetchingSongs] = useState(false);
  const [lyrics, setLyrics] = useState<string[] | null>(null);
  const [topSongs, setTopSongs] = useState<
    { title: string; url: string }[] | null
  >(null);
  const [artistName, setArtistName] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [showSongsModal, setShowSongsModal] = useState(false);
  const [loadingSongTitle, setLoadingSongTitle] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleNavClick = (view: string) => {
    setView(view);
  };

  const handleFetchLyrics = async (artistName: string, songTitle: string) => {
    setFetchingLyrics(true);
    setLoadingSongTitle(songTitle);

    try {
      const response = await fetch(
        `/api/genius/fetch-single-song?artistName=${encodeURIComponent(artistName)}&songTitle=${encodeURIComponent(songTitle)}`
      );
      const data = await response.json();
      if (response.ok) {
        setLyrics(data.lyrics);
        setShowLyricsModal(true);
      } else {
        setLyrics(null);
        setAlertMessage('Artist or song not found');
      }
    } catch (error) {
      console.error('Failed to fetch lyrics:', error);
      setAlertMessage('Failed to fetch lyrics. Please try again later.');
    } finally {
      setFetchingLyrics(false);
      setLoadingSongTitle(null);
    }
  };

  const handleFetchTopSongs = async (
    artistName: string,
    numberOfSongs: number
  ) => {
    setFetchingSongs(true);
    setArtistName(artistName);

    try {
      const response = await fetch(
        `/api/genius/fetch-top-songs?artistName=${encodeURIComponent(artistName)}&numberOfSongs=${numberOfSongs}`
      );
      const data = await response.json();
      if (response.ok) {
        setTopSongs(data.topSongs);
        setShowSongsModal(true);
      } else {
        setTopSongs(null);
        setAlertMessage('Artist not found');
      }
    } catch (error) {
      console.error('Failed to fetch top songs:', error);
      setAlertMessage('Failed to fetch top songs. Please try again later.');
    } finally {
      setFetchingSongs(false);
    }
  };

  const handleSongClick = async (songTitle: string) => {
    await handleFetchLyrics(artistName, songTitle);
    setShowSongsModal(false);
  };

  const handleCloseLyricsModal = () => {
    setShowLyricsModal(false);
    setShowSongsModal(true); // Show the top songs modal again when closing lyrics modal
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <Head>
        <title>
          {artistName && songTitle
            ? `${artistName} - ${songTitle}`
            : 'Fetch Lyrics and Top Songs'}
        </title>
        <meta
          name="description"
          content="Fetch song lyrics and top songs from Genius API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar onNavClick={handleNavClick} currentView={view} />
      <main className="p-4 flex-1 flex justify-center">
        {view === 'lyrics' && (
          <div className="p-4">
            <SongFetcher
              onFetchLyrics={handleFetchLyrics}
              fetchingLyrics={fetchingLyrics}
            />
          </div>
        )}
        {view === 'topSongs' && (
          <div className="p-4">
            <ArtistTopSongsFetcher
              onFetchTopSongs={handleFetchTopSongs}
              fetchingSongs={fetchingSongs}
            />
          </div>
        )}
        {showLyricsModal && lyrics && (
          <LyricsModal
            show={showLyricsModal}
            lyrics={lyrics}
            artistName={artistName}
            songTitle={songTitle}
            onClose={handleCloseLyricsModal}
          />
        )}
        {showSongsModal && topSongs && (
          <TopSongsModal
            show={showSongsModal}
            topSongs={topSongs}
            artistName={artistName}
            onSongClick={handleSongClick}
            loadingSongTitle={loadingSongTitle}
            onClose={() => setShowSongsModal(false)}
          />
        )}
        {alertMessage && (
          <Alert message={alertMessage} onClose={handleCloseAlert} />
        )}
      </main>
    </div>
  );
};

export default Page;
