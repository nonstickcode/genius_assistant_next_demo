import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import button from '../button';

interface LyricsModalProps {
  show: boolean;
  lyrics: string[];
  artistName: string;
  songTitle: string;
  onClose: () => void;
}

const LyricsModal: React.FC<LyricsModalProps> = ({ show, lyrics, artistName, songTitle, onClose }) => {
  if (!show) return null;

  const downloadLyrics = () => {
    const element = document.createElement("a");
    const file = new Blob([lyrics.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${artistName} - ${songTitle} Lyrics.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const copyLyricsToClipboard = () => {
    const textToCopy = lyrics.join("\n");
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Lyrics copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy lyrics: ", err);
      });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-4xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-3xl mb-4 font-bold text-black">{`Lyrics: ${artistName} - ${songTitle}`}</h2>
        <div className="overflow-y-auto max-h-96 text-black text-lg">
          {lyrics.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <button
              onClick={copyLyricsToClipboard}
              className="bg-blue-500 hover:bg-blue-600 mr-2"
            >
              <FontAwesomeIcon icon={faCopy} />
              <span className="ml-2">Copy</span>
            </button>
            <button
              onClick={downloadLyrics}
              className="bg-green-500 hover:bg-green-600 mr-2"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span className="ml-2">Download Lyrics</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LyricsModal;
