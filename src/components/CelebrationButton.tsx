import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface CelebrationButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "magic";
  className?: string;
  disabled?: boolean;
}

export const CelebrationButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: CelebrationButtonProps) => {
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-celebration hover:shadow-glow",
    secondary: "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary/90",
    magic: "bg-magic text-primary-foreground shadow-glow hover:shadow-float",
  };

  return (
    <motion.button
      className={`
        px-8 py-4 rounded-2xl font-display font-semibold text-lg
        transition-all duration-300 cursor-pointer
        ${variants[variant]}
        ${className}
        ${disabled ? "pointer-events-none" : ""}
      `}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.button>
  );
};
