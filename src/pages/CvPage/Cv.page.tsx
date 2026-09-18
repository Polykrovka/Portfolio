import { Anchor, Button, Container, List, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import actionButtonClasses from '../../styles/actionButton.module.css';
import classes from './CvPage.module.css';

const PDF_HREF = '/Anton-Nedvedz-Software-Engineer.pdf';

type LabeledItem = { label: string; value: string };

type Job = {
  title: string;
  companyUrl?: string;
  tools?: string;
  customer?: string;
  customerDescription?: string;
  projectDescription?: string;
  projectRoles?: string;
  responsibilities?: string[];
};

export function CvPage() {
  const { t } = useTranslation();
  useDocumentTitle('header.cv');

  const leadership = t('cv.skills.leadership', { returnObjects: true }) as LabeledItem[];
  const technologies = t('cv.skills.technologies', {
    returnObjects: true,
  }) as LabeledItem[];
  const jobs = t('cv.work.jobs', { returnObjects: true }) as Job[];
  const courses = t('cv.courses.items', { returnObjects: true }) as string[];
  const languages = t('cv.languages.items', { returnObjects: true }) as LabeledItem[];

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container size="md" className={classes.content}>
          <Title order={1} className={classes.docTitle}>
            {t('cv.title')}
          </Title>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              {t('cv.skills.title')}
            </Title>

            <Title order={3} className={classes.subTitle}>
              {t('cv.skills.leadershipTitle')}
            </Title>
            <List className={classes.list}>
              {leadership.map((item) => (
                <List.Item key={item.label}>
                  <Text span fw={700}>
                    {item.label}
                  </Text>{' '}
                  {item.value}
                </List.Item>
              ))}
            </List>

            <Title order={3} className={classes.subTitle}>
              {t('cv.skills.managerialTitle')}
            </Title>
            <List className={classes.list}>
              <List.Item>
                <Text span fw={700}>
                  {t('cv.skills.managerial.0.label')}
                </Text>{' '}
                {t('cv.skills.managerial.0.value')}
              </List.Item>
            </List>

            <Title order={3} className={classes.subTitle}>
              {t('cv.skills.technologiesTitle')}
            </Title>
            <List className={classes.list}>
              {technologies.map((item) => (
                <List.Item key={item.label}>
                  <Text span fw={700}>
                    {item.label}
                  </Text>{' '}
                  {item.value}
                </List.Item>
              ))}
            </List>
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              {t('cv.work.title')}
            </Title>

            {jobs.map((job) => (
              <div key={job.title} className={classes.job}>
                <Text className={classes.jobTitle}>
                  {job.title}
                  {job.companyUrl ? (
                    <>
                      {' '}
                      <Anchor href={job.companyUrl} target="_blank" rel="noreferrer">
                        {job.companyUrl}
                      </Anchor>
                    </>
                  ) : null}
                </Text>
                {job.customer ? (
                  <Text>
                    <Text span fw={700}>
                      {t('cv.work.customerLabel')}
                    </Text>{' '}
                    {job.customer}
                  </Text>
                ) : null}
                {job.customerDescription ? (
                  <Text>
                    <Text span fw={700}>
                      {t('cv.work.customerDescriptionLabel')}
                    </Text>{' '}
                    {job.customerDescription}
                  </Text>
                ) : null}
                {job.projectDescription ? (
                  <Text>
                    <Text span fw={700}>
                      {t('cv.work.projectDescriptionLabel')}
                    </Text>{' '}
                    {job.projectDescription}
                  </Text>
                ) : null}
                {job.projectRoles ? (
                  <Text>
                    <Text span fw={700}>
                      {t('cv.work.projectRolesLabel')}
                    </Text>{' '}
                    {job.projectRoles}
                  </Text>
                ) : null}
                {job.responsibilities?.length ? (
                  <>
                    <Text fw={700} mt="xs">
                      {t('cv.work.responsibilitiesLabel')}
                    </Text>
                    <List className={classes.list}>
                      {job.responsibilities.map((item) => (
                        <List.Item key={item}>{item}</List.Item>
                      ))}
                    </List>
                  </>
                ) : null}
                {job.tools ? (
                  <Text>
                    <Text span fw={700}>
                      {t('cv.work.toolsLabel')}
                    </Text>{' '}
                    {job.tools}
                  </Text>
                ) : null}
              </div>
            ))}
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              {t('cv.education.title')}
            </Title>

            <div className={classes.job}>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.establishmentLabel')}
                </Text>{' '}
                {t('cv.education.college1.establishment')}
              </Text>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.facultyLabel')}
                </Text>{' '}
                {t('cv.education.college1.faculty')}
              </Text>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.degreeLabel')}
                </Text>{' '}
                {t('cv.education.college1.degree')}
              </Text>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.specialtyLabel')}
                </Text>{' '}
                {t('cv.education.college1.specialty')}
              </Text>
            </div>

            <div className={classes.job}>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.establishmentLabel')}
                </Text>{' '}
                {t('cv.education.college2.establishment')}
              </Text>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.facultyLabel')}
                </Text>{' '}
                {t('cv.education.college2.faculty')}
              </Text>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.degreeLabel')}
                </Text>{' '}
                {t('cv.education.college2.degree')}
              </Text>
              <Text>
                <Text span fw={700}>
                  {t('cv.education.specialtyLabel')}
                </Text>{' '}
                {t('cv.education.college2.specialty')}
              </Text>
            </div>
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              {t('cv.courses.title')}
            </Title>
            <List className={classes.list}>
              {courses.map((item) => (
                <List.Item key={item}>{item}</List.Item>
              ))}
            </List>
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              {t('cv.languages.title')}
            </Title>
            <List className={classes.list}>
              {languages.map((item) => (
                <List.Item key={item.label}>
                  <Text span fw={700}>
                    {item.label}
                  </Text>{' '}
                  {item.value}
                </List.Item>
              ))}
            </List>
          </section>

          <section className={classes.section}>
            <Title order={2} className={classes.sectionTitle}>
              {t('cv.contacts.title')}
            </Title>
            <List className={classes.list}>
              <List.Item>
                <Text span fw={700}>
                  {t('cv.contacts.emailLabel')}
                </Text>{' '}
                <Anchor href={`mailto:${t('cv.contacts.email')}`}>
                  {t('cv.contacts.email')}
                </Anchor>
              </List.Item>
              <List.Item>
                <Text span fw={700}>
                  {t('cv.contacts.githubLabel')}
                </Text>{' '}
                <Anchor
                  href={t('cv.contacts.github')}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('cv.contacts.github')}
                </Anchor>
              </List.Item>
              <List.Item>
                <Text span fw={700}>
                  {t('cv.contacts.phoneLabel')}
                </Text>{' '}
                <Anchor href={`tel:${t('cv.contacts.phone').replace(/\s/g, '')}`}>
                  {t('cv.contacts.phone')}
                </Anchor>
              </List.Item>
            </List>
          </section>

          <div className={classes.download}>
            <Button
              component="a"
              href={PDF_HREF}
              download="Anton-Nedvedz-Software-Engineer.pdf"
              className={actionButtonClasses.actionButton}
            >
              {t('cv.downloadPdf')}
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
