import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CelebrationButton } from "../CelebrationButton";
import { FloatingElements } from "../FloatingElements";

interface EnvelopeSceneProps {
  onContinue: () => void;
  userName: string;
}

export const EnvelopeScene = ({ onContinue, userName }: EnvelopeSceneProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Staged reveal: special message → greeting → button
      setTimeout(() => setShowSpecialMessage(true), 600);
      setTimeout(() => setShowGreeting(true), 1500);
      setTimeout(() => setShowButton(true), 2300);
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
      <FloatingElements showSparkles showButterflies={false} showBalloons={false} />
      
      <div className="z-20 flex flex-col items-center px-6">
        {/* Envelope */}
        <motion.div
          className="relative cursor-pointer mb-8"
          onClick={handleEnvelopeClick}
          animate={!isOpen ? { 
            y: [0, -8, 0],
            rotate: [-1, 1, -1],
          } : {}}
          transition={{
            duration: 2,
            repeat: !isOpen ? Infinity : 0,
            ease: "easeInOut",
          }}
          whileHover={!isOpen ? { scale: 1.05 } : {}}
          whileTap={!isOpen ? { scale: 0.98 } : {}}
        >
          {/* Envelope body - larger size */}
          <div className="relative w-80 h-56 md:w-96 md:h-64">
            {/* Back of envelope */}
            <div className="absolute inset-0 bg-envelope rounded-2xl shadow-float" />
            
            {/* Envelope flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-28 origin-top"
              animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of flap */}
              <div 
                className="absolute inset-0 bg-coral rounded-t-2xl"
                style={{ 
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  backfaceVisibility: "hidden",
                }}
              />
              {/* Back of flap */}
              <div 
                className="absolute inset-0 bg-rose rounded-t-2xl"
                style={{ 
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>
            
            {/* Heart seal - larger */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="absolute top-14 left-1/2 -translate-x-1/2 text-5xl z-10"
                  exit={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💝
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Letter inside - larger with shadow */}
            <motion.div
              className="absolute inset-x-4 top-4 bottom-4 bg-cream rounded-xl flex items-center justify-center p-6 shadow-lg"
              initial={{ y: 0 }}
              animate={isOpen ? { y: -70 } : { y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <AnimatePresence>
                {showSpecialMessage && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Big emotional headline with personalized name */}
                    <motion.span 
                      className="text-xl md:text-2xl font-display font-bold text-foreground block leading-tight"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
                    >
                      Hey {userName}! Something special awaits 🎁
                    </motion.span>
                    
                    {/* Happy New Year - slightly smaller, celebratory */}
                    <AnimatePresence>
                      {showGreeting && (
                        <motion.span 
                          className="text-3xl md:text-4xl font-display font-bold text-gradient-celebration block mt-4 drop-shadow-lg"
                          initial={{ y: 20, opacity: 0, scale: 0.9 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          style={{ textShadow: "0 4px 20px rgba(255, 111, 97, 0.4)" }}
                        >
                          🎉 Happy New Year 2026 🎉
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {!isOpen && (
            <motion.p
              className="text-center mt-6 text-muted-foreground font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tap to open ✨
            </motion.p>
          )}
        </motion.div>
        
        {/* Continue button - appears last */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <CelebrationButton onClick={onContinue} variant="magic">
                Begin Celebration 🎊
              </CelebrationButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
