import { Button, Menu } from '@mantine/core';
import { useState } from 'react';
import classes from './LanguageSelect.module.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'pl', label: 'PL' },
] as const;

type LanguageCode = (typeof languages)[number]['code'];

export function LanguageSelect() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <Menu shadow="md" width={100} position="bottom-end">
      <Menu.Target>
        <Button className={classes.trigger} variant="subtle">
          {current.label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        {languages.map((item) => (
          <Menu.Item
            key={item.code}
            className={`${classes.item} ${item.code === language ? classes.active : ''}`}
            onClick={() => setLanguage(item.code)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
