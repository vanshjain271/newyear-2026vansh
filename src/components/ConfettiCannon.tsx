import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

const colors = [
  "hsl(var(--coral))",
  "hsl(var(--rose))",
  "hsl(var(--gold))",
  "hsl(var(--mint))",
  "hsl(var(--lavender))",
  "#FF6B9D",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
];

export const ConfettiCannon = ({ trigger }: { trigger: boolean }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const pieces: ConfettiPiece[] = [];
      const numPieces = 100;

      for (let i = 0; i < numPieces; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
          size: 8 + Math.random() * 8,
        });
      }

      setConfetti(pieces);

      // Clean up after animation
      const timer = setTimeout(() => setConfetti([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              top: -20,
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
              borderRadius: 2,
            }}
            initial={{
              y: -20,
              rotate: piece.rotation,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: piece.rotation + 720,
              opacity: [1, 1, 1, 0],
              x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: piece.delay,
              ease: [0.23, 0.51, 0.32, 0.95],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
