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
    { link: '/', label: 'Strona główna' },
    { link: '/oferta', label: 'Oferty' },
    { link: '/zrealizowane-oferty', label: 'Zrealizowane oferty' },
    { link: '/kontakt', label: 'Kontakt' },
    { link: '/polityka-prywatnosci', label: 'Polityka prywatności' },
  ];

  const isActive = (link: string) => {
    if (link === '/') {
      return location.pathname === '/';
    }
    if (link.startsWith('/oferta')) {
      return location.pathname.startsWith('/oferta');
    }
    if (link.startsWith('/zrealizowane-oferty')) {
      return location.pathname.startsWith('/zrealizowane-oferty');
    }
    if (link.startsWith('/kontakt')) {
      return location.pathname.startsWith('/kontakt');
    }
    if (link.startsWith('/polityka-prywatnosci')) {
      return location.pathname.startsWith('/polityka-prywatnosci');
    }
    return false;
  };

  const mainItems = mainLinks
    .filter(
      (item) =>
        item.link !== '/zrealizowane-oferty' ||
        // properties.some((property) => property.isSold && property.isAvailable)
        true
    )
    .map((item) => {
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