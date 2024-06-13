import React, { useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setColorScheme(newTheme);
  };

  return (
    <>
      <IconSun
        className={cx(classes.icon, { [classes.none]: theme === 'light' })}
        stroke={1.5}
        onClick={toggleTheme}
      />
      <IconMoon
        className={cx(classes.icon, { [classes.none]: theme === 'dark' })}
        stroke={1.5}
        onClick={toggleTheme}
      />
    </>
  );
}
