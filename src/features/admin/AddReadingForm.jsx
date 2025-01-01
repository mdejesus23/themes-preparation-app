import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import { useForm } from 'react-hook-form';
import { useAddReading } from './useAddReading';

const categoryOptions = ['Historical', 'Prophetical', 'Epistle', 'Gospel'];

function AddReadingForm({ myThemesWithReadings, onCloseModal }) {
  const { id: themeId } = myThemesWithReadings;
  const { isAddingReading, addThemeReading } = useAddReading(themeId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    addThemeReading(
      { data, themeId },
      {
        onSuccess: (data) => {
          onCloseModal?.();
          reset();
        },
      },
    );
  }

  return (
    <>
      <h3 className="mt-4 text-center font-headfont text-xl font-semibold">
        Add reading
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)} type="tertiary">
        <FormRow
          name="reading"
          label="Bible reading"
          error={errors?.reading?.message}
        >
          <Input
            required
            type="text"
            id="reading"
            name="reading"
            placeholder="Enter bible reading"
            disabled={isAddingReading}
            register={{
              ...register('reading', {
                required: 'This field is required',
              }),
            }}
          />
        </FormRow>
        <FormRow
          name="category"
          label="Reading category"
          error={errors?.category?.message}
        >
          <SelectInput
            label="Select category reading"
            options={categoryOptions}
            id="category"
            disabled={isAddingReading}
            register={register('category', {
              required: 'This field is required',
              validate: (value) =>
                categoryOptions.includes(value) || 'Invalid selection',
            })}
          />
        </FormRow>
        <Button disabled={isAddingReading} type="submit" design="secondary">
          Add reading
        </Button>
      </Form>
    </>
  );
}

export default AddReadingForm;
