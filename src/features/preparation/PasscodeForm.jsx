import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function PasscodeForm() {
  function handleSubmit() {}
  return (
    <Form onSubmit={handleSubmit} type="tertiary">
      <FormRow name="passcode" label="Passcode">
        <Input
          required
          type="password"
          id="passcode"
          name="passcode"
          placeholder="Enter theme passcode"
        />
        <Button type="secondary">Access</Button>
      </FormRow>
    </Form>
  );
}

export default PasscodeForm;
