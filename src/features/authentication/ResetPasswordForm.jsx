import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function ResetPasswordForm() {
  function handleSubmit() {}
  return (
    <Form onSubmit={handleSubmit} type="secondary">
      <FormRow name="email" label="Email">
        <Input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
        />
      </FormRow>

      <FormRow name="newPassword" label="New Password">
        <Input
          reqired
          name="newPassword"
          type="password"
          id="newPassword"
          placeholder="Your New Password"
        />
      </FormRow>

      <FormRow name="confirmNewPassword" label="Confirm New Password">
        <Input
          reqired
          name="confirmNewPassword"
          type="password"
          id="confirmNewPassword"
          placeholder="Confirm New Password"
        />
      </FormRow>
      <Button type="primary">Reset Password</Button>
    </Form>
  );
}

export default ResetPasswordForm;
