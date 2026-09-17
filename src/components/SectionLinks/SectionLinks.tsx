import { Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './SectionLinks.module.css';

const sectionLinks = [
  { labelKey: 'sections.unity' },
  { labelKey: 'sections.unreal' },
  { labelKey: 'sections.threeD' },
  { labelKey: 'sections.frontend' },
];

export function SectionLinks() {
  const { t } = useTranslation();

  return (
    <Group justify="center" className={classes.sectionLinks}>
      {sectionLinks.map((item) => (
        <Button key={item.labelKey} className={classes.sectionLink}>
          {t(item.labelKey)}
        </Button>
      ))}
    </Group>
  );
}
