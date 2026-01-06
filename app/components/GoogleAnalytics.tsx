/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = 'G-HJXK299WX6';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Отправляем pageview при каждом изменении роута
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Type declaration для TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}