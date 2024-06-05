import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import Alert from '@/components/Alert';

interface LyricsModalProps {
  show: boolean;
  lyrics: string[];
  artistName: string;
  songTitle: string;
  onClose: () => void;
}

const LyricsModal: React.FC<LyricsModalProps> = ({ show, lyrics, artistName, songTitle, onClose }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Slight delay to ensure the modal is fully visible before hiding others
      setTimeout(() => {
        document.getElementById('top-songs-modal')?.classList.add('hidden');
      }, 100);
    } else {
      document.getElementById('top-songs-modal')?.classList.remove('hidden');
    }
  }, [show]);

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
        setAlertVisible(true);
      })
      .catch((err) => {
        console.error("Failed to copy lyrics: ", err);
      });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-4xl w-full mx-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-3xl mb-4 font-bold text-black">{`Lyrics: ${artistName} - ${songTitle}`}</h2>
        <div className="overflow-y-auto max-h-96 text-black text-lg">
          {lyrics.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="flex justify-between mt-4 relative">
          <div className="flex relative">
            {alertVisible && (
              <Alert
                message="Lyrics copied to clipboard!"
                onClose={() => setAlertVisible(false)}
              />
            )}
            <Button
              onClick={copyLyricsToClipboard}
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 mr-2 relative"
            >
              <FontAwesomeIcon icon={faCopy} />
              <span className="ml-2">Copy</span>
            </Button>
            <Button
              onClick={downloadLyrics}
              variant="default"
              className="bg-green-500 hover:bg-green-600 mr-2"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span className="ml-2">Download Lyrics</span>
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

export default LyricsModal;
