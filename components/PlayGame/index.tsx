'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RewardAdModal from '../wallet/RewardAdModal'; // ✅ Import your ad modal
import Script from 'next/script';

const opponents = [
  { name: 'Alex the Predictor', avatar: '/avatars/alex.png' },
  { name: 'Zara the Fortune Seer', avatar: '/avatars/zara.png' },
  { name: 'Baba Logic', avatar: '/avatars/baba.png' },
  { name: 'Mystic Maya', avatar: '/avatars/maya.png' },
  { name: 'Neo the Guessmaster', avatar: '/avatars/neo.png' },
];

const TOTAL_MIN = 4;
const TOTAL_MAX = 12;
const RANGE_MIN = 10;
const RANGE_MAX = 1000;
const COOLDOWN_SECONDS = 2;

function getUniqueRandomNumbers(count: number, min: number, max: number): number[] {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(rand);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function generateRound() {
  const choiceCount = Math.floor(Math.random() * (TOTAL_MAX - TOTAL_MIN + 1)) + TOTAL_MIN;
  const options = getUniqueRandomNumbers(choiceCount, RANGE_MIN, RANGE_MAX);
  const answer = options[Math.floor(Math.random() * options.length)];
  const opponent = opponents[Math.floor(Math.random() * opponents.length)];
  return { opponent, options, answer };
}

// export default function PlayGamePage() {
//   const [opponent, setOpponent] = useState(opponents[0]);
//   const [choices, setChoices] = useState<number[]>([]);
//   const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
//   const [lastPlay, setLastPlay] = useState<number | null>(null);
//   const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
//   const [result, setResult] = useState<'win' | 'lose' | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [wallet, setWallet] = useState<number>(3.4); // 🧪 Mocked wallet value
//   const [totalPlays, setTotalPlays] = useState(0);
//   const [totalWins, setTotalWins] = useState(0);

//   const canPlay = cooldownRemaining <= 0;
//   const cooldownPercent = ((COOLDOWN_SECONDS - cooldownRemaining) / COOLDOWN_SECONDS) * 100;

//   const resetGame = () => {
//     const round = generateRound();
//     setOpponent(round.opponent);
//     setChoices(round.options);
//     setCorrectAnswer(round.answer);
//     setResult(null);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const stored = localStorage.getItem('lastPlay');
//     if (stored) setLastPlay(Number(stored));
//     resetGame();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (lastPlay) {
//         const remaining = COOLDOWN_SECONDS - Math.floor((Date.now() - lastPlay) / 1000);
//         setCooldownRemaining(Math.max(remaining, 0));
//         if (remaining <= 0) {
//           resetGame();
//           setLastPlay(null);
//           localStorage.removeItem('lastPlay');
//           toast.success('Cooldown complete! You can play again.');
//         }
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [lastPlay]);

//   const handleGuess = async (guess: number) => {
//     if (!canPlay) {
//       toast.warning('Please wait for cooldown.');
//       return;
//     }

//     setLoading(true);
//     await new Promise(res => setTimeout(res, 800));
//     const now = Date.now();
//     setLastPlay(now);
//     localStorage.setItem('lastPlay', now.toString());
//     setCooldownRemaining(COOLDOWN_SECONDS);

//     setTotalPlays(prev => prev + 1);

//     if (guess === correctAnswer) {
//       setResult('win');
//       setTotalWins(prev => prev + 1);
//       setWallet(prev => +(prev + 0.3).toFixed(2));
//       toast.success('🎉 Correct! +$0.30 to your wallet.');
//     } else {
//       setResult('lose');
//       toast.error(`❌ ${opponent.name} chose ${correctAnswer}.`);
//     }

//     setLoading(false);
//   };

//   return (
//     <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">
//       {result === 'win' && <Confetti width={window.innerWidth} height={window.innerHeight} />}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-xl mx-auto"
//       >
//         {/* Opponent Card */}
//         <div className="text-center mb-6">
//           <img
//             src={opponent.avatar}
//             alt={opponent.name}
//             className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-muted"
//           />
//           <h1 className="text-2xl font-semibold">You're playing against {opponent.name}</h1>
//           <p className="text-sm text-muted-foreground">Guess the number they picked</p>
//         </div>

//         {/* Wallet + Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-center">
//           <div>
//             <p className="text-sm text-muted-foreground">Wallet</p>
//             <p className="font-bold text-emerald-500">${wallet.toFixed(2)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground">Total Plays</p>
//             <p className="font-bold">{totalPlays}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground">Wins</p>
//             <p className="font-bold">{totalWins}</p>
//           </div>
//         </div>

//         {/* Number Options */}
//         <Card>
//           <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6">
//             {choices.map(n => (
//               <Button
//                 key={n}
//                 disabled={loading || !canPlay}
//                 onClick={() => handleGuess(n)}
//                 variant="secondary"
//               >
//                 {n}
//               </Button>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Result Message */}
//         {result && (
//           <div className="mt-6 text-center text-xl font-semibold">
//             {result === 'win'
//               ? '🎉 You Win! +$0.30'
//               : `❌ You Lost. ${opponent.name} picked ${correctAnswer}.`}
//           </div>
//         )}

