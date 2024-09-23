import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';

const categoryOptions = ['Historical', 'Prophetical', 'Epistle', 'Gospel'];

function AddReadingForm() {
  function handleSubmit() {}
  return (
    <>
      <h3 className="mt-4 text-center font-headfont text-xl font-semibold">
        Add reading
      </h3>
      <Form onSubmit={handleSubmit} type="tertiary">
        <FormRow name="reading" label="Bible reading">
          <Input
            required
            type="text"
            id="reading"
            name="reading"
            placeholder="Enter bible reading"
          />
        </FormRow>
        <FormRow name="category" label="Reading category">
          <SelectInput
            label="Select category reading"
            options={categoryOptions}
            id="category"
          />
        </FormRow>
        <Button type="secondary">Add reading</Button>
      </Form>
    </>
  );
}

export default AddReadingForm;
