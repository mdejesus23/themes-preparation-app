import React, { useState, useEffect } from 'react';
import { HiMiniChevronDoubleUp } from 'react-icons/hi2';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-4 z-10 flex cursor-pointer items-center justify-center bg-yellow p-2 text-sm font-bold text-neutral-700 md:bottom-10 md:right-10 md:p-3"
        aria-label="Scroll to top"
      >
        <HiMiniChevronDoubleUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
