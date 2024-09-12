import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';

function Settings() {
  return (
    <>
      <h1 className="font-headfont text-3xl font-bold md:text-4xl">
        Account Settings
      </h1>

      <UpdateUserDataForm />
    </>
  );
}

export default Settings;
