import { Avatar, Text, Group } from '@mantine/core';
import classes from './UserInfo.module.css';

export default function UserInfo() {
  return (
      <Group wrap="nowrap" mt={20} mb={5}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={50}
          radius="md"
        />
        <div>
          <div>
          <Text fz="lg" fw={500} className={classes.name}>
            Robert Glassbreaker
          </Text>
            <Text fz="xs" c="dimmed">
              21 Jun 2005
            </Text>
          </div>
        </div>
      </Group>
  );
}