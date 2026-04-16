import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { TRACKS } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const skip = (direction: number) => {
    setCurrentTrackIndex((prev) => (prev + direction + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="bg-glitch-black border-2 border-glitch-magenta p-6 shadow-[0_0_20px_var(--color-glitch-magenta)] text-glitch-magenta glitch-effect">
      <audio ref={audioRef} src={track.url} onEnded={() => skip(1)} />
      <div className="mb-6">
        <h3 className="font-bold text-2xl uppercase tracking-widest">{track.title}</h3>
        <p className="text-lg opacity-80 uppercase">{track.artist}</p>
      </div>
      <div className="flex justify-center gap-6">
        <button onClick={() => skip(-1)} className="hover:text-glitch-cyan"><SkipBack size={32} /></button>
        <button onClick={togglePlay} className="hover:text-glitch-cyan">{isPlaying ? <Pause size={32} /> : <Play size={32} />}</button>
        <button onClick={() => skip(1)} className="hover:text-glitch-cyan"><SkipForward size={32} /></button>
      </div>
    </div>
  );
}
