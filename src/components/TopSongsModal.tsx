import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import TooltipAlert from '@/components/TooltipAlert';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface TopSongsModalProps {
  show: boolean;
  topSongs: { title: string, url: string }[];
  artistName: string;
  onSongClick: (songTitle: string) => void;
  loadingSongTitle: string | null;
  onClose: () => void;
}

const TopSongsModal: React.FC<TopSongsModalProps> = ({ show, topSongs, artistName, onSongClick, loadingSongTitle, onClose }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTopSongsLyrics = async () => {
    setIsDownloading(true);
    const zip = new JSZip();
    const lyricsFolder = zip.folder(`${artistName} Top Song Lyrics`);

    try {
      await Promise.all(
        topSongs.map(async (song) => {
          const response = await fetch(`/api/genius/fetch-single-song?artistName=${encodeURIComponent(artistName)}&songTitle=${encodeURIComponent(song.title)}`);
          const data = await response.json();
          const lyrics = response.ok ? data.lyrics.join("\n") : "Lyrics not found";
          lyricsFolder.file(`${song.title}.txt`, `Title: ${song.title}\n\n${lyrics}`);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${artistName} Top Songs Lyrics.zip`);
    } catch (error) {
      console.error('Failed to fetch lyrics for all songs: ', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyTopSongsToClipboard = () => {
    const textToCopy = topSongs.map(song => song.title).join("\n");
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setAlertVisible(true);
      })
      .catch((err) => {
        console.error("Failed to copy top songs: ", err);
      });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-4xl w-full mx-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-3xl mb-4 font-bold text-black">{`Top 10 Songs by ${artistName}`}</h2>
        <div className="overflow-y-auto max-h-96 text-black text-lg">
          {topSongs.map((song, index) => (
            <p key={index} className="text-blue-500 hover:underline cursor-pointer" onClick={() => onSongClick(song.title)}>
              {loadingSongTitle === song.title ? <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> : null}
              {song.title}
            </p>
          ))}
        </div>
        <div className="flex justify-between mt-4 relative">
          <div className="flex relative">
            {alertVisible && (
              <TooltipAlert
                message="Top songs copied to clipboard!"
                onClose={() => setAlertVisible(false)}
              />
            )}
            <Button
              onClick={copyTopSongsToClipboard}
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 mr-2 relative"
            >
              <FontAwesomeIcon icon={faCopy} />
              <span className="ml-2">Copy</span>
            </Button>
            <Button
              onClick={downloadTopSongsLyrics}
              variant="default"
              className="bg-green-500 hover:bg-green-600 mr-2"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  <span className="ml-2">Download All Lyrics</span>
                </>
              )}
            </Button>
          </div>
          <Button
            onClick={onClose}
            variant="destructive"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopSongsModal;
