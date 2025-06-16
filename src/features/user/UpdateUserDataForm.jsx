import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { HiEye } from 'react-icons/hi2';
import { HiEyeSlash } from 'react-icons/hi2';
import Loader from '../../ui/Loader';
import { useUpdateMyPassword } from './useUpdateMyPassword.';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function UpdateUserDataForm() {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { isUpdatingPassword, updatePassword } = useUpdateMyPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  function toggleCurrentPassVisibility() {
    setIsShowCurrentPassword((prev) => !prev);
  }

  function togglePassVisibility() {
    setIsShowPassword((prev) => !prev);
  }

  function toggleConfirmPassVisibility() {
    setIsShowConfirmPassword((prev) => !prev);
  }

  function onSubmit(data) {
    updatePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  if (isUpdatingPassword) return <Loader />;

  return (
    <div className="container mx-auto mt-10 flex w-full flex-col items-center">
      <h3 className="mb-[-2rem] text-center text-lg font-semibold">
        Update your password
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)} type="secondary">
        <FormRow
          name="currentPassword"
          label="Current Password"
          error={errors.currentPassword?.message}
        >
          <Input
            type={isShowCurrentPassword ? 'text' : 'password'}
            name="currentPassword"
            id="currentPassword"
            placeholder="Your Current Password"
            autoComplete="on"
            register={{
              ...register('currentPassword', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters.',
                },
              }),
            }}
          />
          <button
            type="button"
            onClick={toggleCurrentPassVisibility}
            className="absolute right-5 top-10 text-2xl"
          >
            {isShowCurrentPassword ? <HiEye /> : <HiEyeSlash />}
          </button>
        </FormRow>

        <FormRow
          name="newPassword"
          label="New Password"
          error={errors.newPassword?.message}
        >
          <Input
            type={isShowPassword ? 'text' : 'password'}
            name="newPassword"
            id="newPassword"
            placeholder="Your New Password"
            autoComplete="on"
            register={{
              ...register('newPassword', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters.',
                },
              }),
            }}
          />

          <button
            type="button"
            onClick={togglePassVisibility}
            className="absolute right-5 top-10 text-2xl"
          >
            {isShowPassword ? <HiEye /> : <HiEyeSlash />}
          </button>
        </FormRow>

        <FormRow
          name="confirmNewPassword"
          label="Confirm New Password"
          error={errors.confirmNewPassword?.message}
        >
          <Input
            type={isShowConfirmPassword ? 'text' : 'password'}
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            autoComplete="on"
            register={{
              ...register('confirmNewPassword', {
                required: 'This field is required',
                validate: (value) => {
                  const password = getValues('newPassword'); // Get the value of password field
                  return value === password || 'Passwords do not match'; // Validation logic
                },
              }),
            }}
          />

          <button
            type="button"
            onClick={toggleConfirmPassVisibility}
            className="absolute right-5 top-10 text-2xl"
          >
            {isShowConfirmPassword ? <HiEye /> : <HiEyeSlash />}
          </button>
        </FormRow>
        <Button type="submit" design="primary">
          Update Password
        </Button>
      </Form>
    </div>
  );
}

export default UpdateUserDataForm;
