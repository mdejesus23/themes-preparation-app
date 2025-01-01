import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';

import { useCreateTheme } from './useCreateTheme';
import { useEditTheme } from './useEditTheme';

function AddThemeForm({ themeToEdit = {}, onCloseModal }) {
  const { isCreating, createTheme } = useCreateTheme();
  const { isEditing, editTheme } = useEditTheme();
  const isWorking = isCreating || isEditing;

  const { id: editId, title, description, passcode } = themeToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          title,
          description,
          passcode,
        }
      : {},
  });

  function onSubmit(data) {
    if (isEditSession) {
      editTheme(
        { newThemeData: data, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        },
      );
    } else {
      createTheme(data, {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="tertiary">
      <h1 className="mb-12 text-center font-headfont text-4xl font-bold md:text-4xl">
        Create Theme
      </h1>
      <FormRow name="title" label="Title" error={errors?.title?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="title"
          placeholder="Theme title "
          register={{
            ...register('title', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="description"
        label="Description"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="text"
          id="description"
          placeholder="Theme Description"
          register={{
            ...register('description', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="passcode"
        label="Theme Passcode"
        error={errors?.passcode?.message}
      >
        <Input
          disabled={isWorking}
          type="password"
          id="passcode"
          placeholder="Theme Passcode"
          autoComplete="current-passcode"
          register={{
            ...register('passcode', {
              required: 'This field is required',
              maxLength: {
                value: 10,
                message:
                  'A theme passcode must have less or equal than 10 characters.',
              },
            }),
          }}
        />
      </FormRow>
      <div>
        <Button type="submit" design="secondary">
          Create new theme
        </Button>
      </div>
    </Form>
  );
}

export default AddThemeForm;
