import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const titleVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
  };

  const handleScroll = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen bg-zinc-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center gap-10 rounded-[2rem] border border-yellow-600/20 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-900/80 px-6 py-16 shadow-[0_0_80px_rgba(202,138,4,0.12)] sm:px-10 lg:px-16 lg:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-600/30 bg-white/5 px-4 py-2 text-sm font-light uppercase tracking-[0.3em] text-yellow-400 backdrop-blur-md">
          <Sparkles size={16} />
          Collection privée 2026
        </div>

        <motion.h1
          className="max-w-4xl text-center text-4xl font-light leading-tight tracking-[0.16em] text-stone-100 sm:text-5xl lg:text-7xl"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 bg-clip-text text-transparent">
            Voyagez au cœur des époques.
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-center text-base font-light leading-8 text-stone-300 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
            TimeTravel Agency propose des sauts temporels sécurisés et luxueux — voyages orchestrés
            par des experts pour vivre l'histoire dans le confort et l'élégance.
        </motion.p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-3 rounded-full border border-yellow-600/30 bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-semibold tracking-[0.2em] text-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(250,204,21,0.25)]"
            aria-label="Voir les destinations"
          >
            Explorer les destinations
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
