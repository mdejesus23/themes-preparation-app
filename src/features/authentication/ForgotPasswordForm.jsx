import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import Loader from '../../ui/Loader';
import { useForgotPassword } from './useForgotPassword';

function ForgotPasswordForm() {
  const { isResettingPassword, forgotPassword } = useForgotPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    forgotPassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  if (isResettingPassword) return <Loader />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="primary">
      <FormRow name="email" label="Email" error={errors?.email?.message}>
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
      <Button type="submit" design="primary">
        Submit
      </Button>
    </Form>
  );
}

export default ForgotPasswordForm;
