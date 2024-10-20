import LoginForm from '../features/authentication/LoginForm';
import Main from '../ui/Main';

function Login() {
  return (
    <Main type="secondary">
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <img
          className="mx-auto max-w-56 object-cover"
          src="/bibleLogo.png"
          alt="banner"
        />

        <LoginForm />
      </div>
    </Main>
  );
}

export default Login;
