import { useState } from 'react';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Separator from '../../ui/Separator';
import { useCreateUser } from './useCreateUser';
import { useForm } from 'react-hook-form';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
// import useUserStore from '../../store/useUserStore';

import { HiEye } from 'react-icons/hi2';
import { HiEyeSlash } from 'react-icons/hi2';

function SignupForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { isCreating, createUser } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();
  // const setUser = useUserStore((state) => state.setUser);

  function togglePassVisibility() {
    setIsShowPassword((prev) => !prev);
  }

  function toggleConfirmPassVisibility() {
    setIsShowConfirmPassword((prev) => !prev);
  }

  function onSubmit(data) {
    // Call createUser with data here if needed
    createUser(data, {
      onSuccess: (data) => {
        // const user = {
        //   emai: data.data.user.email,
        //   username: data.data.user.username,
        //   votedReadingIds: data.data.user.votedReadingIds,
        // };
        // setUser(user);
        navigate('/login');
        reset();
      },
    });
  }

  if (isCreating) return <Loader />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="primary">
      <h1 className="mb-12 font-headfont text-4xl font-bold md:text-4xl">
        Signup
      </h1>
      <FormRow error={errors.email?.message} name="email" label="Email">
        <Input
          type="email"
          id="email"
          placeholder="Your Email"
          register={{
            ...register('email', {
              required: 'This field is required',
            }),
          }}
        />
      </FormRow>
      <FormRow
        error={errors.username?.message}
        name="username"
        label="Username"
      >
        <Input
          type="text"
          id="username"
          placeholder="Your Username"
          register={{
            ...register('username', {
              required: 'This field is required',
              maxLength: {
                value: 10,
                message: 'Maximum length is 10 characters.',
              },
            }),
          }}
        />
      </FormRow>
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

      <Button type="submit" design="primary" disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Signup'}
      </Button>

      <Separator>or</Separator>

      <div className="mt-5 flex w-full justify-center">
        <Button to="/login" design="tertiary">
          Login
        </Button>
      </div>
    </Form>
  );
}

export default SignupForm;
