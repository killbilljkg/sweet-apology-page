import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingHearts({ trigger }: { trigger: boolean }) {
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
      }));
      setHearts(newHearts);
      const timer = setTimeout(() => setHearts([]), 2500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "100vh", x: `${heart.x}vw`, opacity: 1, scale: 1 }}
            animate={{ y: "-10vh", opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
            className="absolute text-3xl"
          >
            {["❤️", "💙", "🌷", "💕", "💗"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
