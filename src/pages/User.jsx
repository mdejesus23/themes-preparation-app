import UpdateUserDataForm from '../features/user/UpdateUserDataForm';
import LoggedInUser from '../features/user/LoggedInUser';

function User() {
  return (
    <>
      <h1 className="font-headfont text-3xl font-bold md:text-4xl">
        Account Settings
      </h1>
      <LoggedInUser />
      <UpdateUserDataForm />
    </>
  );
}

export default User;
