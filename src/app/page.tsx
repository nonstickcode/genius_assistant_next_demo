'use client';

import { useState } from 'react';
import Head from 'next/head';
import SongFetcher from '@/components/SongFetcher';

const Page = () => {
  const [fetchingLyrics, setFetchingLyrics] = useState(false);

  const handleFetchLyrics = (artistName: string, songTitle: string) => {
    setFetchingLyrics(true);
    // Add your logic to fetch lyrics here
    // Simulating an API call with setTimeout
    setTimeout(() => {
      setFetchingLyrics(false);
      alert(`Fetched lyrics for ${artistName} - ${songTitle}`);
    }, 2000);
  };

  return (
    <div>
      <Head>
        <title>Fetch Lyrics</title>
        <meta name="description" content="Fetch song lyrics from Genius API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Fetch Lyrics</h1>
        <SongFetcher onFetchLyrics={handleFetchLyrics} fetchingLyrics={fetchingLyrics} />
      </main>
    </div>
  );
};

export default Page;
