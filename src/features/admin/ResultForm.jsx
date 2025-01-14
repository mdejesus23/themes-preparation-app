import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateResult } from './useCreateResult';
import { useEditResult } from './useEditResult';

function ResultForm({ onCloseModal, title, finalReadings, resultToEdit = {} }) {
  const { isCreating, createPrepResult } = useCreateResult();
  const { isEditing, editResult } = useEditResult();
  const isWorking = isCreating || isEditing;
  const navigate = useNavigate();

  const {
    _id: editId,
    title: resultTitle,
    entranceSong,
    firstReading,
    firstPsalm,
    secondReading,
    secondPsalm,
    thirdReading,
    thirdPsalm,
    gospel,
    finalSong,
  } = resultToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          title: resultTitle,
          entranceSong: entranceSong,
          firstReading: firstReading,
          firstPsalm: firstPsalm,
          secondReading: secondReading,
          secondPsalm: secondPsalm,
          thirdReading: thirdReading,
          thirdPsalm: thirdPsalm,
          gospel: gospel,
          finalSong: finalSong,
        }
      : {
          title: title,
          firstReading: finalReadings.firstReading,
          secondReading: finalReadings.secondReading,
          thirdReading: finalReadings.thirdReading,
          gospel: finalReadings.gospel,
        },
  });

  function onSubmit(data) {
    if (isEditSession) {
      editResult(
        { newResultData: data, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        },
      );
    } else {
      createPrepResult(data, {
        onSuccess: () => {
          onCloseModal?.();
          reset();
          navigate('/admin-results');
        },
      });
    }
  }

  return (
    // <p>test</p>
    <Form onSubmit={handleSubmit(onSubmit)} type="tertiary">
      <FormRow name="title" label="Title" error={errors?.title?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="title"
          name="title"
          placeholder="Theme title "
          register={{
            ...register('title', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="entranceSong"
        label="Theme entranceSong"
        error={errors?.entranceSong?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="entranceSong"
          name="entranceSong"
          placeholder="Theme entranceSong"
          register={{
            ...register('entranceSong', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="firstReading"
        label="First Reading"
        error={errors?.firstReading?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="firstReading"
          name="firstReading"
          placeholder="First Reading"
          register={{
            ...register('firstReading', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="firstPsalm"
        label="First psalm"
        error={errors?.firstPsalm?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="firstPsalm"
          name="firstPsalm"
          placeholder="First psalm"
          register={{
            ...register('firstPsalm', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="secondReading"
        label="Second Reading"
        error={errors?.secondReading?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="secondReading"
          name="secondReading"
          placeholder="Second Reading"
          register={{
            ...register('secondReading', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="secondPsalm"
        label="Second psalm"
        error={errors?.secondPsalm?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="secondPsalm"
          name="secondPsalm"
          placeholder="Second psalm"
          register={{
            ...register('secondPsalm', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="thirdReading"
        label="third Reading"
        error={errors?.thirdReading?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="thirdReading"
          name="thirdReading"
          placeholder="third Reading"
          register={{
            ...register('thirdReading', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="thirdPsalm"
        label="third psalm"
        error={errors?.thirdPsalm?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="thirdPsalm"
          name="thirdPsalm"
          placeholder="third psalm"
          register={{
            ...register('thirdPsalm', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="gospel"
        label="Gospel Reading"
        error={errors?.gospel?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="gospel"
          name="gospel"
          placeholder="Gospel Reading"
          register={{
            ...register('gospel', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        name="finalSong"
        label="Final Song"
        error={errors?.finalSong?.message}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="finalSong"
          name="finalSong"
          placeholder="Gospel Reading"
          register={{
            ...register('finalSong', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <div>
        <Button type="submit" design="primary">
          Create Preparation Result
        </Button>
      </div>
    </Form>
  );
}

export default ResultForm;
