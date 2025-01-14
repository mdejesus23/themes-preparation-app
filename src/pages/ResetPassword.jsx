import { useState } from 'react';
import ResetPasswordForm from '../features/authentication/ResetPasswordForm';
import Main from '../ui/Main';
import bibleVerses from '../data/bibleVerses';
import { HiArrowPath } from 'react-icons/hi2';

function ResetPassword() {
  // State to manage the current Bible verse
  const [currentVerse, setCurrentVerse] = useState(
    bibleVerses[Math.floor(Math.random() * bibleVerses.length)],
  );

  // Function to get a new random verse
  const handleNewVerse = () => {
    const newVerse =
      bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    setCurrentVerse(newVerse);
  };
  return (
    <Main type="secondary">
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <img
          className="mx-auto max-w-56 object-cover"
          src="/bibleLogo.png"
          alt="banner"
        />

        {/* Display the current Bible verse */}
        <div className="my-4 text-center">
          <p className="text-lg font-semibold">{currentVerse.reference}</p>
          <p className="text-sm italic">{currentVerse.text}</p>
          <button onClick={handleNewVerse} className="mt-4 rounded px-4 py-2">
            <HiArrowPath size={20} />
          </button>
        </div>

        <h1 className="mt-20 text-center font-headfont text-3xl font-bold">
          Reset Password
        </h1>
        <ResetPasswordForm />
      </div>
    </Main>
  );
}

export default ResetPassword;
