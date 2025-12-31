import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CelebrationButton } from "../CelebrationButton";

interface WishSceneProps {
  onContinue: () => void;
  userName: string;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
}

const FireworkBurst = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30 * Math.PI) / 180,
  }));

  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full ${color}`}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(particle.angle) * 80,
            y: Math.sin(particle.angle) * 80,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className={`absolute w-4 h-4 rounded-full ${color} -translate-x-1/2 -translate-y-1/2`}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 2, 0], opacity: [1, 0.5, 0] }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute text-2xl pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
    }}
  >
    ✨
  </motion.div>
);

export const WishScene = ({ onContinue, userName }: WishSceneProps) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const colors = ["bg-coral", "bg-gold", "bg-rose", "bg-lavender", "bg-mint"];

  useEffect(() => {
    // Initial burst of fireworks
    const createFirework = () => ({
      id: Date.now() + Math.random(),
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 50,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    // Create initial fireworks
    setFireworks([createFirework(), createFirework(), createFirework()]);

    // Continue creating fireworks
    const interval = setInterval(() => {
      setFireworks((prev) => {
        const newFireworks = [...prev, createFirework()];
        if (newFireworks.length > 8) {
          return newFireworks.slice(-8);
        }
        return newFireworks;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-celebration flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fireworks */}
      <div className="absolute inset-0 pointer-events-none">
        {fireworks.map((fw) => (
          <FireworkBurst key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <Sparkle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="z-20 text-center px-6 max-w-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="text-6xl md:text-8xl mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🎆
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-gradient-celebration">2026</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-medium text-foreground/90 mb-10 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Dear {userName}, wishing you love, laughter, and beautiful surprises ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <CelebrationButton onClick={onContinue} variant="primary">
            Continue Celebration →
          </CelebrationButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
