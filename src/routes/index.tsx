import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Section } from "@/components/Section";
import { FloatingHearts } from "@/components/FloatingHearts";
import { recordForgiveness } from "@/utils/forgive.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Apsara 💙🌷" },
      { name: "description", content: "A little page made with love, just for you." },
    ],
  }),
  component: LovePage,
});

// Cute typewriter effect
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// Bouncing emoji
function BouncingEmoji({ emoji, delay = 0 }: { emoji: string; delay?: number }) {
  return (
    <motion.span
      className="inline-block"
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 2, delay, ease: "easeInOut" }}
    >
      {emoji}
    </motion.span>
  );
}

// Sparkle that appears randomly
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`absolute text-sm pointer-events-none select-none ${className}`}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      ✨
    </motion.span>
  );
}

function LovePage() {
  const [forgiven, setForgiven] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const forgiveFn = useServerFn(recordForgiveness);

  const handleForgive = async () => {
    setShowHearts(true);
    try {
      await forgiveFn({});
    } catch {
      // still show animation even if API fails
    }
    setTimeout(() => setForgiven(true), 800);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <FloatingHearts trigger={showHearts} />

      {/* Floating background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { top: "10%", left: "5%", delay: 0 },
          { top: "25%", right: "8%", delay: 1.5 },
          { top: "50%", left: "3%", delay: 0.8 },
          { top: "70%", right: "5%", delay: 2 },
          { top: "85%", left: "10%", delay: 1.2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{ top: pos.top, left: pos.left, right: pos.right }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              delay: pos.delay,
              ease: "easeInOut",
            }}
          >
            🌷
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <Section className="pt-24 pb-8 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          >
            <div className="flex justify-center gap-2 mb-4">
              <BouncingEmoji emoji="🌷" delay={0} />
              <BouncingEmoji emoji="💙" delay={0.3} />
              <BouncingEmoji emoji="🌷" delay={0.6} />
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary mb-4 relative inline-block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Sparkle className="-top-3 -left-6" />
              <Sparkle className="-top-2 -right-6" />
              Hey Apsara ❤️
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-lg text-muted-foreground italic"
            >
              <Typewriter text="I made this little page just for you." delay={1200} />
            </motion.p>
          </motion.div>
        </Section>

        {/* Decorative divider */}
        <motion.div
          className="text-center text-2xl tracking-widest select-none py-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-tulip-light">
            <BouncingEmoji emoji="🌷" delay={0} /> ·{" "}
            <BouncingEmoji emoji="🌷" delay={0.4} /> ·{" "}
            <BouncingEmoji emoji="🌷" delay={0.8} />
          </span>
        </motion.div>

        {/* Main Message */}
        <Section delay={0.1}>
          <motion.h2
            className="text-2xl font-semibold text-primary mb-6 text-center"
            style={{ fontFamily: "var(--font-display)" }}
            whileInView={{ scale: [0.95, 1.02, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🌸 Apsara, I just want you to know something…
          </motion.h2>
          <div className="space-y-4 text-center text-foreground/80 text-lg leading-relaxed">
            {[
              { text: "I'm sorry if I made you feel ignored.", bold: false },
              { text: "That was never my intention.", bold: true },
              { text: "Sometimes I reply late because I'm thinking, not because I don't care.", bold: false },
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className={line.bold ? "font-medium text-foreground" : ""}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              The truth is…{" "}
              <motion.span
                className="text-primary font-semibold inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                I care about you a lot. 💙
              </motion.span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              And I honestly don't like it when you're upset.
            </motion.p>
          </div>
        </Section>

        {/* Short & Sweet */}
        <Section delay={0.1} className="py-8">
          <motion.div
            className="bg-accent/50 rounded-2xl p-8 text-center border border-primary/10 relative overflow-hidden"
            whileInView={{ boxShadow: ["0 0 0 rgba(59,130,246,0)", "0 0 30px rgba(59,130,246,0.15)", "0 0 15px rgba(59,130,246,0.08)"] }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          >
            <Sparkle className="top-3 left-4" />
            <Sparkle className="bottom-3 right-4" />
            <motion.p
              className="text-xl text-foreground italic leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              💌 You're special to me.
              <br />
              <motion.span
                className="text-primary font-medium inline-block"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                More than you probably realize.
              </motion.span>
            </motion.p>
          </motion.div>
        </Section>

        {/* 3 Reasons */}
        <Section delay={0.1}>
          <h2
            className="text-2xl font-semibold text-primary mb-8 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ✨ 3 reasons why I like you
          </h2>
          <div className="space-y-4">
            {[
              { emoji: "😊", text: "Your smile makes everything better." },
              { emoji: "🥺", text: "The way you act cute even when you're mad 😭" },
              { emoji: "☮️", text: "You bring peace to me, even when we fight." },
            ].map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.03, y: -4, boxShadow: "0 8px 25px rgba(59,130,246,0.15)" }}
                className="bg-card rounded-xl p-6 shadow-sm border border-primary/10 flex items-center gap-4 cursor-default transition-colors"
              >
                <motion.span
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                >
                  {reason.emoji}
                </motion.span>
                <p className="text-lg text-card-foreground">
                  ❤️ {reason.text}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Promise */}
        <Section delay={0.1}>
          <h2
            className="text-2xl font-semibold text-primary mb-6 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            🫶 A small promise
          </h2>
          <motion.div
            className="bg-accent/30 rounded-2xl p-8 text-center border border-primary/10 space-y-4 relative"
            whileInView={{ borderColor: ["rgba(59,130,246,0.1)", "rgba(59,130,246,0.3)", "rgba(59,130,246,0.1)"] }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
              animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🤙
            </motion.div>
            <p className="text-lg text-foreground/80 leading-relaxed pt-2">
              From now on, if I'm busy or slow to reply, I'll tell you.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Because I don't want you to ever feel unwanted or ignored.
            </p>
            <motion.p
              className="text-xl text-primary font-semibold mt-4"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              You matter to me, Apsara. 💙
            </motion.p>
          </motion.div>
        </Section>

        {/* Photos */}
       
        {/* Ending */}
        <Section delay={0.1} className="text-center">
          <motion.h2
            className="text-3xl font-bold text-primary mb-6 relative inline-block"
            style={{ fontFamily: "var(--font-display)" }}
            whileInView={{ scale: [0.9, 1.05, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkle className="-top-4 -left-8" />
            <Sparkle className="-top-3 -right-8" />
            Apsara… can we be okay now? 🥺
          </motion.h2>
          <div className="space-y-3 text-lg text-foreground/80 leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I don't want to fight with you.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              I want to make you smile, not stress you.
            </motion.p>
            <motion.p
              className="text-xl text-primary font-semibold pt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              animate={{ scale: [1, 1.05, 1] }}
            >
              I miss you. 💙
            </motion.p>
          </div>
        </Section>

        {/* Forgive Button */}
        <Section delay={0.1} className="text-center pb-8">
          <AnimatePresence mode="wait">
            {!forgiven ? (
              <motion.div key="button" exit={{ scale: 0, opacity: 0 }}>
                <motion.button
                  onClick={handleForgive}
                  whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                  className="px-10 py-4 bg-primary text-primary-foreground text-xl font-semibold rounded-full shadow-lg cursor-pointer relative"
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                >
                  <span className="relative z-10">Click if you forgive me 🥺❤️</span>
                </motion.button>
                <motion.p
                  className="text-muted-foreground text-sm mt-3 italic"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  go on… tap it 👉👈
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="thankyou"
                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
                className="space-y-4"
              >
                <motion.p
                  className="text-6xl"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💙🌷
                </motion.p>
                <p className="text-2xl text-primary font-bold">
                  Thank you, Apsara 🥹
                </p>
                <p className="text-lg text-muted-foreground">
                  You just made me the happiest person ever 💕
                </p>
                <motion.div
                  className="flex justify-center gap-2 text-2xl pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {["🌷", "💙", "🦋", "✨", "💕"].map((e, i) => (
                    <BouncingEmoji key={i} emoji={e} delay={i * 0.2} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-sm">
              Made with love by{" "}
              <span className="text-primary font-semibold">Josekutty</span> ❤️
            </p>
            <motion.p
              className="text-2xl mt-2"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🌷
            </motion.p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}
