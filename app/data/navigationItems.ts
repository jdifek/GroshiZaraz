import { NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
  { name: "Журнал", href: "/journal" },
  {
    name: "Карты",
    href: "/cards",
    dropdown: {
      "Дебетовые карты": [
        { name: "Карты", href: "/cards", isBold: true },
        { name: "С кешбэком", href: "/cards/cashback" },
        { name: "Зарплатные карты", href: "/cards/salary" },
        { name: "Премиальные карты", href: "/cards/premium" },
        { name: "Студенческие карты", href: "/cards/student" },
      ],
      "Кредитные карты": [
        { name: "Кредитные карты", href: "/cards/credit", isBold: true },
        { name: "Без годового обслуживания", href: "/cards/credit/no-fee" },
        { name: "С льготным периодом", href: "/cards/credit/grace-period" },
        { name: "Для путешествий", href: "/cards/credit/travel" },
      ],
    },
  },
  {
    name: "Кредиты",
    href: "/credits",
    dropdown: {
      "Кредиты": [
        { name: "Кредиты", href: "/credits", isBold: true },
        { name: "Наличными", href: "/credits/cash" },
        { name: "Кредит под залог", href: "/credits/secured" },
        { name: "С плохой кредитной историей", href: "/credits/bad-history" },
        { name: "Кредитный калькулятор", href: "/credits/calculator" },
      ],
      "Рефинансирование кредита": [
        { name: "Рефинансирование", href: "/credits/refinancing", isBold: true },
        { name: "Под меньший процент", href: "/credits/refinancing/lower-rate" },
        { name: "Рефинансирование ипотеки", href: "/credits/refinancing/mortgage" },
      ],
      "Ипотека": [
        { name: "Ипотека", href: "/credits/mortgage", isBold: true },
        { name: "Ипотека на вторичку", href: "/credits/mortgage/secondary" },
        { name: "Ипотека с господдержкой", href: "/credits/mortgage/government" },
        { name: "Ипотечный калькулятор", href: "/credits/mortgage/calculator" },
      ],
      "Автокредиты": [
        { name: "Автокредиты", href: "/credits/auto", isBold: true },
        { name: "На новые авто", href: "/credits/auto/new" },
        { name: "На подержанные авто", href: "/credits/auto/used" },
      ],
    },
  },
  {
    name: "Займы",
    href: "/mfos",
    dropdown: {
      "Займы": [
        { name: "Займы", href: "/mfos", isBold: true },
        { name: "Быстрые займы", href: "/mfos/fast" },
        { name: "Займы без процентов", href: "/mfos/no-interest" },
        { name: "Займы без отказа", href: "/mfos/guaranteed" },
        { name: "На карту онлайн", href: "/mfos/online" },
      ],
      "Микрокредиты": [
        { name: "Микрокредиты", href: "/mfos/micro", isBold: true },
        { name: "До зарплаты", href: "/mfos/micro/payday" },
        { name: "На длительный срок", href: "/mfos/micro/long-term" },
      ],
    },
  },
  // {
  //   name: "Вклады",
  //   href: "/deposits",
  //   dropdown: {
  //     "Вклады": [
  //       { name: "Вклады", href: "/deposits", isBold: true },
  //       { name: "С высокой ставкой", href: "/deposits/high-rate" },
  //       { name: "С пополнением", href: "/deposits/replenishment" },
  //       { name: "Краткосрочные", href: "/deposits/short-term" },
  //       { name: "Долгосрочные", href: "/deposits/long-term" },
  //     ],
  //     "Накопительные счета": [
  //       { name: "Накопительные счета", href: "/deposits/savings", isBold: true },
  //       { name: "Без ограничений", href: "/deposits/savings/unlimited" },
  //       { name: "С капитализацией", href: "/deposits/savings/compound" },
  //     ],
  //   },
  // },
  // { name: "Бизнес", href: "/business" },
  // {
  //   name: "Страхование",
  //   href: "/insurance",
  //   dropdown: {
  //     "Страхование": [
  //       { name: "Страхование", href: "/insurance", isBold: true },
  //       { name: "ОСАГО", href: "/insurance/osago" },
  //       { name: "Каско", href: "/insurance/casco" },
  //       { name: "Медицинское страхование", href: "/insurance/medical" },
  //       { name: "Страхование жизни", href: "/insurance/life" },
  //     ],
  //     "Страхование имущества": [
  //       { name: "Страхование имущества", href: "/insurance/property", isBold: true },
  //       { name: "Квартиры", href: "/insurance/property/apartment" },
  //       { name: "Дома", href: "/insurance/property/house" },
  //     ],
  //   },
  // },
  // { name: "Банки", href: "/banks" },
  { name: "Курс валют", href: "/currency-exchange" },
  { name: "Задать вопрос", href: "/ask-question" },
];