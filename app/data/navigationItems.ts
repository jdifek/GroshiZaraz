/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationItem } from '../types/navigation';

export const getNavigationItems = (t: any): NavigationItem[] => [
  { name: t('navigation.journal'), href: '/journal' },
  {
    name: t('navigation.loans'),
    href: '/mfos',
    dropdown: {
      [t('navigation.loans')]: [
        { name: t('navigation.loans'), href: '/mfos', isBold: true },
        { name: t('navigation.fastLoans'), href: '/mfo/fast' },
        { name: t('navigation.noInterest'), href: '/mfo/no-interest' },
        { name: t('navigation.guaranteed'), href: '/mfo/guaranteed' },
        { name: t('navigation.onlineCard'), href: '/mfo/online' }
      ],
      [t('navigation.microCredits')]: [
        { name: t('navigation.microCredits'), href: '/mfo/micro', isBold: true },
        { name: t('navigation.payday'), href: '/mfo/payday' },
        { name: t('navigation.longTerm'), href: '/mfo/long-term' }
      ]
    }
  },
  { name: t('navigation.currencyExchange'), href: '/currency-exchange' },
  { name: t('navigation.askQuestion'), href: '/ask-question' }
];
