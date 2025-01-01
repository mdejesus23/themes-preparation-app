import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useResetPassword } from './useResetPassword';
import { useState } from 'react';
import { HiEye } from 'react-icons/hi2';
import { HiEyeSlash } from 'react-icons/hi2';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';

function ResetPasswordForm() {
  const { token } = useParams();
  const { isResettingPassword, resetPassword } = useResetPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function togglePassVisibility() {
    setIsShowPassword((prev) => !prev);
  }

  function toggleConfirmPassVisibility() {
    setIsShowConfirmPassword((prev) => !prev);
  }

  function onSubmit(data) {
    resetPassword(
      { data, token },
      {
        onSuccess: () => {
          navigate('/login');
          reset();
        },
      },
    );
  }

  if (isResettingPassword) return <Loader />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="primary">
      <FormRow
        error={errors.password?.message}
        name="password"
        label="Password"
      >
        <Input
          type={isShowPassword ? 'text' : 'password'}
          id="password"
          placeholder="Your password"
          autoComplete="on"
          register={{
            ...register('password', {
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
        error={errors.confirmPassword?.message} // Ensure this is correctly checking for confirmPassword
        name="confirmPassword"
        label="Confirm Password"
      >
        <Input
          type={isShowConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          placeholder="Confirm password"
          autoComplete="on"
          register={{
            ...register('confirmPassword', {
              required: 'This field is required',
              validate: (value) => {
                const password = getValues('password'); // Get the value of password field
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
      <Button type="submit" design="primary" disabled={isResettingPassword}>
        Reset Password
      </Button>
    </Form>
  );
}

export default ResetPasswordForm;
