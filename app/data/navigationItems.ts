/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationItem } from '../types/navigation';

export const getNavigationItems = (t: any, lang: 'uk' | 'ru'): NavigationItem[] => {
  const slugs = {
    loans: {
      fast: { uk: 'shvidki-poziki', ru: 'bystrye-zajmy' },
      noInterest: { uk: 'poziki-bez-vidsotkiv', ru: 'zajmy-bez-protsentov' },
      guaranteed: { uk: 'poziki-bez-vidmovi', ru: 'zajmy-bez-otkaza' },
      onlineCard: { uk: 'na-kartu-online', ru: 'na-kartu-onlajn' },
    },
    microCredits: {
      main: { uk: 'mikrokrediti', ru: 'mikrokredity' },
      payday: { uk: 'do-zarplati', ru: 'do-zarplaty' },
      longTerm: { uk: 'na-trivaliy-termin', ru: 'na-dlitelnyj-srok' },
    },
  };

  return [
    { name: t('navigation.journal'), href: '/journal' },
    {
      name: t('navigation.loans'),
      href: '/mfos',
      dropdown: {
        [t('navigation.loans')]: [
          { name: t('navigation.loans'), href: `/mfo/${slugs.loans.fast[lang]}`, isBold: true },
          { name: t('navigation.fastLoans'), href: `/mfo/${slugs.loans.fast[lang]}` },
          { name: t('navigation.noInterest'), href: `/mfo/${slugs.loans.noInterest[lang]}` },
          { name: t('navigation.guaranteed'), href: `/mfo/${slugs.loans.guaranteed[lang]}` },
          { name: t('navigation.onlineCard'), href: `/mfo/${slugs.loans.onlineCard[lang]}` }
        ],
        [t('navigation.microCredits')]: [
          { name: t('navigation.microCredits'), href: `/mfo/${slugs.microCredits.main[lang]}`, isBold: true },
          { name: t('navigation.payday'), href: `/mfo/${slugs.microCredits.payday[lang]}` },
          { name: t('navigation.longTerm'), href: `/mfo/${slugs.microCredits.longTerm[lang]}` }
        ]
      }
    },
    { name: t('navigation.currencyExchange'), href: '/currency-exchange' },
    { name: t('navigation.askQuestion'), href: '/ask-question' }
  ];
};
