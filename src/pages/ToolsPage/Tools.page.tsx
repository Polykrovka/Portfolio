import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import homeClasses from '../HomePage/HomePage.module.css';
import { WawArrivals } from './WawArrivals';

export function ToolsPage() {
  const { t } = useTranslation();
  useDocumentTitle('tools.title');

  return (
    <>
      <Header />
      <div className={homeClasses.wrapper}>
        <div className={homeClasses.widthWrapper}>
          <Container size="md" py="xl">
            <Title order={2} className={homeClasses.sectionTitle}>
              {t('tools.title')}
            </Title>
            <Text className={homeClasses.intro} ta="center" maw={720} mx="auto" mb={40}>
              {t('tools.intro')}
            </Text>
            <WawArrivals />
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
