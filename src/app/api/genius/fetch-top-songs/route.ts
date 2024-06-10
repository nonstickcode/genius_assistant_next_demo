import { NextRequest, NextResponse } from 'next/server';
import { requireEnvValue } from '@/lib/core';

const ACCESS_TOKEN: string = requireEnvValue('NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN');

interface GeniusHit {
  result: {
    primary_artist: {
      name: string;
      id: number;
    };
  };
}

interface GeniusSearchResponse {
  response: {
    hits: GeniusHit[];
  };
}

interface GeniusSongsResponse {
  response: {
    songs: {
      title: string;
      url: string;
      song_art_image_thumbnail_url: string;
    }[];
  };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const artistName: string | null = searchParams.get('artistName');
  const numberOfSongs: number = parseInt(searchParams.get('numberOfSongs') || '20', 10);

  if (!artistName) {
    return NextResponse.json(
      { error: 'artistName parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Search for the artist by name
    const artistSearchResponse = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(artistName)}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const artistSearchData: GeniusSearchResponse = await artistSearchResponse.json();
    const artist = artistSearchData.response.hits.find(
      (hit) =>
        hit.result.primary_artist.name.toLowerCase() ===
        artistName.toLowerCase()
    );

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    const artistId: number = artist.result.primary_artist.id;

    // Fetch top songs for the artist
    const songsResponse = await fetch(
      `https://api.genius.com/artists/${artistId}/songs?sort=popularity&per_page=${numberOfSongs}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const songsData: GeniusSongsResponse = await songsResponse.json();
    const topSongs = songsData.response.songs.map((song) => ({
      title: song.title,
      url: song.url,
      thumbnail: song.song_art_image_thumbnail_url,
    }));

    return NextResponse.json({ topSongs }, { status: 200 });
  } catch (e: unknown) {
    console.error("Error fetching artist's top songs:", e);
    return NextResponse.json(
      { error: "Failed to fetch artist's top songs" },
      { status: 500 }
    );
  }
}
