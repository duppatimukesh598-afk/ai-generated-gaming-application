/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-glitch-black">
      <h1 className="text-6xl font-bold text-glitch-magenta mb-12 tracking-[0.2em] glitch-effect uppercase">NEON SNAKE BEATS</h1>
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <SnakeGame onScoreUpdate={setScore} />
        <div className="flex flex-col gap-8">
          <div className="text-4xl font-bold text-glitch-cyan border-2 border-glitch-cyan p-6 shadow-[0_0_15px_var(--color-glitch-cyan)] glitch-effect">
            SCORE: {score.toString().padStart(5, '0')}
          </div>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}
