import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // ⬅️ Используем requestLocale вместо locale
  const locale = await requestLocale;
  const effectiveLocale = locale || routing.defaultLocale;
  
  try {
    const messages = (await import(`../messages/${effectiveLocale}.json`)).default;
    return { messages, locale: effectiveLocale };
  } catch (error) {
    console.error(`Failed to load messages for locale ${effectiveLocale}:`, error);
    return { 
      messages: (await import('../messages/uk.json')).default, 
      locale: 'uk' 
    };
  }
});