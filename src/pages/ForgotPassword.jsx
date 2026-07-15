import ForgotPasswordForm from '../features/authentication/ForgotPasswordForm';
import Logo from '../ui/Logo';

function ForgotPassword() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-10">
      <div className="mb-6">
        <Logo to="/login" />
      </div>
      <h1 className="text-center font-headfont text-2xl font-bold text-textPrimary">
        Forgot Password
      </h1>
      <p className="mt-1 text-center text-sm text-textSecondary">
        Enter your email and we&rsquo;ll send you a reset link.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPassword;
