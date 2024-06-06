import { Client as GeniusClient } from 'genius-lyrics';
import { NextRequest, NextResponse } from 'next/server';
import { requireEnvValue } from '@/lib/core';

const ACCESS_TOKEN = requireEnvValue('NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN');

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artistName = searchParams.get('artistName');
  const songTitle = searchParams.get('songTitle');

  if (!artistName || !songTitle) {
    return NextResponse.json(
      { error: 'Both artistName and songTitle parameters are required' },
      { status: 400 }
    );
  }

  const Client = new GeniusClient(ACCESS_TOKEN);
  try {
    const query = `${artistName} ${songTitle.replace(/\s+-\s+.+?$/, '')}`;
    const searches = await Client.songs.search(query);
    const firstSong = searches[0];

    if (!firstSong) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    const lyrics = (await firstSong.lyrics()) || '';
    const normalizedLyrics = lyrics
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return NextResponse.json({ lyrics: normalizedLyrics }, { status: 200 });
  } catch (e) {
    console.error('Error fetching lyrics:', e);
    return NextResponse.json(
      { error: 'Failed to fetch lyrics' },
      { status: 500 }
    );
  }
}
