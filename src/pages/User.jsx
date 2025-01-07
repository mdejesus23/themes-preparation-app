import UpdateUserDataForm from '../features/user/UpdateUserDataForm';
import UserSettings from '../features/user/UserSettings';

function User() {
  return (
    <>
      <h1 className="font-headfont text-3xl font-bold md:text-4xl">
        Account Settings
      </h1>
      <UserSettings />
      <UpdateUserDataForm />
    </>
  );
}

export default User;
