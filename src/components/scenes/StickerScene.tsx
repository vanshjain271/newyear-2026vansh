import { motion } from "framer-motion";
import { useState } from "react";
import { CelebrationButton } from "../CelebrationButton";

interface StickerSceneProps {
  onContinue: () => void;
}

interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const stickersData: Sticker[] = [
  { id: 1, emoji: "🎁", x: 15, y: 20, rotation: -15, scale: 1 },
  { id: 2, emoji: "💖", x: 75, y: 15, rotation: 10, scale: 1.1 },
  { id: 3, emoji: "⭐", x: 85, y: 45, rotation: -5, scale: 0.9 },
  { id: 4, emoji: "😊", x: 10, y: 55, rotation: 12, scale: 1 },
  { id: 5, emoji: "🌟", x: 45, y: 12, rotation: -8, scale: 1.2 },
  { id: 6, emoji: "🎀", x: 25, y: 75, rotation: 15, scale: 0.95 },
  { id: 7, emoji: "💫", x: 70, y: 70, rotation: -10, scale: 1.05 },
  { id: 8, emoji: "🦋", x: 55, y: 80, rotation: 5, scale: 1 },
  { id: 9, emoji: "🌸", x: 88, y: 25, rotation: -20, scale: 0.9 },
  { id: 10, emoji: "✨", x: 5, y: 35, rotation: 8, scale: 1.1 },
];

const InteractiveSticker = ({ sticker }: { sticker: Sticker }) => {
  const [isActive, setIsActive] = useState(false);
  const [animationType, setAnimationType] = useState<"bounce" | "spin" | "pop" | "glow">("bounce");

  const animations = {
    bounce: {
      y: [0, -20, 0],
      transition: { duration: 0.5 },
    },
    spin: {
      rotate: [0, 360],
      transition: { duration: 0.6 },
    },
    pop: {
      scale: [1, 1.5, 1],
      transition: { duration: 0.4 },
    },
    glow: {
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 },
    },
  };

  const handleClick = () => {
    if (isActive) return;
    
    const types: Array<"bounce" | "spin" | "pop" | "glow"> = ["bounce", "spin", "pop", "glow"];
    setAnimationType(types[Math.floor(Math.random() * types.length)]);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 600);
  };

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
      }}
      initial={{ 
        scale: 0, 
        rotate: sticker.rotation,
        opacity: 0 
      }}
      animate={{ 
        scale: sticker.scale, 
        rotate: sticker.rotation,
        opacity: 1,
        ...(isActive ? animations[animationType] : {}),
      }}
      transition={{ 
        delay: sticker.id * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: sticker.scale * 1.15 }}
      whileTap={{ scale: sticker.scale * 0.9 }}
      onClick={handleClick}
    >
      <div className="text-5xl md:text-6xl drop-shadow-lg relative">
        {sticker.emoji}
        {isActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute w-16 h-16 bg-gold/30 rounded-full blur-xl" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const StickerScene = ({ onContinue }: StickerSceneProps) => {
  return (
    <motion.div
      className="min-h-screen bg-warm flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--coral)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Stickers */}
      <div className="absolute inset-0">
        {stickersData.map((sticker) => (
          <InteractiveSticker key={sticker.id} sticker={sticker} />
        ))}
      </div>

      {/* Center content */}
      <motion.div
        className="z-20 text-center px-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-float max-w-sm mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Tap the stickers! 🎯
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Watch them come alive ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <CelebrationButton onClick={onContinue} variant="primary">
              Flip the wishes 💌
            </CelebrationButton>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
