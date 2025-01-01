import React from 'react';
import Loader from '../../ui/Loader';
import { useUser } from '../authentication/useUser';
import { useResetVotes } from './useUserResetVotes';
import Modal from '../../ui/Modal';
import ConfirmResetVotes from '../../ui/ConfirmUserResetVotes';

function LoggedInUser() {
  const { isLoading, user } = useUser();
  const { isReseting, userResetVotes } = useResetVotes(); // Destructure the reset function

  if (isLoading || isReseting) {
    return <Loader />;
  }

  const votedReadings = user.data.votedReadings;

  return (
    <div className="mx-auto mt-12 max-w-md">
      <div className="text-center">
        {user.data.photo ? (
          <img
            src={user.data.photo}
            alt={`${user.data.username}'s avatar`}
            className="border-gray-300 mx-auto mb-4 h-24 w-24 rounded-full border-4 shadow-sm"
          />
        ) : (
          <div className="bg-gray-200 border-gray-300 text-gray-500 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-sm">
            No Photo
          </div>
        )}
        <h2 className="text-gray-800 text-2xl font-semibold">
          Welcome, {user.data.username}!
        </h2>
        <p className="text-gray-600 text-sm">{user.data.email}</p>
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
                className="hover:bg-red-600 bg-red-800 rounded px-4 py-2 text-white shadow-md transition"
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

export default LoggedInUser;
