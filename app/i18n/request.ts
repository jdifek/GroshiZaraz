import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  console.log('Request.ts locale:', locale);
  // Fallback на 'ru', если locale не определён
  const effectiveLocale = locale || 'uk';
  try {
    const messages = (await import(`../messages/${effectiveLocale}.json`)).default;
    return { messages, locale: effectiveLocale };
  } catch (error) {
    console.error(`Failed to load messages for locale ${effectiveLocale}:`, error);
    return { messages: (await import('../messages/uk.json')).default, locale: 'uk' };
  }
});