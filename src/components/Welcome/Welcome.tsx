

import { Anchor, Box, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../../utils/scrollToSection';
import classes from './Welcome.module.css';

export function Welcome() {
  const { t } = useTranslation();

  return (
    <Box className={classes.container}>
      <Title className={classes.title} ta="center">
        {t('welcome.title')}
      </Title>
      <Text className={classes.description} ta="center" size="lg" maw={680} mx="auto" mt="xl">
        {t('welcome.description')}{' '}
        {/* <Anchor href="#personal-info" onClick={(e) => scrollToSection(e, '#personal-info')} size="lg" className={classes.link}>
          {t('header.personalInfo')}
        </Anchor> */}
        .
      </Text>
    </Box>
  );
}
