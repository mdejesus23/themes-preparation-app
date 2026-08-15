import { useEffect, useState } from 'react';
import { HiMiniChevronDoubleUp } from 'react-icons/hi2';

// How far down the page the button appears.
const SHOW_AFTER_PX = 300;

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Only re-render when the state actually flips, not on every scroll tick.
      setVisible((prev) => {
        const next = window.scrollY > SHOW_AFTER_PX;
        return next === prev ? prev : next;
      });
    };

    toggleVisibility(); // the page can load already scrolled (hash link, restored position)
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  // Kept mounted so it can fade and slide instead of popping in and out.
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-24 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-green text-white shadow-lg ring-offset-2 ring-offset-bgSecondary transition-all duration-300 ease-out hover:bg-lightGreen hover:opacity-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green active:scale-95 motion-reduce:transition-none md:bottom-10 md:right-10 md:h-12 md:w-12 ${
        visible
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-90'
          : 'pointer-events-none translate-y-3 scale-95 opacity-0'
      }`}
    >
      <HiMiniChevronDoubleUp
        size={20}
        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </button>
  );
}

export default ScrollToTopButton;
