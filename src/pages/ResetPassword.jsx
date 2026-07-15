import ResetPasswordForm from '../features/authentication/ResetPasswordForm';
import Logo from '../ui/Logo';

function ResetPassword() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-10">
      <div className="mb-6">
        <Logo to="/login" />
      </div>
      <h1 className="text-center font-headfont text-2xl font-bold text-textPrimary">
        Reset Password
      </h1>
      <p className="mt-1 text-center text-sm text-textSecondary">
        Choose a new password for your account.
      </p>
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPassword;
