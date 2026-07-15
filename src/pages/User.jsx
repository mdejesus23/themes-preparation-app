import UpdateUserDataForm from '../features/user/UpdateUserDataForm';
import UserSettings from '../features/user/UserSettings';

function User() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Manage your profile and security.
        </p>
      </div>
      <UserSettings />
      <UpdateUserDataForm />
    </>
  );
}

export default User;
