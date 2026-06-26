import React from 'react';
import './App.css';

import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100">
      <header className="sticky top-0 z-40 border-b border-yellow-600/20 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#hero" className="text-sm font-light uppercase tracking-[0.35em] text-yellow-400">
            TimeTravel Agency
          </a>
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href="#hero" className="transition hover:text-yellow-400">Accueil</a>
            <a href="#destinations" className="transition hover:text-yellow-400">Destinations</a>
            <a href="#quiz" className="transition hover:text-yellow-400">Quiz</a>
          </nav>
        </div>
      </header>

      <main className="flex flex-col">
        <Hero />
        <Destinations />
        <Quiz />
      </main>

      <footer className="border-t border-white/10 bg-zinc-950/90 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-stone-400 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} IA Créatives — TimeTravel Agency. Tous droits réservés.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
