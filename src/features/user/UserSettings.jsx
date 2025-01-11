import React from 'react';
import Loader from '../../ui/Loader';
import { useUser } from '../authentication/useUser';
import { useResetVotes } from './useUserResetVotes';
import Modal from '../../ui/Modal';
import ConfirmResetVotes from '../../ui/ConfirmUserResetVotes';
import useUserStore from '../../store/useUserStore';

function UserSettings() {
  const { isLoading, user } = useUser();
  const { isReseting, userResetVotes } = useResetVotes();
  const setUser = useUserStore((state) => state.setUser);

  // Show loader while loading or resetting
  if (isLoading || isReseting) {
    return <Loader />;
  }

  // Update user state in the store
  const userState = {
    email: user.email,
    username: user.username,
    votedReadingIds: user.votedReadingIds,
  };
  setUser(userState);

  const votedReadings = user.votedReadings || [];

  return (
    <div className="mx-auto mt-12 w-full max-w-lg space-y-8">
      {/* Header Section */}
      <div className="rounded-md bg-white p-6 text-center shadow-sm">
        <h2 className="text-gray-800 mb-10 text-2xl font-semibold">
          Welcome, {user.username}!
        </h2>
        <div className="flex justify-center gap-4">
          <p className="text-gray-600 text-sm font-medium">Email:</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Voted Readings Section */}
      <div className="mt-8 space-y-4 rounded-md bg-white p-6 shadow-sm">
        <h3 className="text-gray-800 text-lg font-medium">
          Your Voted Readings
        </h3>

        {votedReadings.length > 0 ? (
          <>
            {/* Reset Votes Button */}
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

            {/* Voted Readings List */}
            <ul className="mt-4 max-h-96 space-y-3 overflow-auto">
              {votedReadings.map((reading) => (
                <li
                  key={reading.id}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md p-4 shadow-sm transition"
                >
                  {reading.reading}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500 mt-4">
            You have not voted on any readings yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserSettings;
