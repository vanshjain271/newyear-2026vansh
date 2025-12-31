import { motion } from "framer-motion";
import { useState } from "react";
import { CelebrationButton } from "../CelebrationButton";

interface FlipCardsSceneProps {
  onContinue: () => void;
}

interface WishCard {
  id: number;
  frontEmoji: string;
  backMessage: string;
  bgColor: string;
}

const wishCards: WishCard[] = [
  { id: 1, frontEmoji: "🤍", backMessage: "Love you", bgColor: "bg-rose/20" },
  { id: 2, frontEmoji: "🌱", backMessage: "Always rooting for you", bgColor: "bg-mint/30" },
  { id: 3, frontEmoji: "✨", backMessage: "You make life brighter", bgColor: "bg-gold/20" },
  { id: 4, frontEmoji: "🫶", backMessage: "Never stop being you", bgColor: "bg-lavender/30" },
  { id: 5, frontEmoji: "🌈", backMessage: "Dream big this year", bgColor: "bg-sky/20" },
  { id: 6, frontEmoji: "🎯", backMessage: "You've got this", bgColor: "bg-coral/20" },
];

const FlipCard = ({ card, index }: { card: WishCard; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="perspective-1000 cursor-pointer w-36 h-44 md:w-40 md:h-48"
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-2xl ${card.bgColor} border-2 border-card shadow-card flex items-center justify-center`}
        >
          <motion.span 
            className="text-5xl md:text-6xl"
            animate={!isFlipped ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {card.frontEmoji}
          </motion.span>
          
          {/* Tap hint */}
          {!isFlipped && (
            <motion.div
              className="absolute bottom-3 text-xs text-muted-foreground font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to flip
            </motion.div>
          )}
        </div>

        {/* Back */}
        <div 
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-card-gradient border-2 border-primary/20 shadow-card flex items-center justify-center p-4`}
        >
          <motion.p 
            className="text-lg md:text-xl font-display font-semibold text-foreground text-center leading-snug"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFlipped ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            {card.backMessage} {card.frontEmoji}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const FlipCardsScene = ({ onContinue }: FlipCardsSceneProps) => {
  return (
    <motion.div
      className="min-h-screen bg-celebration flex flex-col items-center justify-center relative overflow-hidden py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-8 z-10 px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Flip for wishes 💌
        </h2>
        <p className="text-muted-foreground">
          Each card holds a special message
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4 mb-10 z-10">
        {wishCards.map((card, index) => (
          <FlipCard key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* Continue button */}
      <motion.div
        className="z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <CelebrationButton onClick={onContinue} variant="magic">
          One last surprise 🎁
        </CelebrationButton>
      </motion.div>
    </motion.div>
  );
};
