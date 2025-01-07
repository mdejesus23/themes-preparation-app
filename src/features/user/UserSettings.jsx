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

  if (isLoading || isReseting) {
    return <Loader />;
  }

  const userState = {
    emai: user.email,
    username: user.username,
    votedReadingIds: user.votedReadingIds,
  };
  setUser(userState);

  console.log('melnard', user);
  const votedReadings = user.votedReadings || [];

  return (
    <div className="mx-auto mt-12 max-w-md">
      <div className="text-center">
        {user.photo ? (
          <img
            src={user.photo}
            alt={`${user.username}'s avatar`}
            className="border-gray-300 mx-auto mb-4 h-24 w-24 rounded-full border-4 shadow-sm"
          />
        ) : (
          <div className="bg-gray-200 border-gray-300 text-gray-500 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-sm">
            No Photo
          </div>
        )}
        <h2 className="text-gray-800 text-2xl font-semibold">
          Welcome, {user.username}!
        </h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-gray-800 text-lg font-medium">
          Your Voted Readings
        </h3>
        {/* Add a button to reset votes */}
        {votedReadings.length > 0 && (
          <Modal>
            <Modal.Open opens="reset-votes">
              <button
                // Call the reset function on button click
                className="rounded bg-red-800 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
              >
                Reset my reading votes
              </button>
            </Modal.Open>

            <Modal.Window name="reset-votes">
              <ConfirmResetVotes
                disabled={isReseting}
                onConfirm={() => userResetVotes()}
              />
            </Modal.Window>
          </Modal>
        )}
        {votedReadings.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {votedReadings.map((reading) => (
              <li
                key={reading.id}
                className="bg-gray-100 hover:bg-gray-200 rounded-md p-4 shadow-sm transition"
              >
                {reading.reading}
              </li>
            ))}
          </ul>
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
