import { Anchor, Container, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Anchor
      className={classes.contactLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Anchor>
  );
}

export function Footer() {
  const { t } = useTranslation();

  const contactInfo = {
    address: t('contacts.address'),
    phone: t('contacts.phone'),
    email: t('contacts.email'),
    github: t('contacts.github'),
    linkedin: t('contacts.linkedin'),
    telegram: t('contacts.telegram'),
  };

  const phoneTel = contactInfo.phone.replace(/\s/g, '');
  const whatsappUrl = `https://wa.me/${phoneTel.replace(/\D/g, '')}`;

  const data: GroupData[] = [
    {
      title: t('footer.navigation'),
      links: [
        { label: t('header.mainPage'), link: '/', isRoute: true },
        { label: t('header.cv'), link: '/cv', isRoute: true },
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
            {t('header.siteName')}
          </Text>
          <Text size="xs" c="dimmed" className={classes.description}>
            {t('footer.description')}
          </Text>

          <div className={classes.contactsWrapper}>
            <Text className={classes.contactText}>
              {t('contacts.name')}, {contactInfo.address}
            </Text>

            <Text className={classes.contactText}>
              <Anchor className={classes.contactLink} href={`tel:${contactInfo.phone}`}>
                Tel: {contactInfo.phone}
              </Anchor>
            </Text>

            <Text className={classes.contactText}>
              <Anchor className={classes.contactLink} href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </Anchor>
            </Text>

            <Text className={classes.contactText}>
              <ContactLink href={whatsappUrl}>{t('contacts.whatsappLabel')}</ContactLink>
              {', '}
              <ContactLink href={contactInfo.telegram}>
                {t('contacts.telegramLabel')}
              </ContactLink>
            </Text>

            <Text className={classes.contactText}>
              <ContactLink href={contactInfo.github}>{t('contacts.githubLabel')}</ContactLink>
              {', '}
              <ContactLink href={contactInfo.linkedin}>
                {t('contacts.linkedinLabel')}
              </ContactLink>
            </Text>
          </div>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2026 {t('header.siteName')} {t('footer.rights')}
        </Text>
      </Container>
    </footer>
  );
}
