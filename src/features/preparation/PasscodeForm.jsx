import { useNavigate } from 'react-router-dom';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useAccessTheme } from './useAccessTheme';
import useThemeStore from '../../store/themeStore';
import Loader from '../../ui/Loader';
// import { useEffect } from 'react';

function PasscodeForm({ theme, onCloseModal }) {
  const { id: themeId, title, slug } = theme;
  const navigate = useNavigate();
  // const themeWithReadings = useThemeStore((state) => state.themeWithReadings);
  const setThemeData = useThemeStore((state) => state.setThemeData);
  const { accessTheme, isAccessing } = useAccessTheme(slug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const passcode = data.passcode;
    accessTheme(
      { themeId, passcode },
      {
        // data in onSuccess is a response data
        onSuccess: (data) => {
          setThemeData(data.themeWithReadings);
          reset();
          onCloseModal?.();
          navigate(`/themes/${data.themeWithReadings.slug}`);
        },
      },
    );
  }

  // useEffect(() => {
  //   if (themeWithReadings) {
  //     // if the theme already stored in the global state ignore sending request.
  //     if (themeId === themeWithReadings.id) {
  //       navigate(`/themes/${themeWithReadings.slug}`);
  //       return;
  //     }
  //   }
  // }, [themeWithReadings, themeId, navigate]);

  function onError(errors) {
    // console.log(errors);
  }

  if (isAccessing) return <Loader />;

  return (
    <>
      <h3 className="mt-4 text-center font-headfont text-xl font-semibold">
        {title}
      </h3>
      <Form onSubmit={handleSubmit(onSubmit, onError)} type="tertiary">
        <FormRow
          name="passcode"
          label="Passcode"
          error={errors?.passcode?.message}
        >
          <Input
            type="password"
            id="passcode"
            placeholder="Theme passcode"
            autoComplete="new-password"
            register={{
              ...register('passcode', {
                required: 'This field is required',
                maxLength: {
                  value: 10,
                  message: 'This input exceed maxLength.',
                },
              }),
            }}
          />
        </FormRow>
        <Button type="submit" design="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default PasscodeForm;
