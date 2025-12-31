import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScene } from "@/components/scenes/LoadingScene";
import { NameInputScene } from "@/components/scenes/NameInputScene";
import { EnvelopeScene } from "@/components/scenes/EnvelopeScene";
import { WishScene } from "@/components/scenes/WishScene";
import { StickerScene } from "@/components/scenes/StickerScene";
import { FlipCardsScene } from "@/components/scenes/FlipCardsScene";
import { FinalScene } from "@/components/scenes/FinalScene";

type Scene = "loading" | "nameInput" | "envelope" | "wish" | "sticker" | "flipCards" | "final";

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("loading");
  const [userName, setUserName] = useState("");

  const transitionToScene = (scene: Scene) => {
    setCurrentScene(scene);
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    transitionToScene("envelope");
  };

  const restartExperience = () => {
    setCurrentScene("loading");
    setUserName("");
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScene === "loading" && (
          <motion.div key="loading">
            <LoadingScene onComplete={() => transitionToScene("nameInput")} />
          </motion.div>
        )}

        {currentScene === "nameInput" && (
          <motion.div key="nameInput">
            <NameInputScene onContinue={handleNameSubmit} />
          </motion.div>
        )}
        
        {currentScene === "envelope" && (
          <motion.div key="envelope">
            <EnvelopeScene onContinue={() => transitionToScene("wish")} userName={userName} />
          </motion.div>
        )}
        
        {currentScene === "wish" && (
          <motion.div key="wish">
            <WishScene onContinue={() => transitionToScene("sticker")} userName={userName} />
          </motion.div>
        )}
        
        {currentScene === "sticker" && (
          <motion.div key="sticker">
            <StickerScene onContinue={() => transitionToScene("flipCards")} />
          </motion.div>
        )}
        
        {currentScene === "flipCards" && (
          <motion.div key="flipCards">
            <FlipCardsScene onContinue={() => transitionToScene("final")} />
          </motion.div>
        )}
        
        {currentScene === "final" && (
          <motion.div key="final">
            <FinalScene onRestart={restartExperience} userName={userName} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
