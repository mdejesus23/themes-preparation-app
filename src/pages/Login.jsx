import { useState } from 'react';
import LoginForm from '../features/authentication/LoginForm';
import bibleVerses from '../data/bibleVerses';
import { HiArrowPath } from 'react-icons/hi2';

function Login() {
  const [currentVerse, setCurrentVerse] = useState(
    bibleVerses[Math.floor(Math.random() * bibleVerses.length)],
  );

  const handleNewVerse = () => {
    setCurrentVerse(
      bibleVerses[Math.floor(Math.random() * bibleVerses.length)],
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-8 py-6 md:flex-row">
      {/* Verse / image panel */}
      <aside className="relative flex min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-borderColor shadow-sm md:w-1/2">
        <img
          src="/placeholders/basilica.svg"
          alt="Basilica"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
        <div className="relative p-8 text-white">
          <p className="mb-2 text-lg font-semibold">{currentVerse.reference}</p>
          <p className="text-sm italic opacity-90">{currentVerse.text}</p>
          <button
            onClick={handleNewVerse}
            className="mt-4 flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-sm backdrop-blur transition-colors hover:bg-white/25"
          >
            <HiArrowPath size={16} /> Change verse
          </button>
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
