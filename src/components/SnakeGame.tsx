import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Point, Direction } from '../types';
import { GRID_SIZE, CANVAS_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Play, Pause, Activity } from 'lucide-react';

const getRandomPoint = (): Point => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(getRandomPoint());
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomPoint());
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(true);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      setDirection(nextDirection);

      switch (nextDirection) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(getRandomPoint());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, isGameOver, isPaused, nextDirection, highScore]);

  const tick = useCallback((time: number) => {
    const deltaTime = time - lastTimeRef.current;
    const speed = Math.max(40, 120 - Math.floor(score / 50) * 5);

    if (deltaTime > speed) {
      moveSnake();
      lastTimeRef.current = time;
    }
    gameLoopRef.current = requestAnimationFrame(tick);
  }, [moveSnake, score]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [tick]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': if (direction !== 'DOWN') setNextDirection('UP'); break;
        case 'ArrowDown': case 's': if (direction !== 'UP') setNextDirection('DOWN'); break;
        case 'ArrowLeft': case 'a': if (direction !== 'RIGHT') setNextDirection('LEFT'); break;
        case 'ArrowRight': case 'd': if (direction !== 'LEFT') setNextDirection('RIGHT'); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const cellSize = CANVAS_SIZE / GRID_SIZE;

    for (let i = 0; i <= GRID_SIZE; i++) {
        const pos = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(pos, 0); ctx.lineTo(pos, CANVAS_SIZE); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, pos); ctx.lineTo(CANVAS_SIZE, pos); ctx.stroke();
    }

    // Draw Food (Magenta Glitch Dot)
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = isPaused ? 0 : 5 + Math.random() * 10;
    ctx.shadowColor = '#ff00ff';
    ctx.fillRect(food.x * cellSize + 4, food.y * cellSize + 4, cellSize - 8, cellSize - 8);

    // Draw Snake (Cyan Segments)
    ctx.shadowBlur = isPaused ? 0 : 10;
    ctx.shadowColor = '#00ffff';
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ffff' : 'rgba(0, 255, 255, 0.8)';
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (index === 0) {
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        // Tearing effect for head
        if (!isPaused && Math.random() > 0.95) {
          ctx.fillStyle = '#ff00ff';
          ctx.fillRect(x - 5, y, 2, cellSize);
        }
      } else {
        ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
      }
    });

    ctx.shadowBlur = 0;
  }, [snake, food, isPaused]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-glitch-cyan uppercase tracking-[0.2em] opacity-40">HEAD_DATA_VLD</span>
          <span className="text-2xl font-black italic text-white glitch-text tracking-tighter">{score.toString().padStart(5, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-glitch-magenta uppercase tracking-[0.2em] opacity-40">PEAK_BUFFER_IDX</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black italic text-white tracking-tighter">{highScore.toString().padStart(5, '0')}</span>
            <Activity className="w-4 h-4 text-glitch-magenta animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative border-4 border-glitch-cyan shadow-[0_0_40px_rgba(0,255,255,0.15)] bg-black">
        <div className="absolute inset-x-0 top-0 h-px bg-glitch-magenta/30 animate-[scan_4s_linear_infinite]" />
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="cursor-none grayscale-[0.2] contrast-150"
          id="snake-canvas"
        />
        
        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-8 backdrop-invert-[0.05]"
            >
              <div className="absolute inset-0 pointer-events-none border-2 border-glitch-magenta opacity-20 m-2 animate-pulse" />
              
              {isGameOver ? (
                <>
                  <h2 className="text-6xl font-black text-glitch-magenta italic skew-x-[-15deg] mb-8 tracking-tighter glitch-text scale-y-150">
                    FATAL_ERROR
                  </h2>
                  <button
                    onClick={resetGame}
                    className="group relative px-10 py-4 bg-glitch-cyan text-black font-black uppercase tracking-widest hover:bg-white transition-all transform active:scale-95"
                    id="restart-btn"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                      REBOOT_ARRAY
                    </span>
                    <div className="absolute inset-0 bg-glitch-magenta opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 -z-10 transition-all" />
                  </button>
                  <p className="mt-8 text-[10px] text-glitch-magenta/40 uppercase tracking-[0.5em] animate-pulse">Corruption detected in GRID_SECTOR</p>
                </>
              ) : (
                <>
                  <h2 className="text-6xl font-black text-glitch-cyan italic skew-x-[-15deg] mb-8 tracking-tighter scale-y-150 glitch-text">
                    IDLE_MODE
                  </h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="group relative px-10 py-4 bg-glitch-magenta text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform active:scale-95"
                    id="resume-btn"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Play className="w-6 h-6 fill-current" />
                      INIT_FLOW
                    </span>
                    <div className="absolute inset-0 bg-glitch-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 -z-10 transition-all" />
                  </button>
                  <p className="mt-8 text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">
                    INPUT_REQ: WASD_ARRAY || SPACE_BAR
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 md:hidden">
        <div />
        <ControlButton icon={<div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-current" />} onClick={() => setNextDirection('UP')} />
        <div />
        <ControlButton icon={<div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-current" />} onClick={() => setNextDirection('LEFT')} />
        <ControlButton icon={<div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-current" />} onClick={() => setNextDirection('DOWN')} />
        <ControlButton icon={<div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-current" />} onClick={() => setNextDirection('RIGHT')} />
      </div>
    </div>
  );
};

const ControlButton = ({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-14 h-14 bg-glitch-cyan/10 border-2 border-glitch-cyan flex items-center justify-center text-glitch-cyan active:bg-glitch-cyan active:text-black"
  >
    {icon}
  </button>
);
