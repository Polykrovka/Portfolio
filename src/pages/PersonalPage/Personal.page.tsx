import { Container, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import classes from '../CvPage/CvPage.module.css';

export function PersonalPage() {
  const { t } = useTranslation();
  useDocumentTitle('header.personalInfo');

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container size="md" className={classes.content}>
          <Title order={1} className={classes.docTitle}>
            {t('header.personalInfo')}
          </Title>
        </Container>
      </div>
      <Footer />
    </>
  );
}
