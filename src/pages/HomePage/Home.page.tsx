import { Anchor, Container, Text, Title} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { Trans, useTranslation } from 'react-i18next';
// import { AboutUs } from '../../components/AboutUs/AboutUs';
// import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
// import { ContactForm } from '../../components/ContactForm/ContactForm';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { CheckersGame } from '../../components/CheckersGame/CheckersGame';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { SectionLinks } from '../../components/SectionLinks/SectionLinks';
import { Welcome } from '../../components/Welcome/Welcome';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
// import { useHomepage } from '../../hooks/useHomepage';
import classes from './HomePage.module.css';

export function HomePage() {
  const { t } = useTranslation();
  const mobile = useMediaQuery('(max-width: 768px)');
  useDocumentTitle();
  // const { homepageData } = useHomepage();

  return (
    <>
    <Header />
      <div className={classes.wrapper}>
        <Welcome />
        <div className={classes.widthWrapper}>
        <Text className={classes.intro} ta="center" maw={720} mx="auto" mt={60} mb={40}>
            {t('home.intro')}
          </Text>
          <SectionLinks />

          <section className={classes.cppSection}>
            <Title order={2} className={classes.sectionTitle}>
              C++
            </Title>
          </section>

          <section className={classes.frontendSection}>
            <Title order={2} className={classes.sectionTitle}>
              {t('sections.frontend')}
            </Title>
            <Text className={classes.text}>
              <Trans
                i18nKey="home.frontendProject"
                components={{
                  school: <CustomLink href="https://rs.school/" className={classes.contactLink} />,
                }}
              />
            </Text>
            <Text className={classes.text}>
              <Trans
                i18nKey="home.frontendChess"
                components={{
                  repo: <CustomLink href="https://github.com/Polykrovka/OneNightChess" className={classes.contactLink} />,
                }}
              />
            </Text>
            <Text className={classes.text}>
              {t('home.frontendChessRedux')}
            </Text>
            <CheckersGame />
          </section>
        </div>
      {/* 
      
        <div className={classes.widthWrapper}>
          <Title order={2} mt={60} mb={40} className={classes.sectionTitle}>
            {homepageData?.offersTitle || 'Nasze oferty'}
          </Title>
          <CardsCarousel />
          {mobile && (
            <div className={classes.mobileLinkContainer}>
              <Anchor 
                component={Link} 
                to="/oferta" 
                size="lg" 
                className={classes.mobileLink}
                onClick={() => window.scrollTo(0, 0)}
              >
                Zobacz wszystkie oferty
              </Anchor>
            </div>
          )}
        </div>

        <AboutUs />

        <Container size="lg" className={classes.contactContainer}>
          <section className={classes.contactSection} id="formularz">
            <Title order={2} className={classes.contactTitle}>
              Skontaktuj się z nami
            </Title>
            <Text className={classes.text} mb="xl" c="dimmed">
              Wypełnij formularz, a skontaktujemy się z Tobą wkrótce.
            </Text>
            <ContactForm />
          </section>
        </Container>
      </div>
      */}
      </div>
      <Footer />
    </>
  );
}
