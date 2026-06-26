import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const cards = [
  {
    id: 'paris',
    title: 'Paris 1889',
    subtitle: 'Belle Époque • Exposition universelle • Soirées raffinées',
    img: 'https://i.imgur.com/y5alQmB.png',
    details: {
      climate: 'Tempéré, étés doux et hivers frais.',
      context:
        "Période de faste artistique et industriel marquée par l'Exposition universelle — salons, théâtres et ateliers d'artiste foisonnent.",
      points: ['Tour Eiffel en construction', 'Ateliers de Montmartre', "Cafés littéraires"]
    }
  },
  {
    id: 'cretace',
    title: 'Crétacé (-65M)',
    subtitle: 'Dinosaures • Forêts primordiales • Aventure sauvage',
    img: 'https://i.imgur.com/DgnNN4c.png',
    details: {
      climate: 'Chaud et humide, forêts tropicales denses.',
      context:
        "Un monde primitif dominé par la mégafaune — expéditions guidées strictes pour éviter tout contact direct.",
      points: ['Randonnées guidées', 'Observation de faune à distance', 'Fossiles vivants']
    }
  },
  {
    id: 'florence',
    title: 'Florence 1504',
    subtitle: 'Renaissance • Ateliers d’artistes • Architecture sublime',
    img: 'https://i.imgur.com/170Xsfu.png',
    details: {
      climate: 'Méditerranéen, hivers doux et étés chauds.',
      context:
        "Siège des arts et de l'architecture — mécènes, ateliers et concours d'art rythment la cité.",
      points: ['Atelier de Michel-Ange', "Piazza della Signoria", 'Galeries privées']
    }
  },
];

export default function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  return (
    <section id="destinations" className="bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-light uppercase tracking-[0.35em] text-yellow-500">
            Destinations exclusives
          </p>
          <h2 className="text-3xl font-light tracking-[0.18em] text-stone-100 sm:text-4xl">
            Une sélection rare, pensée pour les voyageurs exigeants.
          </h2>
          <p className="mt-4 text-base leading-8 text-stone-400">
            Chaque escapade est conçue comme un récit vivant, entre prestige, atmosphère et détail d’exception.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((c) => (
            <motion.article
              key={c.id}
              className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <div className="overflow-hidden">
                <img src={c.img} alt={c.title} className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="inline-flex w-fit rounded-full border border-yellow-600/30 bg-yellow-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-yellow-400">
                  Édition limitée
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-[0.16em] text-stone-100">{c.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-400">{c.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedDestination(c)}
                  className="mt-2 inline-flex w-fit items-center rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-yellow-600/40 hover:text-yellow-300"
                >
                  En savoir plus
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {selectedDestination && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedDestination(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl w-full bg-zinc-900 border border-yellow-600/30 rounded-2xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-4 right-4 z-50 inline-flex items-center justify-center rounded-md bg-white/5 p-2 text-stone-200 hover:bg-white/10"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>

                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={selectedDestination.img}
                    alt={selectedDestination.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-light tracking-[0.12em] text-stone-100">
                    {selectedDestination.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{selectedDestination.subtitle}</p>

                  <div className="mt-4 space-y-3 text-stone-300">
                    <p>
                      <strong className="text-yellow-400">Climat:</strong>{' '}
                      {selectedDestination.details?.climate}
                    </p>
                    <p>
                      <strong className="text-yellow-400">Contexte historique:</strong>{' '}
                      {selectedDestination.details?.context}
                    </p>
                    <div>
                      <strong className="text-yellow-400">Points d'intérêt:</strong>
                      <ul className="mt-2 ml-5 list-disc text-stone-300">
                        {selectedDestination.details?.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
