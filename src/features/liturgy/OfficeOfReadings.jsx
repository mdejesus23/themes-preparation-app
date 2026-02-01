import { useState, useRef, useEffect } from 'react';
import { useOfficeOfReadings } from './useOfficeOfReadings';
import Loader from '../../ui/Loader';
import ePub from 'epubjs';
import {
  HiArrowSmallRight,
  HiArrowSmallLeft,
  HiChevronUp,
  HiChevronDown,
  HiOutlineBookmark,
} from 'react-icons/hi2';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { HiMiniTrash } from 'react-icons/hi2';
import AddBookmarkForm from '../../ui/AddBookmarkForm';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { getItem, setItem } from '../../utils/storage';

function OfficeOfReadings() {
  const { bookId } = useParams();
  const { isPending, data, error } = useOfficeOfReadings(bookId);
  const { isDarkMode } = useTheme();

  const bookRef = useRef(null);
  const renditionRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [showToc, setShowToc] = useState(false);
  const [bookmarks, setBookmarks] = useState(() =>
    getItem('office-readings-bookmarks', []),
  );
  const [currentLocation, setCurrentLocation] = useState(null);
  const [epubError, setEpubError] = useState(null);
  const viewerHeightRef = useRef('80vh');
  const viewerContainerRef = useRef(null);

  const officeOfReadings = data?.data;

  // Calculate iOS-safe viewport height
  useEffect(() => {
    const updateHeight = () => {
      if (viewerContainerRef.current) {
        // Use window.innerHeight for iOS Safari compatibility
        const availableHeight = window.innerHeight * 0.75;
        const newHeight = `${availableHeight}px`;
        viewerHeightRef.current = newHeight;

        // Resize existing rendition instead of re-initializing
        if (renditionRef.current) {
          renditionRef.current.resize('100%', newHeight);
        }

        // Update the viewer div directly
        const viewerEl = document.getElementById('viewer');
        if (viewerEl) {
          viewerEl.style.height = newHeight;
        }
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    // iOS Safari fires this when address bar shows/hides
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  useEffect(() => {
    if (!officeOfReadings?.epubUrl) return;

    let rendition;

    const initEpub = async () => {
      try {
        const book = ePub(officeOfReadings.epubUrl);
        bookRef.current = book;

        rendition = book.renderTo('viewer', {
          width: '100%',
          height: viewerHeightRef.current,
          spread: 'none', // Better for mobile
          flow: 'scrolled-doc', // iOS-friendly scrolling mode
        });

        renditionRef.current = rendition;

        // Dynamic theme based on dark mode with improved readability
        const lightTheme = {
          body: {
            backgroundColor: '#f9f9f9',
            color: '#333',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.8',
            padding: '0 16px',
            maxWidth: '100%',
          },
          p: {
            marginBottom: '1em',
          },
          h1: { marginTop: '1.5em', marginBottom: '0.5em' },
          h2: { marginTop: '1.25em', marginBottom: '0.5em' },
          h3: { marginTop: '1em', marginBottom: '0.5em' },
        };

        const darkTheme = {
          body: {
            backgroundColor: '#1a202c',
            color: '#e2e8f0',
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.8',
            padding: '0 16px',
            maxWidth: '100%',
          },
          p: {
            marginBottom: '1em',
          },
          h1: { marginTop: '1.5em', marginBottom: '0.5em' },
          h2: { marginTop: '1.25em', marginBottom: '0.5em' },
          h3: { marginTop: '1em', marginBottom: '0.5em' },
        };

        const selectedTheme = isDarkMode ? darkTheme : lightTheme;
        rendition.themes.register('customTheme', selectedTheme);
        rendition.themes.select('customTheme');

        rendition.on('relocated', (location) => {
          setCurrentLocation(location.start.cfi);
        });

        const nav = await book.loaded.navigation;
        setToc(nav.toc || []);

        await rendition.display();
      } catch (err) {
        console.error('Error initializing EPUB:', err);
        setEpubError(err.message || 'Failed to load EPUB');
      }
    };

    initEpub();

    return () => {
      if (rendition) {
        rendition.destroy();
      }
    };
  }, [officeOfReadings, isDarkMode]);

  if (isPending) return <Loader />;
  if (error) {
    console.error('Error fetching office of readings:', error);
    return <p className="text-red-500">Failed to load office of readings.</p>;
  }
  if (epubError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-red-500">Failed to load EPUB: {epubError}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const goToChapter = (href) => {
    renditionRef.current?.display(href);
    setShowToc(false);
  };

  const handlePrev = () => renditionRef.current?.prev();
  const handleNext = () => renditionRef.current?.next();

  const goToBookmark = (cfi) => {
    renditionRef.current?.display(cfi);
  };

  const removeBookmark = (cfi) => {
    const updatedBookmarks = bookmarks.filter((b) => b.cfi !== cfi);
    setBookmarks(updatedBookmarks);
    setItem('office-readings-bookmarks', updatedBookmarks);
  };

  return (
    <div className="flex w-full flex-col">
      {/* iBreviary Iframe - Separate Section */}
      <div className="mx-4 mb-4 rounded-lg border border-borderColor bg-bgSecondary px-2 py-4 shadow-sm md:mx-0 md:px-6 md:py-6">
        <h3 className="mb-4 text-center text-lg font-semibold text-textPrimary">
          iBreviary
        </h3>
        <div className="flex justify-center">
          <iframe
            src="https://www.ibreviary.com/m2/breviario.php?lang=en"
            width="100%"
            height="600px"
            title="iBreviary"
            className="rounded-lg border border-borderColor"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
      {/* Top toolbar - sticky on mobile */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-borderColor bg-bgPrimary px-4 py-3 md:static md:border-0 md:bg-transparent md:py-4">
        <Modal>
          <Modal.Open opens="bookmarks">
            <Button design="secondary">Bookmarks</Button>
          </Modal.Open>
          <Modal.Window name="bookmarks">
            <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto p-4">
              <h2 className="text-lg font-semibold text-textPrimary">
                Bookmarks
              </h2>
              {bookmarks.length === 0 ? (
                <p className="text-textSecondary">No bookmarks added yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {bookmarks.map((bookmark) => (
                    <li
                      key={bookmark.cfi}
                      className="flex items-center justify-between gap-4 border-b border-borderColor pb-2"
                    >
                      <button
                        className="text-left text-textSecondary hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => goToBookmark(bookmark.cfi)}
                      >
                        {bookmark.name}
                      </button>
                      <button
                        className="shrink-0 text-red-600 hover:text-red-800"
                        onClick={() => removeBookmark(bookmark.cfi)}
                      >
                        <HiMiniTrash size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Modal.Window>
        </Modal>

        <button
          className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgSecondary px-3 py-2 text-sm text-textPrimary md:hidden"
          onClick={() => setShowToc((prev) => !prev)}
        >
          Contents
          {showToc ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
        </button>
      </div>

      {/* Mobile TOC - collapsible panel */}
      {showToc && (
        <aside className="mx-4 mb-4 max-h-[50vh] overflow-y-auto rounded-lg border border-borderColor bg-bgSecondary p-4 shadow-md md:hidden">
          <h2 className="mb-3 text-base font-semibold text-textPrimary">
            Table of Contents
          </h2>
          <ul className="space-y-1">
            {toc.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => goToChapter(item.href)}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-blue-600 transition-colors hover:bg-bgPrimary dark:text-blue-400"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="flex flex-1 gap-4 px-4 pb-4 md:px-0">
        {/* Desktop Sidebar TOC */}
        <aside className="sticky top-4 hidden h-fit max-h-[85vh] w-72 shrink-0 overflow-y-auto rounded-lg border border-borderColor bg-bgSecondary p-5 shadow-sm md:block">
          <h2 className="mb-4 text-lg font-semibold text-textPrimary">
            Table of Contents
          </h2>
          <ul className="space-y-1">
            {toc.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => goToChapter(item.href)}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-blue-600 transition-colors hover:bg-bgPrimary dark:text-blue-400"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* EPUB Content */}
        <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-borderColor bg-bgSecondary shadow-sm">
          {/* EPUB Viewer */}
          <div
            ref={viewerContainerRef}
            className="flex-1 overflow-hidden px-2 py-4 md:px-6 md:py-6"
          >
            <div
              id="viewer"
              style={{ height: viewerHeightRef.current }}
              className="mx-auto w-full max-w-3xl"
            />
          </div>

          {/* Bottom Navigation - sticky on mobile */}
          <div className="sticky bottom-0 flex items-center justify-between gap-2 border-t border-borderColor bg-bgSecondary px-4 py-3 md:static md:gap-4 md:px-6 md:py-4">
            <button
              onClick={handlePrev}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-borderColor bg-bgPrimary px-4 py-3 text-textPrimary transition-colors hover:bg-borderColor active:scale-95 md:flex-none md:py-2"
            >
              <HiArrowSmallLeft size={22} />
              <span className="hidden md:inline">Previous</span>
            </button>

            {/* Add Bookmark Button inside Modal */}
            <Modal>
              <Modal.Open opens="add-bookmark">
                <button className="flex items-center justify-center gap-2 rounded-lg border border-borderColor bg-bgPrimary px-4 py-3 text-textPrimary transition-colors hover:bg-borderColor active:scale-95 md:py-2">
                  <HiOutlineBookmark size={20} />
                  <span className="hidden md:inline">Add Bookmark</span>
                </button>
              </Modal.Open>
              <Modal.Window name="add-bookmark">
                <AddBookmarkForm
                  currentLocation={currentLocation ?? undefined}
                  setBookmarks={setBookmarks}
                  bookmarks={bookmarks}
                  storageKey="office-readings-bookmarks"
                />
              </Modal.Window>
            </Modal>

            <button
              onClick={handleNext}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-borderColor bg-bgPrimary px-4 py-3 text-textPrimary transition-colors hover:bg-borderColor active:scale-95 md:flex-none md:py-2"
            >
              <span className="hidden md:inline">Next</span>
              <HiArrowSmallRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficeOfReadings;
