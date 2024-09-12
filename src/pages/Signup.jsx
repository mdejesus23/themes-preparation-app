import Main from '../ui/Main';
import SignupForm from '../features/authentication/SignupForm';

function Signup() {
  return (
    <Main type="secondary">
      <div className="mx-auto flex flex-col items-center justify-center">
        <img
          className="mx-auto max-w-72 object-cover"
          src="/bibleLogo.png"
          alt="banner"
        />

        <SignupForm />
      </div>
    </Main>
  );
}

export default Signup;
