import { createInstance, i18n, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from '../i18nConfig';

export interface I18nInitResult {
  i18n: i18n;
  resources: Record<string, Record<string, Resource>>;
  t: i18n['t'];
}

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Record<string, Record<string, Resource>>
): Promise<I18nInitResult> {
  const instance: i18n = i18nInstance || createInstance();

  instance.use(initReactI18next);

  if (!resources) {
    instance.use(
      resourcesToBackend((language, namespace) =>
        import(`../../locales/${language}/${namespace}.json`).then(m => m.default)
      )
    );
  }

  await instance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: instance,
    resources: instance.services.resourceStore.data,
    t: instance.t,
  };
}
