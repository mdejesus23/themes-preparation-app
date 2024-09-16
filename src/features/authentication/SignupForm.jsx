import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function SignupForm() {
  function handleSubmit() {}
  return (
    <Form onSubmit={handleSubmit} type="primary">
      <h1 className="mb-12 font-headfont text-4xl font-bold md:text-4xl">
        Signup
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
      <FormRow name="username" label="Username">
        <Input
          required
          type="username"
          id="username"
          name="username"
          placeholder="Your Username"
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
      <FormRow name="confirmpassword" label="Confirm Password">
        <Input
          required
          type="confirmpassword"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="Confirm password"
        />
      </FormRow>
      <Button type="primary">Signup</Button>
    </Form>
  );
}

export default SignupForm;
