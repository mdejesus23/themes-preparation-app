import Main from '../ui/Main';
import ForgotPasswordForm from '../features/authentication/ForgotPasswordForm';

function ForgotPassword() {
  return (
    <Main type="secondary">
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <img
          className="mx-auto max-w-72 object-cover"
          src="/bibleLogo.png"
          alt="banner"
        />

        <h1 className="mt-20 text-center font-headfont text-3xl font-bold">
          Forgot Password
        </h1>
        <ForgotPasswordForm />
      </div>
    </Main>
  );
}

export default ForgotPassword;
