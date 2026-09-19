import { Anchor, Box, Burger, Container, Group, Text, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
// import { useProperties } from '../../hooks/useProperties';
import classes from './Header.module.css';

const userLinks: { link: string; label: string }[] = [];

export function Header() {
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure(false);
  const location = useLocation();
  // const { properties } = useProperties();

  const mainLinks = [
    { link: '/', labelKey: 'header.mainPage' },
    { link: '/cv', labelKey: 'header.cv' },
    { link: '/front', labelKey: 'header.frontend' },
    { link: '/game-dev', labelKey: 'header.gameDev' },
    { link: '/contact', labelKey: 'header.contact' },
    { link: '/personal', labelKey: 'header.personalInfo' },
  ];

  const isActive = (link: string) => {
    if (link === '/') {
      return location.pathname === '/';
    }
    if (link.startsWith('/cv')) {
      return location.pathname.startsWith('/cv');
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
    if (link.startsWith('/personal')) {
      return location.pathname.startsWith('/personal');
    }
    return false;
  };

  const mainItems = mainLinks.map((item) => {
    const isLink = item.link.startsWith('/');
    const label = t(item.labelKey);
    
    if (isLink) {
      return (
        <Anchor
          component={Link}
          to={item.link}
          key={item.link}
          className={classes.mainLink}
          data-active={isActive(item.link) || undefined}
          onClick={() => window.scrollTo(0, 0)}
        >
          {label}
        </Anchor>
      );
    }
    
    return (
      <Anchor
        href={item.link}
        key={item.link}
        className={classes.mainLink}
        data-active={isActive(item.link) || undefined}
        onClick={(event) => event.preventDefault()}
      >
        {label}
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

  const allSecondaryItems = [
    ...secondaryItems,
    <LanguageSelect key="language-select" />,
    <ColorSchemeToggle key="color-scheme-toggle" />,
  ];

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Anchor component={Link} to="/" style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
          <Text size="xl" fw={700} className={classes.logoText}>
            {t('header.siteName')}
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
        title={<Text fw={700} size="lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('header.menu')}</Text>}
        size="sm"
        hiddenFrom="sm"
      >
        <Stack gap="md">
          {mainItems}
          <LanguageSelect />
          <ColorSchemeToggle />
        </Stack>
      </Drawer>
    </header>
  );
}
