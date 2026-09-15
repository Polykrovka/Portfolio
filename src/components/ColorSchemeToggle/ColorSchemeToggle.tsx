import { Button, Group, useMantineColorScheme } from '@mantine/core';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group className={classes.toggleGroup}>
      <Button 
        className={`${classes.toggleButton} ${colorScheme === 'light' ? classes.active : ''}`}
        variant="subtle" 
        onClick={() => setColorScheme('light')}
      >
        Light
      </Button>
      <Button 
        className={`${classes.toggleButton} ${colorScheme === 'dark' ? classes.active : ''}`}
        variant="subtle" 
        onClick={() => setColorScheme('dark')}
      >
        Dark
      </Button>
      <Button 
        className={`${classes.toggleButton} ${colorScheme === 'auto' ? classes.active : ''}`}
        variant="subtle" 
        onClick={() => setColorScheme('auto')}
      >
        Auto
      </Button>
    </Group>
  );
}
