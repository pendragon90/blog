import { Container, Text, Button, Group } from '@mantine/core';
import classes from './Hero.module.css';
import { FcGoogle } from 'react-icons/fc';

export default function Hero() {
  
  return (
    <div className={classes.wrapper}>
      <Container>
        <h1 className='text-3xl font-extrabold'>
          Selamat{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
           Datang
          </Text>
        </h1>

        <Text>
        Bersama Kita Belajar dan Berkembang
        </Text>

        <Group >
          <Button
            size="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            component='a'
            href="/auth/login"
          >
           Login
          </Button>

          <Button
            component="a"
            href="/"
            size="md"
            variant="default"
            leftSection={<FcGoogle size={20} />}
          >
            Google
          </Button>
        </Group>
      </Container>
    </div>
  );
}