import React, { useState, useRef, useEffect } from 'react';
import { TRACKS } from '../constants';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Headphones, Radio } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  return (
    <div className="flex flex-col gap-4">
      <audio
        ref={audioRef}
        src={TRACKS[currentTrackIndex].url}
        onEnded={skipForward}
      />

      <div className="space-y-3">
        {TRACKS.map((track, index) => {
          const isActive = index === currentTrackIndex;
          return (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setIsPlaying(true);
              }}
              className={`group p-4 border-2 transition-all cursor-pointer relative overflow-hidden ${
                isActive 
                  ? 'bg-glitch-cyan text-black border-white shadow-[4px_4px_0px_#ff00ff]' 
                  : 'bg-black border-glitch-cyan/30 text-glitch-cyan hover:border-glitch-magenta'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
              )}
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold opacity-40">0{index + 1}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-tighter italic leading-none">
                      {track.title}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-black/60' : 'text-glitch-magenta'}`}>
                      {track.artist}
                    </span>
                  </div>
                </div>
                {isActive && isPlaying ? (
                  <div className="flex gap-0.5">
                    {[0.8, 1, 0.6, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['4px', '16px', '8px', '20px', '4px'] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-black"
                      />
                    ))}
                  </div>
                ) : (
                  <Radio className={`w-4 h-4 ${isActive ? 'text-black' : 'opacity-20'}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-40">BUFFER_TRACK</span>
            <span className="text-xs font-black italic uppercase text-glitch-magenta">
              {TRACKS[currentTrackIndex].title}.wav
            </span>
          </div>
          <Headphones className={`w-5 h-5 ${isPlaying ? 'text-glitch-magenta animate-bounce' : 'text-white/20'}`} />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={skipBackward} 
            className="flex-1 py-4 border-2 border-glitch-cyan text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors flex justify-center"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="flex-[2] py-4 border-2 border-glitch-magenta bg-glitch-magenta/10 text-glitch-magenta hover:bg-glitch-magenta hover:text-white transition-all flex justify-center items-center gap-3 font-black uppercase tracking-widest italic"
          >
            {isPlaying ? (
              <><Pause className="w-6 h-6 fill-current" /> PAUSE</>
            ) : (
              <><Play className="w-6 h-6 fill-current" /> SYNC</>
            )}
          </button>

          <button 
            onClick={skipForward} 
            className="flex-1 py-4 border-2 border-glitch-cyan text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors flex justify-center"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="h-2 bg-white/5 relative overflow-hidden">
           <motion.div 
             className="absolute inset-y-0 left-0 bg-glitch-cyan"
             animate={{ x: isPlaying ? ['-100%', '200%'] : '0%' }}
             transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
             style={{ width: '30%' }}
           />
        </div>
      </div>
    </div>
  );
};
