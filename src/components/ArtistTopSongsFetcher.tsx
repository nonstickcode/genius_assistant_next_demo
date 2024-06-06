'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input'; // Ensure this import path matches your project structure

interface ArtistTopSongsFetcherProps {
  onFetchTopSongs: (artistName: string, numberOfSongs: number) => void;
  fetchingSongs: boolean;
}

const ArtistTopSongsFetcher: React.FC<ArtistTopSongsFetcherProps> = ({
  onFetchTopSongs,
  fetchingSongs,
}) => {
  const [artistName, setArtistName] = useState('');
  const [numberOfSongs, setNumberOfSongs] = useState(20); // Default to 20 songs

  const handleFetchTopSongs = () => {
    onFetchTopSongs(artistName, numberOfSongs);
  };

  return (
    <div className="flex items-center border border-gray p-20 w-120 rounded-lg justify-center h-fit">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">
          Fetch the Top Songs for an Artist
        </h1>
        <Input
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="p-2 border border-white text-white bg-black font-bold rounded w-full"
        />
        <Select
          value={numberOfSongs.toString()}
          onValueChange={(value) => setNumberOfSongs(parseInt(value))}
        >
          <SelectTrigger className="p-2 border border-white text-white bg-black font-bold rounded w-full">
            {numberOfSongs}
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 40, 50].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleFetchTopSongs}
          size="lg"
          className="bg-white text-black hover:bg-gray-300 w-full"
          disabled={fetchingSongs}
        >
          {fetchingSongs ? (
            <div className="flex items-center justify-center relative">
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin mr-2 absolute left-2"
              />
              Fetching Top Songs...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              Fetch Top Songs
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ArtistTopSongsFetcher;
