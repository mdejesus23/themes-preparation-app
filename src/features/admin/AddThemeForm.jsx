import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';

function AddThemeForm({ themeToEdit = {} }) {
  const { id: editId, editValues } = themeToEdit;

  function handleSubmit() {}
  return (
    <Form onSubmit={handleSubmit} type="tertiary">
      {/* <h1 className="mb-12 font-headfont text-4xl font-bold md:text-4xl">
        Add Theme
      </h1> */}
      <FormRow name="title" label="Title">
        <Input
          required
          type="text"
          id="title"
          name="title"
          placeholder="Theme title "
        />
      </FormRow>
      <FormRow name="description" label="Description">
        <Textarea
          required
          type="text"
          id="description"
          name="description"
          placeholder="Theme Description"
        />
      </FormRow>
      <FormRow name="passcode" label="Theme Passcode">
        <Input
          required
          type="password"
          id="passcode"
          name="passcode"
          placeholder="Theme Passcode"
        />
      </FormRow>
      <div>
        <Button type="primary">Create new theme</Button>
      </div>
    </Form>
  );
}

export default AddThemeForm;
