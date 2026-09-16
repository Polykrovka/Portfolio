import { Anchor, Container, Text, Title} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
// import { AboutUs } from '../../components/AboutUs/AboutUs';
// import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
// import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Welcome } from '../../components/Welcome/Welcome';
// import { useHomepage } from '../../hooks/useHomepage';
import classes from './HomePage.module.css';

export function HomePage() {
  const mobile = useMediaQuery('(max-width: 768px)');
  // const { homepageData } = useHomepage();

  return (
    <>
    <Header />
      <div className={classes.wrapper}>
        <Welcome />
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
