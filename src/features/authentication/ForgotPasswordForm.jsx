import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function ForgotPasswordForm() {
  function handleSumbit() {}
  return (
    <Form onSubmit={handleSumbit} type="primary">
      <FormRow name="email" label="Email">
        <Input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
        />
      </FormRow>
      <Button type="submit" design="primary">
        Submit
      </Button>
    </Form>
  );
}

export default ForgotPasswordForm;
