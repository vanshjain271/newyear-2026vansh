import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingElementsProps {
  showConfetti?: boolean;
  showBalloons?: boolean;
  showButterflies?: boolean;
  showSparkles?: boolean;
}

const Balloon = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className="absolute bottom-0 pointer-events-none"
    style={{ left: `${x}%` }}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{ 
      y: "-100vh",
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 12,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div className="relative">
      <div 
        className={`w-10 h-12 rounded-full ${color} shadow-lg`}
        style={{ 
          borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-foreground/20" />
    </div>
  </motion.div>
);

const Butterfly = ({ delay, startX }: { delay: number; startX: number }) => (
  <motion.div
    className="absolute pointer-events-none text-3xl"
    style={{ left: `${startX}%`, top: "50%" }}
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{
      x: [0, 50, -30, 80, 20],
      y: [-50, 30, -80, 10, -60],
      opacity: [0, 1, 1, 1, 0],
      rotate: [0, 10, -10, 15, -5],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    🦋
  </motion.div>
);

const Confetti = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className={`absolute w-3 h-3 ${color} rounded-sm pointer-events-none`}
    style={{ left: `${x}%`, top: -20 }}
    initial={{ y: -20, rotate: 0, opacity: 1 }}
    animate={{
      y: "100vh",
      rotate: 720,
      opacity: [1, 1, 0],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none text-2xl"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    ✨
  </motion.div>
);

export const FloatingElements = ({
  showConfetti = false,
  showBalloons = true,
  showButterflies = true,
  showSparkles = true,
}: FloatingElementsProps) => {
  const balloonColors = ["bg-coral", "bg-rose", "bg-lavender", "bg-mint", "bg-gold", "bg-sky", "bg-peach"];
  const confettiColors = ["bg-coral", "bg-gold", "bg-lavender", "bg-mint", "bg-rose", "bg-sky"];

  const balloons = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      x: 5 + (i * 12),
      color: balloonColors[i % balloonColors.length],
    })), []);

  const butterflies = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      delay: i * 2,
      startX: 10 + (i * 25),
    })), []);

  const confetti = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      x: Math.random() * 100,
      color: confettiColors[i % confettiColors.length],
    })), []);

  const sparkles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {showBalloons && balloons.map(balloon => (
        <Balloon key={balloon.id} {...balloon} />
      ))}
      
      {showButterflies && butterflies.map(butterfly => (
        <Butterfly key={butterfly.id} {...butterfly} />
      ))}
      
      {showConfetti && confetti.map(c => (
        <Confetti key={c.id} {...c} />
      ))}
      
      {showSparkles && sparkles.map(sparkle => (
        <Sparkle key={sparkle.id} {...sparkle} />
      ))}
    </div>
  );
};
