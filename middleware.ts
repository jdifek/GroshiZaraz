import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  console.log('Middleware URL:', request.nextUrl.pathname);
  console.log('Middleware locale:', request.nextUrl.locale);

  // Извлекаем локаль из пути
  const pathname = request.nextUrl.pathname;
  const locale = pathname.startsWith('/ru') ? 'ru' : pathname.startsWith('/ua') ? 'ua' : 'ru';
  console.log('Extracted locale:', locale);

  return createMiddleware({
    locales: ['ru', 'ua'],
    defaultLocale: 'ru',
    localePrefix: 'always', // Явно указываем локаль в URL
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Исключаем _next и файлы с расширениями
};