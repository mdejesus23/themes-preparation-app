import { useState, useRef, useEffect } from 'react';
import { useCatechism } from './useCatechism';
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

function Catechism() {
  const { bookId } = useParams();
  const { isPending, data, error } = useCatechism(bookId);
  const { isDarkMode } = useTheme();

  const bookRef = useRef(null);
  const renditionRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [showToc, setShowToc] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => getItem('catechism-bookmarks', []));
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

        // Dynamic theme based on dark mode
        const lightTheme = {
          body: {
            backgroundColor: '#f9f9f9',
            color: '#333',
            fontSize: '16px',
            fontFamily: 'Georgia, serif',
            width: '100%',
          },
        };

        const darkTheme = {
          body: {
            backgroundColor: '#1a202c',
            color: '#e2e8f0',
            fontSize: '16px',
            fontFamily: 'Georgia, serif',
            width: '100%',
          },
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
    setItem('catechism-bookmarks', updatedBookmarks);
  };

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-between">
        <Modal>
          <Modal.Open opens="bookmarks">
            <Button design="secondary">Bookmarks</Button>
          </Modal.Open>
          <Modal.Window name="bookmarks">
            <div className="flex flex-col gap-4 p-4">
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
                      className="flex items-center justify-between border-b border-borderColor pb-2"
                    >
                      <button
                        className="text-textSecondary hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => goToBookmark(bookmark.cfi)}
                      >
                        {bookmark.name}
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeBookmark(bookmark.cfi)}
                      >
                        <HiMiniTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Modal.Window>
        </Modal>

        <button
          className="block text-textPrimary md:hidden"
          onClick={() => setShowToc((prev) => !prev)}
        >
          {showToc ? <HiChevronUp size={28} /> : <HiChevronDown size={28} />}
        </button>
      </div>

      {/* mobile toc  */}
      {showToc && (
        <aside className="max-h-screen w-full overflow-y-auto border-r border-borderColor bg-bgSecondary p-4">
          <h2 className="mb-4 text-lg font-semibold text-textPrimary">
            Table of Contents
          </h2>
          <ul className="space-y-2">
            {toc.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => goToChapter(item.href)}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="container mx-auto grid min-h-screen w-full grid-cols-1 gap-4 md:grid-cols-[300px_1fr]">
        {/* Sidebar TOC */}
        <aside className="hidden h-screen overflow-y-auto border-r border-borderColor bg-bgSecondary p-6 md:block">
          <h2 className="mb-4 text-xl font-semibold text-textPrimary">
            Table of Contents
          </h2>
          <ul className="space-y-2">
            {toc.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => goToChapter(item.href)}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex min-w-[21rem] flex-col items-center rounded-lg border border-borderColor bg-bgSecondary px-2 py-6 shadow-lg">
          {/* EPUB Viewer */}
          <div ref={viewerContainerRef} className="w-full flex-1 overflow-hidden">
            <div
              id="viewer"
              style={{ height: viewerHeightRef.current }}
              className="max-w-[600px] overflow-x-auto"
            />
          </div>

          {/* Bottom Navigation */}
          <div className="mt-6 flex w-full max-w-5xl items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition hover:bg-bgSecondary md:w-auto"
            >
              <HiArrowSmallLeft size={20} />
            </button>

            {/* Add Bookmark Button inside Modal */}
            <Modal>
              <Modal.Open opens="add-bookmark">
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition hover:bg-bgSecondary md:w-auto">
                  Add
                  <HiOutlineBookmark size={20} />
                </button>
              </Modal.Open>
              <Modal.Window name="add-bookmark">
                <AddBookmarkForm
                  currentLocation={currentLocation ?? undefined}
                  setBookmarks={setBookmarks}
                  bookmarks={bookmarks}
                  storageKey="catechism-bookmarks"
                />
              </Modal.Window>
            </Modal>

            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-borderColor bg-bgPrimary px-4 py-2 text-sm text-textPrimary transition hover:bg-bgSecondary md:w-auto"
            >
              <HiArrowSmallRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catechism;
