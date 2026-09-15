import { Anchor, Container, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import { useContactInfo } from '../../hooks/useContactInfo';
// import { useProperties } from '../../hooks/useProperties';
import classes from './Footer.module.css';

interface LinkItem {
  label: string;
  link: string;
  isRoute: boolean;
}

interface GroupData {
  title: string;
  links: LinkItem[];
}

export function Footer() {
  const { t } = useTranslation();
  // const { contactInfo } = useContactInfo();
  // const { properties } = useProperties();
  const contactInfo = undefined as
    | {
        companyName?: string;
        address?: string;
        krs?: string;
        nip?: string;
        regon?: string;
        phone?: string;
        email?: string;
      }
    | undefined;

  const data: GroupData[] = [
    {
      title: t('footer.navigation'),
      links: [
        { label: t('header.mainPage'), link: '/', isRoute: true },
        { label: t('header.frontend'), link: '/front', isRoute: true },
        { label: t('header.gameDev'), link: '/game-dev', isRoute: true },
        { label: t('header.contact'), link: '/contact', isRoute: true },
        { label: t('header.personalInfo'), link: '/personal-info', isRoute: true },
      ],
    },
  ];

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => {
      if (link.isRoute) {
        return (
          <Anchor
            component={Link}
            to={link.link}
            key={index}
            className={classes.link}
            onClick={(event) => {
              if (link.link === '#') {
                event.preventDefault();
              } else {
                window.scrollTo(0, 0);
              }
            }}
          >
            {link.label}
          </Anchor>
        );
      }

      return (
        <Anchor
          className={classes.link}
          href={link.link}
          key={index}
          onClick={(event) => {
            if (link.link === '#') {
              event.preventDefault();
            } else {
              window.scrollTo(0, 0);
            }
          }}
          target={link.link.startsWith('http') ? '_blank' : undefined}
          rel={link.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </Anchor>
      );
    });

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size="xl" fw={700} className={classes.logoText}>
            {t('header.logo')}
          </Text>
          <Text size="xs" c="dimmed" className={classes.description}>
            {t('footer.description')}
          </Text>

          <div className={classes.contactsWrapper}>
            <Text className={classes.contactText}>
              {contactInfo?.companyName}, {contactInfo?.address}
            </Text>

            <Text className={classes.contactText}>
              KRS: {contactInfo?.krs} · NIP: {contactInfo?.nip} · REGON: {contactInfo?.regon}
            </Text>

            <Text className={classes.contactText}>
              <Anchor className={classes.contactLink} href={`tel:${contactInfo?.phone}`}>
                Tel: {contactInfo?.phone}
              </Anchor>
            </Text>

            <Text className={classes.contactText}>
              <Anchor className={classes.contactLink} href={`mailto:${contactInfo?.email}`}>
                {contactInfo?.email}
              </Anchor>
              {', '}
              <Anchor
                className={classes.contactLink}
                href={`https://wa.me/${contactInfo?.phone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Anchor>
            </Text>
          </div>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2026 {contactInfo?.companyName} {t('footer.rights')}
        </Text>
      </Container>
    </footer>
  );
}
