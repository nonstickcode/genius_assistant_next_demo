import { NextRequest, NextResponse } from 'next/server';
import { requireEnvValue } from '@/lib/core';

const ACCESS_TOKEN = requireEnvValue('NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN');

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artistName = searchParams.get('artistName');
  const numberOfSongs = parseInt(searchParams.get('numberOfSongs')) || 20; // Default to 20 songs if not provided

  if (!artistName) {
    return NextResponse.json(
      { error: 'artistName parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Search for the artist by name
    const artistSearchResponse = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(artistName)}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    const artistSearchData = await artistSearchResponse.json();
    const artist = artistSearchData.response.hits.find(hit => hit.result.primary_artist.name.toLowerCase() === artistName.toLowerCase());

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    const artistId = artist.result.primary_artist.id;

    // Fetch top songs for the artist
    const songsResponse = await fetch(`https://api.genius.com/artists/${artistId}/songs?sort=popularity&per_page=${numberOfSongs}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    const songsData = await songsResponse.json();
    const topSongs = songsData.response.songs.map((song) => ({
      title: song.title,
      url: song.url,
      thumbnail: song.song_art_image_thumbnail_url
    }));

    return NextResponse.json({ topSongs }, { status: 200 });
  } catch (e) {
    console.error("Error fetching artist's top songs:", e);
    return NextResponse.json(
      { error: "Failed to fetch artist's top songs" },
      { status: 500 }
    );
  }
}
