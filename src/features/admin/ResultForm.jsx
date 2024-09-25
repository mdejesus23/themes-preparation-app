import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

function ResultForm({ formToEdit = {} }) {
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
      <FormRow name="entrance-song" label="Theme entrance-song">
        <Input
          required
          type="text"
          id="entrance-song"
          name="entrance-song"
          placeholder="Theme entrance-song"
        />
      </FormRow>
      <FormRow name="first-reading" label="First Reading">
        <Input
          required
          type="text"
          id="first-reading"
          name="first-reading"
          placeholder="First Reading"
        />
      </FormRow>
      <FormRow name="first-psalm" label="First psalm">
        <Input
          required
          type="text"
          id="first-psalm"
          name="first-psalm"
          placeholder="First psalm"
        />
      </FormRow>
      <FormRow name="second-reading" label="Second Reading">
        <Input
          required
          type="text"
          id="second-reading"
          name="second-reading"
          placeholder="Second Reading"
        />
      </FormRow>
      <FormRow name="second-psalm" label="Second psalm">
        <Input
          required
          type="text"
          id="second-psalm"
          name="second-psalm"
          placeholder="Second psalm"
        />
      </FormRow>
      <FormRow name="third-reading" label="third Reading">
        <Input
          required
          type="text"
          id="third-reading"
          name="third-reading"
          placeholder="third Reading"
        />
      </FormRow>
      <FormRow name="third-psalm" label="third psalm">
        <Input
          required
          type="text"
          id="third-psalm"
          name="third-psalm"
          placeholder="third psalm"
        />
      </FormRow>
      <FormRow name="gospel" label="Gospel Reading">
        <Input
          required
          type="text"
          id="gospel"
          name="gospel"
          placeholder="Gospel Reading"
        />
      </FormRow>
      <div>
        <Button type="primary">Create Preparation Result</Button>
      </div>
    </Form>
  );
}

export default ResultForm;
