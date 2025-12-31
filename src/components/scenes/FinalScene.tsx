import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { CelebrationButton } from "../CelebrationButton";
import { ConfettiCannon } from "../ConfettiCannon";

interface FinalSceneProps {
  onRestart: () => void;
  userName: string;
}

interface BurstEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

const emojis = ["❤️", "🤗", "🌸", "🎁", "💖", "✨", "🦋", "🌟", "💝", "🎀"];

export const FinalScene = ({ onRestart, userName }: FinalSceneProps) => {
  const [bursts, setBursts] = useState<BurstEmoji[]>([]);
  const [hugCount, setHugCount] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const createBurst = useCallback(() => {
    const newBursts: BurstEmoji[] = [];
    const numEmojis = 15 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < numEmojis; i++) {
      newBursts.push({
        id: Date.now() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: 45 + Math.random() * 10,
        y: 40 + Math.random() * 10,
        angle: (i / numEmojis) * 360,
        distance: 100 + Math.random() * 150,
      });
    }
    
    setBursts((prev) => [...prev, ...newBursts]);
    setHugCount((prev) => prev + 1);
    
    // Show final message after 3 hugs
    if (hugCount >= 2) {
      setTimeout(() => {
        setShowFinalMessage(true);
        setShowConfetti(true);
      }, 1000);
    }
    
    // Clean up old bursts
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
    }, 2000);
  }, [hugCount]);

  return (
    <motion.div
      className="min-h-screen bg-final flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Confetti cannon */}
      <ConfettiCannon trigger={showConfetti} />
      
      {/* Ambient sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Emoji bursts */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="absolute text-3xl md:text-4xl pointer-events-none"
            style={{
              left: `${burst.x}%`,
              top: `${burst.y}%`,
            }}
            initial={{ 
              scale: 0, 
              opacity: 1,
              x: 0,
              y: 0,
            }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [1, 1, 0],
              x: Math.cos(burst.angle * Math.PI / 180) * burst.distance,
              y: Math.sin(burst.angle * Math.PI / 180) * burst.distance - 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            {burst.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="z-20 text-center px-6 max-w-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Tap for hug */}
        <motion.div
          className="mb-8"
          animate={!showFinalMessage ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.button
            className="text-8xl md:text-9xl cursor-pointer focus:outline-none"
            onClick={createBurst}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🤗
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="tap-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap for a virtual hug, {userName} 🤗
              </motion.h2>
              <p className="text-muted-foreground">
                Keep tapping for more love!
              </p>
              {hugCount > 0 && (
                <motion.div
                  className="mt-4 flex justify-center gap-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {Array.from({ length: Math.min(hugCount, 10) }, (_, i) => (
                    <motion.span
                      key={i}
                      className="text-xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      💖
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="final-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-float"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌟
                </motion.div>
                
                <motion.h2
                  className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {userName}, wishing you a year full of warmth and magic
                </motion.h2>
                
                <motion.p
                  className="text-lg text-muted-foreground mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  May 2026 bring you endless joy ✨
                </motion.p>
                
                <motion.div
                  className="pt-4 border-t border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="font-display font-semibold text-lg text-foreground">
                    — HansRaj Jain & Family
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    With love 💝
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Experience Again button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <CelebrationButton onClick={onRestart} variant="magic">
                  Experience Again ✨
                </CelebrationButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--rose) / 0.2), transparent)",
        }}
      />
    </motion.div>
  );
};
