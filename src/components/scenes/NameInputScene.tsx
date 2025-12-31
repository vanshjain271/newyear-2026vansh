import { motion } from "framer-motion";
import { useState } from "react";
import { CelebrationButton } from "../CelebrationButton";
import { FloatingElements } from "../FloatingElements";

interface NameInputSceneProps {
  onContinue: (name: string) => void;
}

export const NameInputScene = ({ onContinue }: NameInputSceneProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onContinue(name.trim());
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-warm flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingElements showSparkles showButterflies showBalloons={false} />

      <motion.div
        className="z-20 flex flex-col items-center px-6 max-w-md w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to the celebration!
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Enter your name to make this experience special 💝
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 30))}
              placeholder="Your name..."
              className="w-full px-6 py-4 text-lg font-medium text-foreground bg-card/80 backdrop-blur-sm border-2 border-border/50 rounded-2xl focus:outline-none focus:border-coral transition-colors placeholder:text-muted-foreground/60 text-center"
              maxLength={30}
              autoFocus
            />
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎀
            </motion.div>
          </div>

          <div onClick={handleSubmit} className="flex justify-center">
            <CelebrationButton
              variant="magic"
              disabled={!name.trim()}
              className={!name.trim() ? "opacity-50 cursor-not-allowed" : ""}
            >
              Start My Celebration 🎉
            </CelebrationButton>
          </div>
        </motion.form>

        <motion.p
          className="text-sm text-muted-foreground/70 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          This is just for you 💫
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
