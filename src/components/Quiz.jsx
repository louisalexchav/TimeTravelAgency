import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    q: 'Quelle expérience recherchez-vous ?',
    options: [
      { label: 'Romantique & culturel', value: 'paris' },
      { label: 'Aventure sauvage', value: 'cretace' },
      { label: 'Art & découverte', value: 'florence' },
    ],
  },
  {
    id: 2,
    q: 'Quelle période préférez-vous ?',
    options: [
      { label: 'Fin 19ème siècle', value: 'paris' },
      { label: 'Ère préhistorique', value: 'cretace' },
      { label: 'Renaissance', value: 'florence' },
    ],
  },
  {
    id: 3,
    q: 'Quel style de vie vous attire ?',
    options: [
      { label: 'Salons élégants et gastronomie', value: 'paris' },
      { label: 'Vie en pleine nature, survie', value: 'cretace' },
      { label: 'Ateliers d’artistes et mécènes', value: 'florence' },
    ],
  },
  {
    id: 4,
    q: 'Activité idéale pour vous ?',
    options: [
      { label: 'Balade urbaine & musées', value: 'paris' },
      { label: 'Expédition & observation', value: 'cretace' },
      { label: 'Visite d’atelier & ateliers', value: 'florence' },
    ],
  },
];

const destinationInfo = {
  paris: {
    title: 'Paris 1889 — Belle Époque',
    text: 'Un séjour raffiné entre salons, expositions universelles et la majestueuse Tour Eiffel. Idéal pour les amateurs d’histoire et de gastronomie.',
  },
  cretace: {
    title: 'Crétacé (-65M) — Aventure Préhistorique',
    text: 'Une immersion totale dans la nature sauvage et la rencontre des géants du passé. Parfait pour les aventuriers en quête d’émotions fortes.',
  },
  florence: {
    title: 'Florence 1504 — Renaissance',
    text: 'Exploration artistique parmi les ateliers de maîtres, chefs-d’œuvre et ruelles chargées d’histoire. Pour les passionnés d’art et d’architecture.',
  },
};

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleChoose = (val) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      const tally = nextAnswers.reduce((acc, v) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {});
      const winner = Object.keys(tally).reduce((a, b) => (tally[a] >= tally[b] ? a : b));
      setResult(winner);
    }
  };

  const restart = () => {
    setIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="quiz" className="bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-light uppercase tracking-[0.35em] text-yellow-500">Quiz personnalisé</p>
          <h2 className="text-3xl font-light tracking-[0.18em] text-stone-100 sm:text-4xl">
            Découvrez la destination qui vous ressemble.
          </h2>
        </div>

        {!result ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl rounded-[1.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md"
          >
            <div className="text-xl font-light tracking-[0.16em] text-stone-100">{questions[index].q}</div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {questions[index].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleChoose(opt.value)}
                  className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-left text-sm text-stone-200 transition-all duration-300 hover:border-yellow-600/40 hover:bg-yellow-500/10 hover:text-yellow-200"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm uppercase tracking-[0.3em] text-stone-500">
              Question {index + 1} sur {questions.length}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl rounded-[1.5rem] border border-yellow-600/30 bg-gradient-to-br from-yellow-500/15 to-amber-400/10 p-8 shadow-[0_0_80px_rgba(250,204,21,0.15)] backdrop-blur-md"
          >
            <h3 className="text-2xl font-light tracking-[0.16em] text-stone-100">{destinationInfo[result].title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">{destinationInfo[result].text}</p>
            <div className="mt-6">
              <button
                onClick={restart}
                className="rounded-full border border-yellow-600/30 bg-zinc-950/80 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400 transition hover:border-yellow-400/50"
              >
                Refaire le quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
