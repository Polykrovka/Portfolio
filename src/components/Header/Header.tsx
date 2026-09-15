import { Anchor, Box, Burger, Container, Group, Text, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
// import { useProperties } from '../../hooks/useProperties';
import classes from './Header.module.css';

const userLinks: { link: string; label: string }[] = [];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const location = useLocation();
  // const { properties } = useProperties();

  const mainLinks = [
    { link: '/', label: 'Main Page' },
    { link: '/front', label: 'Frontend' },
    { link: '/game-dev', label: 'Game development' },
    { link: '/contact', label: 'Contact' },
    { link: '/personal-info', label: 'Personal info' },
  ];

  const isActive = (link: string) => {
    if (link === '/') {
      return location.pathname === '/';
    }
    if (link.startsWith('/front')) {
      return location.pathname.startsWith('/front');
    }
    if (link.startsWith('/game-dev')) {
      return location.pathname.startsWith('/game-dev');
    }
    if (link.startsWith('/contact')) {
      return location.pathname.startsWith('/contact');
    }
    if (link.startsWith('/personal-info')) {
      return location.pathname.startsWith('/personal-info');
    }
    return false;
  };

  const mainItems = mainLinks.map((item) => {
    const isLink = item.link.startsWith('/');
    
    if (isLink) {
      return (
        <Anchor
          component={Link}
          to={item.link}
          key={item.label}
          className={classes.mainLink}
          data-active={isActive(item.link) || undefined}
          onClick={() => window.scrollTo(0, 0)}
        >
          {item.label}
        </Anchor>
      );
    }
    
    return (
      <Anchor
        href={item.link}
        key={item.label}
        className={classes.mainLink}
        data-active={isActive(item.link) || undefined}
        onClick={(event) => event.preventDefault()}
      >
        {item.label}
      </Anchor>
    );
  });

  const secondaryItems = userLinks.map((item) => {
    const isLink = item.link.startsWith('/');
    
    if (isLink) {
      return (
        <Anchor
          component={Link}
          to={item.link}
          key={item.label}
          className={classes.secondaryLink}
          onClick={() => window.scrollTo(0, 0)}
        >
          {item.label}
        </Anchor>
      );
    }
    
    return (
      <Anchor
        href={item.link}
        key={item.label}
        onClick={(event) => event.preventDefault()}
        className={classes.secondaryLink}
      >
        {item.label}
      </Anchor>
    );
  });

  const allSecondaryItems = [...secondaryItems, <ColorSchemeToggle key="color-scheme-toggle" />];

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Anchor component={Link} to="/" style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
          <Text size="xl" fw={700} className={classes.logoText}>
            AW Development
          </Text>
        </Anchor>
        <Box className={classes.links} visibleFrom="sm">
          <Group justify="flex-end">{allSecondaryItems}</Group>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={toggle}
        title={<Text fw={700} size="lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Menu</Text>}
        size="sm"
        hiddenFrom="sm"
      >
        <Stack gap="md">
          {mainItems}
          <ColorSchemeToggle />
        </Stack>
      </Drawer>
    </header>
  );
}