import { useState } from 'react';
import Loader from '../../ui/Loader';
import { useUser } from '../authentication/useUser';
import { useResetVotes } from './useUserResetVotes';
import Modal from '../../ui/Modal';
import ConfirmResetVotes from '../../ui/ConfirmUserResetVotes';
import useUserStore from '../../store/useUserStore';
import { useUploadProfileImage } from './useUploadProfileImage';
import Button from '../../ui/Button';

function UserSettings() {
  const { isUploading, uploadImage } = useUploadProfileImage();

  const { isLoading, user } = useUser();
  const { isReseting, userResetVotes } = useResetVotes();
  const setUser = useUserStore((state) => state.setUser);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Show loader while loading or resetting
  if (isLoading || isReseting) return <Loader />;

  // Update user state in the store
  const userState = {
    email: user.email,
    username: user.username,
    votedReadingIds: user.votedReadingIds,
    photo: user.photo,
  };
  setUser(userState);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setSuccessMessage('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);

      const res = await uploadImage(formData); // ✅ Wait for result
      const updatedUser = res.data.user; // Adjust this based on your backend response shape

      // Update global state
      setUser({
        email: updatedUser.email,
        username: updatedUser.username,
        votedReadingIds: updatedUser.votedReadingIds,
        photo: updatedUser.photo,
      });

      setSuccessMessage('Profile image updated successfully!');
      setFile(null);
      setPreviewUrl('');
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const votedReadings = user.votedReadings || [];

  return (
    <div className="container mx-auto mt-10 flex w-full flex-col items-center">
      {/* Header Section */}
      <div className="mx-auto my-14 w-full rounded-lg border border-borderColor bg-bgSecondary p-6 shadow-lg sm:w-4/5 md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <h2 className="mb-6 text-center text-2xl font-semibold text-textPrimary">
          Welcome, {user.username}!
        </h2>

        {/* Profile Image */}
        {user.photo && (
          <img
            src={user.photo}
            alt="Profile"
            className="mx-auto mb-4 h-24 w-24 rounded-full object-cover shadow"
          />
        )}

        {/* Email Info */}
        <div className="mb-4 flex justify-center gap-4">
          <p className="text-sm font-medium text-textSecondary">Email:</p>
          <p className="text-sm text-textSecondary">{user.email}</p>
        </div>

        {/* Image Upload Form */}
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-textSecondary"
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto h-24 w-24 rounded-full object-cover shadow"
            />
          )}

          <Button
            type="submit"
            design="secondary"
            disabled={uploading || !file}
          >
            {uploading || isUploading
              ? 'Uploading...'
              : 'Upload New Profile Image'}
          </Button>

          {successMessage && (
            <p className="text-green-600 mt-2 text-sm font-medium">
              {successMessage}
            </p>
          )}
        </form>
      </div>

      {/* Voted Readings Section */}
      <div className="mx-auto my-14 w-full rounded-lg border border-borderColor bg-bgSecondary p-6 shadow-lg sm:w-4/5 md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <h3 className="text-lg font-medium text-textPrimary">
          Your Voted Readings
        </h3>

        {votedReadings.length > 0 ? (
          <>
            <div className="mt-4">
              <Modal>
                <Modal.Open opens="reset-votes">
                  <button className="rounded bg-red-800 px-4 py-2 text-white shadow-md transition hover:bg-red-600">
                    Reset My Reading Votes
                  </button>
                </Modal.Open>

                <Modal.Window name="reset-votes">
                  <ConfirmResetVotes
                    disabled={isReseting}
                    onConfirm={() => userResetVotes()}
                  />
                </Modal.Window>
              </Modal>
            </div>

            <ul className="mt-4 max-h-96 space-y-3 overflow-auto">
              {votedReadings.map((reading) => (
                <li
                  key={reading.id}
                  className="rounded-md bg-bgPrimary p-4 text-textPrimary shadow-sm transition hover:bg-borderColor"
                >
                  {reading.reading}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-4 text-textSecondary">
            You have not voted on any readings yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserSettings;
