import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts trigger={showHearts} />

      {/* Hero */}
      <Section className="pt-24 pb-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-5xl mb-4">🌷</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hey Apsara ❤️
          </h1>
          <p className="text-lg text-muted-foreground italic">
            I made this little page just for you.
          </p>
        </motion.div>
      </Section>

      {/* Decorative divider */}
      <div className="text-center text-2xl tracking-widest text-tulip-light select-none">
        🌷 · 🌷 · 🌷
      </div>

      {/* Main Message */}
      <Section delay={0.1}>
        <h2
          className="text-2xl font-semibold text-primary mb-6 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          🌸 Apsara, I just want you to know something…
        </h2>
        <div className="space-y-4 text-center text-foreground/80 text-lg leading-relaxed">
          <p>I'm sorry if I made you feel ignored.</p>
          <p className="font-medium text-foreground">That was never my intention.</p>
          <p>
            Sometimes I reply late because I'm thinking, not because I don't
            care.
          </p>
          <p>
            The truth is…{" "}
            <span className="text-primary font-semibold">
              I care about you a lot.
            </span>
          </p>
          <p>And I honestly don't like it when you're upset.</p>
        </div>
      </Section>

      {/* Short & Sweet */}
      <Section delay={0.1} className="py-8">
        <div className="bg-accent/50 rounded-2xl p-8 text-center border border-primary/10">
          <p className="text-xl text-foreground italic leading-relaxed">
            💌 You're special to me.
            <br />
            <span className="text-primary font-medium">
              More than you probably realize.
            </span>
          </p>
        </div>
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
            {
              emoji: "😊",
              text: "Your smile makes everything better.",
            },
            {
              emoji: "🥺",
              text: "The way you act cute even when you're mad 😭",
            },
            {
              emoji: "☮️",
              text: "You bring peace to me, even when we fight.",
            },
          ].map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-primary/10 flex items-center gap-4"
            >
              <span className="text-3xl">{reason.emoji}</span>
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
        <div className="bg-accent/30 rounded-2xl p-8 text-center border border-primary/10 space-y-4">
          <p className="text-lg text-foreground/80 leading-relaxed">
            From now on, if I'm busy or slow to reply, I'll tell you.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Because I don't want you to ever feel unwanted or ignored.
          </p>
          <p className="text-xl text-primary font-semibold mt-4">
            You matter to me, Apsara. 💙
          </p>
        </div>
      </Section>

      {/* Photos */}
      <Section delay={0.1}>
        <h2
          className="text-2xl font-semibold text-primary mb-8 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          📸 Our little moments
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-accent/50 border-2 border-dashed border-primary/20 flex items-center justify-center text-4xl"
            >
              {["🌷", "💙", "📷", "✨", "🦋", "🌸"][i]}
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-4 italic">
          Upload your photos here to fill these spots 💕
        </p>
      </Section>

      {/* Ending */}
      <Section delay={0.1} className="text-center">
        <h2
          className="text-3xl font-bold text-primary mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Apsara… can we be okay now? 🥺
        </h2>
        <div className="space-y-3 text-lg text-foreground/80 leading-relaxed">
          <p>I don't want to fight with you.</p>
          <p>I want to make you smile, not stress you.</p>
          <p className="text-xl text-primary font-semibold pt-2">
            I miss you. 💙
          </p>
        </div>
      </Section>

      {/* Forgive Button */}
      <Section delay={0.1} className="text-center pb-8">
        {!forgiven ? (
          <motion.button
            onClick={handleForgive}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-primary text-primary-foreground text-xl font-semibold rounded-full shadow-lg cursor-pointer"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            Click if you forgive me 🥺❤️
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-5xl">💙🌷</p>
            <p className="text-2xl text-primary font-bold">
              Thank you, Apsara 🥹
            </p>
            <p className="text-lg text-muted-foreground">
              You just made me the happiest person ever 💕
            </p>
          </motion.div>
        )}
      </Section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-muted-foreground text-sm">
          Made with love by{" "}
          <span className="text-primary font-semibold">Josekutty</span> ❤️
        </p>
        <p className="text-2xl mt-2">🌷</p>
      </footer>
    </div>
  );
}