//         {/* Cooldown Timer */}
//         {!canPlay && (
//           <div className="mt-6 flex flex-col items-center">
//             <div className="w-24 h-24 mb-2">
//               <CircularProgressbar
//                 value={cooldownPercent}
//                 text={`${cooldownRemaining}s`}
//                 styles={buildStyles({
//                   textColor: '#888',
//                   pathColor: '#10b981',
//                   trailColor: '#eee',
//                 })}
//               />
//             </div>
//             <p className="text-sm text-muted-foreground">Please wait before your next play.</p>
//           </div>
//         )}
//       </motion.div>
//     </main>
//   );
// }

// 'use client';




// ...opponents, constants, and utility functions stay the same

export default function PlayGamePage() {
  const [opponent, setOpponent] = useState(opponents[0]);
  const [choices, setChoices] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [lastPlay, setLastPlay] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [loading, setLoading] = useState(false);
  const [rewardPending, setRewardPending] = useState(false); // ✅ New state

  const [wallet, setWallet] = useState<number>(3.4); // mock wallet
  const [totalPlays, setTotalPlays] = useState(0);
  const [totalWins, setTotalWins] = useState(0);

  const canPlay = cooldownRemaining <= 0;
  const cooldownPercent = ((COOLDOWN_SECONDS - cooldownRemaining) / COOLDOWN_SECONDS) * 100;

  const resetGame = () => {
    const round = generateRound();
    setOpponent(round.opponent);
    setChoices(round.options);
    setCorrectAnswer(round.answer);
    setResult(null);
    setLoading(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('lastPlay');
    if (stored) setLastPlay(Number(stored));
    resetGame();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastPlay) {
        const remaining = COOLDOWN_SECONDS - Math.floor((Date.now() - lastPlay) / 1000);
        setCooldownRemaining(Math.max(remaining, 0));
        if (remaining <= 0) {
          resetGame();
          setLastPlay(null);
          localStorage.removeItem('lastPlay');
          toast.success('Cooldown complete! You can play again.');
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastPlay]);

  const creditWallet = () => {
    setWallet(prev => +(prev + 0.3).toFixed(2));
    toast.success('🎁 $0.30 has been credited to your wallet!');
  };

  const handleGuess = async (guess: number) => {
    if (!canPlay) {
      toast.warning('Please wait for cooldown.');
      return;
    }

    setLoading(true);
    await new Promise(res => setTimeout(res, 800));

    const now = Date.now();
    setLastPlay(now);
    localStorage.setItem('lastPlay', now.toString());
    setCooldownRemaining(COOLDOWN_SECONDS);

    setTotalPlays(prev => prev + 1);

    if (guess === correctAnswer) {
      setResult('win');
      setTotalWins(prev => prev + 1);
      setRewardPending(true); // ✅ Trigger ad
      toast.success('🎉 Correct guess! Watch ad to claim reward.');
    } else {
      setResult('lose');
      toast.error(`❌ ${opponent.name} chose ${correctAnswer}.`);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">

      {result === 'win' && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        {/* Opponent Display */}
        <div className="text-center mb-6">
          <img
            src={opponent.avatar}
            alt={opponent.name}
            className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-muted"
          />
          <h1 className="text-2xl font-semibold">You're playing against {opponent.name}</h1>
          <p className="text-sm text-muted-foreground">Guess the number they picked</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Wallet</p>
            <p className="font-bold text-emerald-500">${wallet.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Plays</p>
            <p className="font-bold">{totalPlays}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wins</p>
            <p className="font-bold">{totalWins}</p>
          </div>
        </div>

        {/* Number Options */}
        <Card>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6">
            {choices.map(n => (
              <Button
                key={n}
                disabled={loading || !canPlay}
                onClick={() => handleGuess(n)}
                variant="secondary"
              >
                {n}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <div className="mt-6 text-center text-xl font-semibold">
            {result === 'win'
              ? '🎉 You Win! +$0.30 (after watching ad)'
              : `❌ You Lost. ${opponent.name} picked ${correctAnswer}.`}
          </div>
        )}

        {/* Cooldown */}
        {!canPlay && (
          <div className="mt-6 flex flex-col items-center">
            <div className="w-24 h-24 mb-2">
              <CircularProgressbar
                value={cooldownPercent}
                text={`${cooldownRemaining}s`}
                styles={buildStyles({
                  textColor: '#888',
                  pathColor: '#10b981',
                  trailColor: '#eee',
                })}
              />
            </div>
            <p className="text-sm text-muted-foreground">Please wait before your next play.</p>
          </div>
        )}
      </motion.div>

      {/* 🎥 Reward Ad Modal */}
      {rewardPending && (
        <RewardAdModal
          onComplete={() => {
            creditWallet(); // reward after full ad watch
            setRewardPending(false);
          }}
        />
      )}
    </main>
  );
}

