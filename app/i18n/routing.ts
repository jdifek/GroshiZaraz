import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'ru'], // ⬅️ Исправить на ваши локали
  defaultLocale: 'uk',
  localePrefix: 'always' // ⬅️ Всегда показывать префикс /uk или /ru
});
