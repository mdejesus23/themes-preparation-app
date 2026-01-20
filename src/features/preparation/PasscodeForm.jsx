import { useNavigate } from 'react-router-dom';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useAccessTheme } from './useAccessTheme';
import useThemeStore from '../../store/themeStore';
import { HiEye } from 'react-icons/hi2';
import { HiEyeSlash } from 'react-icons/hi2';
import { useState, useEffect } from 'react';

function PasscodeForm({ theme, onCloseModal }) {
  const [isShowPasscode, setIsShowPasscode] = useState(false);
  const { id: themeId, title } = theme;
  const navigate = useNavigate();
  const themeData = useThemeStore((state) => state.themeWithReadings);
  const setThemeData = useThemeStore((state) => state.setThemeData);
  const { accessTheme, isAccessing } = useAccessTheme(themeId);

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
          navigate(`/themes/${data.themeId}`);
        },
      },
    );
  }

  function toggleShowPasscode(e) {
    e.preventDefault();
    setIsShowPasscode((prev) => !prev);
  }

  useEffect(() => {
    if (themeId === themeData.id) {
      navigate(`/themes/${themeId}`);
    }
    // console.log('themeData', themeData);
  }, [themeId, themeData, navigate]);

  return (
    <>
      <h3 className="mt-4 text-center font-headfont text-xl font-semibold text-textPrimary">
        {title}
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)} type="tertiary">
        <FormRow
          name="passcode"
          label="Passcode"
          error={errors?.passcode?.message}
        >
          <Input
            type={isShowPasscode ? 'text' : 'password'}
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
          <button
            type="button"
            onClick={toggleShowPasscode}
            className="absolute right-5 top-10 text-2xl text-textPrimary"
          >
            {isShowPasscode ? <HiEye /> : <HiEyeSlash />}
          </button>
        </FormRow>
        <Button type="submit" design="primary">
          {isAccessing ? 'Submitting..' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

export default PasscodeForm;
