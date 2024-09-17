import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function PasscodeForm({ title }) {
  function handleSubmit() {}
  return (
    <>
      <h3 className="mt-4 text-center font-headfont text-xl font-semibold">
        {title}
      </h3>
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
    </>
  );
}

export default PasscodeForm;
