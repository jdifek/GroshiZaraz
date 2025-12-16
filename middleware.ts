import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const defaultLocale = "uk";

  // Создаем middleware от next-intl
  const intlMiddleware = createMiddleware({
    locales: ["uk", "ru"],
    defaultLocale,
    localePrefix: "always",
    localeDetection: false,
  });

  // Получаем ответ от intl middleware
  const response = intlMiddleware(request);

  // Добавляем pathname в headers
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};