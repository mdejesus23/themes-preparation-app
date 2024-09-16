import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function LoginForm() {
  function handleSumbit() {}

  return (
    <Form onSubmit={handleSumbit} type="primary">
      <h1 className="mb-12 font-headfont text-4xl font-bold md:text-4xl">
        Login
      </h1>
      <FormRow name="email" label="Email">
        <Input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
        />
      </FormRow>
      <FormRow name="password" label="Password">
        <Input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
        />
      </FormRow>
      <Button type="primary">Login</Button>
      <div className="mt-10 flex w-full justify-center">
        <Button to="/signup" type="tertiary">
          Signup
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
