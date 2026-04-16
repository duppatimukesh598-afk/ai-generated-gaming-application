import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

type Point = { x: number; y: number };

export default function SnakeGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number>();

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
    onScoreUpdate(0);
  }, [onScoreUpdate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || 
            newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
          setScore(s => {
            const newScore = s + 10;
            onScoreUpdate(newScore);
            return newScore;
          });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };

    gameLoopRef.current = window.setInterval(moveSnake, 150);
    return () => clearInterval(gameLoopRef.current);
  }, [direction, food, gameOver, onScoreUpdate]);

  return (
    <div className="relative border-4 border-glitch-cyan shadow-[0_0_20px_var(--color-glitch-cyan)] bg-glitch-black p-2 glitch-effect">
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)` }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div key={i} style={{ width: CELL_SIZE, height: CELL_SIZE }} 
                 className={`${isSnake ? 'bg-glitch-cyan' : isFood ? 'bg-glitch-magenta' : 'bg-glitch-black'}`}></div>
          );
        })}
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-glitch-black/90 text-glitch-magenta">
          <h2 className="text-4xl font-bold uppercase tracking-widest">GAME OVER</h2>
          <button onClick={resetGame} className="mt-4 px-6 py-3 border-2 border-glitch-magenta hover:bg-glitch-magenta hover:text-glitch-black uppercase font-bold">Restart</button>
        </div>
      )}
    </div>
  );
}
