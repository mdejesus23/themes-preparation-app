import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Separator from '../../ui/Separator';
import Loader from '../../ui/Loader';

import { HiEye } from 'react-icons/hi2';
import { HiEyeSlash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginUser } from './useLoginUser';

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { isLogging, loginUser } = useLoginUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    const email = data.email;
    const password = data.password;
    console.log(`email:${email} password:${password}`);

    loginUser(data, {
      onSuccess: () => {
        navigate('/');
        reset();
      },
    });
  }

  function toggleShowPassword() {
    setIsShowPassword((prev) => !prev);
  }

  if (isLogging) return <Loader />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="primary">
      <h1 className="mb-12 font-headfont text-4xl font-bold md:text-4xl">
        Login
      </h1>
      <FormRow name="email" label="Email" error={errors?.passcode?.message}>
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
        name="password"
        label="Password"
        error={errors?.passcode?.message}
      >
        <Input
          autoComplete="on"
          type={isShowPassword ? 'text' : 'password'}
          id="password"
          placeholder="Your password"
          register={{
            ...register('password', {
              required: 'This field is required',
            }),
          }}
        />
        <button
          onClick={toggleShowPassword}
          className="absolute right-5 top-10 text-2xl"
        >
          {isShowPassword ? <HiEye /> : <HiEyeSlash />}
        </button>
      </FormRow>
      <div className="mb-2">
        <Button to="/forgot-password" type="link">
          Forgot password?
        </Button>
      </div>
      <Button type="submit" style="primary">
        Login
      </Button>

      <Separator>or</Separator>

      <div className="mt-5 flex w-full justify-center">
        <Button to="/signup" style="tertiary">
          Signup
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
