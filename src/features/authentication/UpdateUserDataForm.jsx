import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

function UpdateUserDataForm() {
  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit} type="secondary">
      <FormRow name="currentPassword" label="Current Password">
        <Input
          reqired
          name="currentPassword"
          type="password"
          id="currentPassword"
          placeholder="Your Current Password"
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
      <Button type="primary">Update Password</Button>
    </Form>
  );
}

export default UpdateUserDataForm;
