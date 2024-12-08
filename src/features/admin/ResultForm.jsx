import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';

import { useCreateResult } from './useCreateResult';
import { useEditResult } from './useEditResult';

function ResultForm({
  onCloseModal,
  themeWithReadingsVotes,
  resultToEdit = {},
}) {
  const { isCreating, createPrepResult } = useCreateResult();
  const { isEditing, editResult } = useEditResult();
  const isWorking = isCreating || isEditing;

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

  let title,
    readings,
    highestHistorical,
    highestProphetical,
    highestEpistle,
    highestGospel;

  if (isEditSession) {
    console.log('editing mode', isEditSession);
    console.log(resultToEdit);
  } else {
    console.log('creating mode', isEditSession);

    const { title: themeTitle, readings: themeReadings } =
      themeWithReadingsVotes;
    title = themeTitle;
    readings = themeReadings;

    highestHistorical = readings
      .filter((reading) => reading.category === 'Historical')
      .reduce((highest, reading) => {
        return reading.voteCount > highest.voteCount ? reading : highest;
      }, themeWithReadingsVotes.readings[0]);

    highestProphetical = readings
      .filter((reading) => reading.category === 'Prophetical')
      .reduce((highest, reading) => {
        return reading.voteCount > highest.voteCount ? reading : highest;
      }, themeWithReadingsVotes.readings[0]);

    highestEpistle = readings
      .filter((reading) => reading.category === 'Epistle')
      .reduce((highest, reading) => {
        return reading.voteCount > highest.voteCount ? reading : highest;
      }, themeWithReadingsVotes.readings[0]);

    highestGospel = readings
      .filter((reading) => reading.category === 'Gospel')
      .reduce((highest, reading) => {
        return reading.voteCount > highest.voteCount ? reading : highest;
      }, themeWithReadingsVotes.readings[0]);
  }

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
          firstReading: highestHistorical.reading,
          secondReading: highestProphetical.reading,
          thirdReading: highestEpistle.reading,
          gospel: highestGospel.reading,
        },
  });

  function onSubmit(data) {
    if (isEditSession) {
      editResult(
        { newResultData: data, id: editId },
        {
          onSuccess: (data) => {
            console.log('edited result data', data);
            onCloseModal?.();
            reset();
          },
        },
      );
    } else {
      createPrepResult(data, {
        onSuccess: (data) => {
          console.log('created data', data);
          onCloseModal?.();
          reset();
        },
      });
    }
  }

  // function onError(errors) {
  //   // console.log(errors);
  // }

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
