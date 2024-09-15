import React, { useState } from 'react';
import {
  Paper,
  Title,
  Container,
  Group,
  Button,
  Select,
  TextInput,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/inertia-react';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Link } from '@inertiajs/inertia-react';
import { AiFillEdit } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import SettingsLayout from '@/Layouts/SettingsLayout';
import AvatarEdit from '@/Components/AvatarEdit';
import CustomDatePicker from '@/Components/CustomDatePicker';

export default function ProfilePage() {
  const { user, genders, errors } = usePage().props;
  const [opened, { open, close }] = useDisclosure(false);

  // Map genders array for selection
  const genderOptions = genders.map(val => ({
    label: val.name,
    value: val.slug
  }));

  
  const { data, get, patch, setData, processing } = useForm({
    avatar: user.data.avatar,
    name: user.data.name,
    email: user.data.email,
    gender: user.data.gender ? user.data.gender.slug : null,
    birthday: user.data.birthday,
  });
  
  console.log(data)
  const [isDataChanged, setIsDataChanged] = useState(false);

  const clearData = () => {
    get('/profile');
  };

  const checkDataChanged = newData => {
    const isChanged =
      newData.avatar !== user.data.avatar ||
      newData.name !== user.data.name ||
      newData.email !== user.data.email ||
      newData.gender !== (user.data.gender ? user.data.gender.slug : null) ||
      newData.birthday !== user.data.birthday;

    setIsDataChanged(isChanged);
  };

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(field, value);
    checkDataChanged(newData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    patch(`/profile/${user.data.slug}`, {
      onSuccess: () => {
        notifications.show({
          title: 'Profil berhasil diperbarui! 🎉',
          color: 'green'
        });
        setIsDataChanged(false); // Reset isDataChanged setelah submit
      }
    });
  };

  return (
    <SettingsLayout page='Profile'>
      <AvatarEdit src={user.data.avatar} onChange={e => setData('avatar', e)} setIsDataChanged={setIsDataChanged} />

      {errors.error && (
        <div className="text-red-500 text-sm">{errors.error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          label="Nama"
          placeholder="john123"
          value={data.name}
          onChange={e => handleChange('name', e.target.value)}
          required
        />
        <TextInput
          mt="md"
          label="Email"
          placeholder="john@example.com"
          value={data.email}
          onChange={e => handleChange('email', e.target.value)}
          required
        />
        <Select
          mt="md"
          label="Gender"
          placeholder="Select gender"
          data={genderOptions}
          value={data.gender}
          onChange={value => handleChange('gender', value)}
          required
        />
        <CustomDatePicker
          value={data.birthday}
          onChange={value => handleChange('birthday', value)}
        />
      </form>
      <Link
        className="lowercase text-blue-500 cursor-pointer text-md"
        href="/reset"
      >
        reset password
      </Link>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <h1 className="text-xl text-center font-bold">Konfirmasi</h1>
        <Group justify="center" gap="sm" mt={20}>
          <Button variant="filled" color="red" onClick={close}>
            Tidak
          </Button>
          <Button
            type="submit"
            variant="filled"
            color="green"
            onClick={handleSubmit}
            disabled={processing}
            loading={processing}
          >
            Ya
          </Button>
        </Group>
      </Modal>
      {isDataChanged && (
        <Group>
          <Button
            mt="md"
            onClick={open}
            variant="filled"
            color="yellow"
            leftSection={<AiFillEdit className="h-4" />}
          >
            Ubah Profile
          </Button>
          <Button
            mt="md"
            onClick={clearData}
            variant="filled"
            color="red"
            leftSection={<ImCancelCircle className="h-4" />}
          >
            Batal
          </Button>
        </Group>
      )}
    </SettingsLayout>
  );
}