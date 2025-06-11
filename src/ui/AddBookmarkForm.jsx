import { useState, useEffect, useRef } from 'react';
import Button from './Button';

function AddBookmarkForm({
  currentLocation,
  setBookmarks,
  bookmarks,
  onCloseModal,
}) {
  const [bookmarksName, setBookmarksName] = useState('');
  const [bookmarksError, setBookmarksError] = useState(null);
  const inputRef = useRef(null);

  const changeHandler = (e) => {
    setBookmarksName(e.target.value);
  };

  const addBookmark = () => {
    if (currentLocation) {
      if (!bookmarksName) {
        setBookmarksError('Bookmark name cannot be empty.');
        return;
      }

      const updatedBookmarks = [
        ...bookmarks,
        { name: bookmarksName, cfi: currentLocation },
      ];

      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarksName('');
      onCloseModal?.();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-gray-700 text-lg font-semibold">Add Bookmark</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Bookmark Name"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addBookmark();
          }
        }}
        onChange={changeHandler}
        value={bookmarksName}
        className="border-gray-300 rounded border p-2 text-neutral-800"
      />

      {bookmarksError && (
        <p className="mt-[-10px] text-xs text-red-500">{bookmarksError}</p>
      )}

      <Button onClick={addBookmark} design="tertiary">
        Add Bookmark
      </Button>
    </div>
  );
}

export default AddBookmarkForm;
