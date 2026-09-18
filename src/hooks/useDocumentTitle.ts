import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Sets the browser tab title. pageTitleKey — i18n key for the page part (e.g. 'header.cv');
// without it — site name only.
export function useDocumentTitle(pageTitleKey?: string) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const siteName = t('header.siteName');
    document.title = pageTitleKey ? `${t(pageTitleKey)} | ${siteName}` : siteName;

    return () => {
      document.title = t('header.siteName');
    };
  }, [pageTitleKey, t, i18n.language]);
}
