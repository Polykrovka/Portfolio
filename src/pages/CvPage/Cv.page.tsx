import { Container, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import classes from './CvPage.module.css';

export function CvPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container size="lg">
          <Title order={1} className={classes.title}>
            {t('header.cv')}
          </Title>
        </Container>
      </div>
      <Footer />
    </>
  );
}
