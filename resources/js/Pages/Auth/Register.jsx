import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
  TextInput,
  Divider
} from '@mantine/core';
import { useForm as useFormValidation } from '@mantine/form';
import { usePage } from '@inertiajs/inertia-react'; // Mengimpor Inertia dan usePage dari @inertiajs/inertia-react
import { notifications } from '@mantine/notifications';
import { FcGoogle } from 'react-icons/fc';
import { router } from '@inertiajs/react';

export default function Register() {
  const { errors } = usePage().props;

  const form = useFormValidation({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
      confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null
    }
  });

  const handleSubmit = async (values) => {
    try {
      // Menggunakan Inertia.post untuk mengirimkan data form ke backend
      await router.post('/register', values);

      notifications.show({
        title: 'Register berhasil! 🎉',
        color: 'green'
      });

    } catch (error) {
      // Handle error jika terjadi kesalahan
      console.error('Error submitting form:', error);
    }
  };

  const handleGoogleRedirect = async () => {
    try {
      // Menggunakan router.get untuk melakukan pengalihan ke Google OAuth
      await router.get('/google/redirect');

      notifications.show({
        title: 'Register berhasil! 🎉',
        color: 'green'
      });

    } catch (error) {
      // Handle error jika terjadi kesalahan
      console.error('Error with Google redirect:', error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Halaman Register</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {errors.error && (
          <div className="text-red-500 text-sm">{errors.error}</div>
        )}
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
          <TextInput
            label="Name"
            placeholder="john"
            {...form.getInputProps('name')}
            required
            mb='md'
          />
          <TextInput
            label="Email"
            placeholder="john123@example.com"
            {...form.getInputProps('email')}
            required
            mb='md'
          />
          <PasswordInput
            label="Password"
            placeholder="password123"
            {...form.getInputProps('password')}
            required
            mb='md'
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
            required
            mb='md'
          />
          <Group justify="space-between" mt="lg">
            <a
              className="lowercase text-blue-500 cursor-pointer text-md"
              href="/login"
            >
              sudah punya akun?
            </a>
            <a href="/reset" className="text-blue-500">
              Forgot password?
            </a>
          </Group>

          <Divider label="Or continue with google" labelPosition="center" my="lg" />
          <Button onClick={handleGoogleRedirect} variant="default" radius="xl" fullWidth leftSection={<FcGoogle className="h-5" />}>
            Google
          </Button>

          <Button
            type="submit"
            fullWidth
            mt="xl"
            disabled={form.isSubmitting}
            loading={form.isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
