import React from "react";
import {
  Check,
  X,
  Calculator,
  Shield,
  Clock,
  Star,
  TrendingUp,
  AlertCircle,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

type SEOLoansContentProps = {
  lang: string;
};

export default async function SEOLoansContent({ lang }: SEOLoansContentProps) {
  const t = await getTranslations({
    locale: lang,
    namespace: "SEOLoansContent",
  });

  // Преимущества
  const advantages = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: t("advantages.fastProcessing.title"),
      description: t("advantages.fastProcessing.description"),
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: t("advantages.firstFree.title"),
      description: t("advantages.firstFree.description"),
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: t("advantages.available247.title"),
      description: t("advantages.available247.description"),
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: t("advantages.highApproval.title"),
      description: t("advantages.highApproval.description"),
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      title: t("advantages.easyComparison.title"),
      description: t("advantages.easyComparison.description"),
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: t("advantages.noIncomeCertificate.title"),
      description: t("advantages.noIncomeCertificate.description"),
    },
  ];

  // Шаги инструкции
  const instructionSteps = [
    {
      number: 1,
      title: t("instructions.step1.title"),
      description: t("instructions.step1.description"),
      details: t("instructions.step1.details"),
    },
    {
      number: 2,
      title: t("instructions.step2.title"),
      description: t("instructions.step2.description"),
      details: t("instructions.step2.details"),
    },
    {
      number: 3,
      title: t("instructions.step3.title"),
      description: t("instructions.step3.description"),
      details: t("instructions.step3.details"),
    },
    {
      number: 4,
      title: t("instructions.step4.title"),
      description: t("instructions.step4.description"),
      details: t("instructions.step4.details"),
    },
  ];

  // FAQ
  const faqItems = [
    { q: "q1", question: t("faq.q1.question"), answer: t("faq.q1.answer") },
    { q: "q2", question: t("faq.q2.question"), answer: t("faq.q2.answer") },
    { q: "q3", question: t("faq.q3.question"), answer: t("faq.q3.answer") },
    { q: "q4", question: t("faq.q4.question"), answer: t("faq.q4.answer") },
    { q: "q5", question: t("faq.q5.question"), answer: t("faq.q5.answer") },
    { q: "q6", question: t("faq.q6.question"), answer: t("faq.q6.answer") },
    { q: "q7", question: t("faq.q7.question"), answer: t("faq.q7.answer") },
    { q: "q8", question: t("faq.q8.question"), answer: t("faq.q8.answer") },
  ];

  // Глоссарий
  const glossaryItems = [
    { term: t("glossary.mfo.term"), definition: t("glossary.mfo.definition") },
    { term: t("glossary.apr.term"), definition: t("glossary.apr.definition") },
    { term: t("glossary.overdraft.term"), definition: t("glossary.overdraft.definition") },
    { term: t("glossary.prolongation.term"), definition: t("glossary.prolongation.definition") },
    { term: t("glossary.scoring.term"), definition: t("glossary.scoring.definition") },
    { term: t("glossary.principal.term"), definition: t("glossary.principal.definition") },
    { term: t("glossary.creditHistory.term"), definition: t("glossary.creditHistory.definition") },
    { term: t("glossary.restructuring.term"), definition: t("glossary.restructuring.definition") },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12">
      {/* 1. Вступительный блок */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 relative inline-block">
          {t("mainTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: t.raw("intro.p1") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("intro.p2") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("intro.p3") }} />
        </div>
      </section>

      {/* 2. Как работают микрозаймы */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 relative inline-block">
          {t("howItWorksTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Условия и размеры */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-blue-500" />
                {t("conditions.title")}
              </h3>
              <div className="space-y-4 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t.raw("conditions.text1") }} />
                <p dangerouslySetInnerHTML={{ __html: t.raw("conditions.text2") }} />
              </div>
            </div>

            {/* Безопасность */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                {t("safety.title")}
              </h3>
              <div className="space-y-4 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t.raw("safety.text1") }} />
                <p dangerouslySetInnerHTML={{ __html: t.raw("safety.text2") }} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Скорость */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500" />
                {t("speed.title")}
              </h3>
              <div className="space-y-4 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t.raw("speed.text1") }} />
                <p dangerouslySetInnerHTML={{ __html: t.raw("speed.text2") }} />
              </div>
            </div>

            {/* Поради експертів */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                {t("expertTips.title")}
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>{t("expertTips.text1")}</p>
                <p>{t("expertTips.text2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Сравнение МФО с банками */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("comparisonTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{t("comparison.criteria")}</th>
                  <th className="px-6 py-4 text-center font-semibold">{t("comparison.mfo")}</th>
                  <th className="px-6 py-4 text-center font-semibold">{t("comparison.bank")}</th>
                  <th className="px-6 py-4 text-center font-semibold">{t("comparison.winner")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{t("comparison.speed")}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">{t("comparison.speedMfo")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{t("comparison.speedBank")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                      <Check className="w-5 h-5" /> МФО
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{t("comparison.documents")}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">{t("comparison.documentsMfo")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{t("comparison.documentsBank")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                      <Check className="w-5 h-5" /> МФО
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{t("comparison.interest")}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{t("comparison.interestMfo")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">{t("comparison.interestBank")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      <Check className="w-5 h-5" /> Банк
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{t("comparison.maxAmount")}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{t("comparison.maxAmountMfo")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">{t("comparison.maxAmountBank")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      <Check className="w-5 h-5" /> Банк
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{t("comparison.term")}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{t("comparison.termMfo")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">{t("comparison.termBank")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      <Check className="w-5 h-5" /> Банк
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{t("comparison.creditHistory")}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">{t("comparison.creditHistoryMfo")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{t("comparison.creditHistoryBank")}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                      <Check className="w-5 h-5" /> МФО
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Преимущества */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("advantagesTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Пошаговая инструкция */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("instructionTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {instructionSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 text-xl">{step.title}</h3>
                  <p className="text-gray-700 text-lg">{step.description}</p>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                    <strong>{t("detailsLabel")}</strong> {step.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">{t("instructions.important")}</h3>
              <p className="text-yellow-700">{t("instructions.importantText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("faqTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.question}</h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Экспертные советы */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("expertAdviceTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Что НУЖНО делать */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-3">
                <Check className="w-6 h-6" />
                {t("expertAdvice.doTitle")}
              </h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.do1")}</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.do2")}</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.do3")}</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.do4")}</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.do5")}</li>
              </ul>
            </div>

            {/* Калькуляторы */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-4">{t("expertAdvice.calculators")}</h3>
              <p className="text-blue-700 mb-4">{t("expertAdvice.calculatorsText")}</p>
              <ul className="space-y-2 text-blue-700 mb-4">
                <li>• {t("expertAdvice.calculatorsFormula1")}</li>
                <li>• {t("expertAdvice.calculatorsFormula2")}</li>
                <li>• {t("expertAdvice.calculatorsFormula3")}</li>
              </ul>
              <p className="text-blue-700">{t("expertAdvice.calculatorsNote")}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Чего НЕ СТОИТ делать */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-3">
                <X className="w-6 h-6" />
                {t("expertAdvice.dontTitle")}
              </h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3"><X className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.dont1")}</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.dont2")}</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.dont3")}</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.dont4")}</li>
                <li className="flex items-start gap-3"><X className="w-5 h-5 flex-shrink-0 mt-0.5" />{t("expertAdvice.dont5")}</li>
              </ul>
            </div>

            {/* Альтернативы */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="font-semibold text-yellow-800 mb-4">{t("expertAdvice.alternatives")}</h3>
              <p className="text-yellow-700 mb-4">{t("expertAdvice.alternativesText")}</p>
              <ul className="space-y-2 text-yellow-700">
                <li>• {t("expertAdvice.alternative1")}</li>
                <li>• {t("expertAdvice.alternative2")}</li>
                <li>• {t("expertAdvice.alternative3")}</li>
                <li>• {t("expertAdvice.alternative4")}</li>
                <li>• {t("expertAdvice.alternative5")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("ctaTitle")}</h2>

        <div className="max-w-3xl mx-auto space-y-4 text-lg text-blue-100">
          <p dangerouslySetInnerHTML={{ __html: t.raw("cta.text1") }} />
          <p dangerouslySetInnerHTML={{ __html: t.raw("cta.text2") }} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg">
            {t("cta.button")}
          </button>
          <div className="flex items-center gap-2 text-blue-200">
            <Shield className="w-5 h-5" />
            <span className="text-sm">{t("cta.licensed")}</span>
          </div>
        </div>
      </section>

      {/* 9. Другие продукты */}
      <section className="bg-gray-50 rounded-3xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-8">{t("otherProductsTitle")}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t("otherProducts.creditCards.title")}</h3>
              <p className="text-gray-600 text-sm mb-4">{t("otherProducts.creditCards.description")}</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                {t("otherProducts.creditCards.button")}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t("otherProducts.deposits.title")}</h3>
              <p className="text-gray-600 text-sm mb-4">{t("otherProducts.deposits.description")}</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                {t("otherProducts.deposits.button")}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t("otherProducts.mortgage.title")}</h3>
              <p className="text-gray-600 text-sm mb-4">{t("otherProducts.mortgage.description")}</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                {t("otherProducts.mortgage.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Статистика */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center relative inline-block w-full">
          {t("statisticsTitle")}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">{t("statistics.mfoCount")}</div>
            <div className="text-blue-100 text-sm">{t("statistics.mfoCountLabel")}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">{t("statistics.approvalRate")}</div>
            <div className="text-green-100 text-sm">{t("statistics.approvalRateLabel")}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">{t("statistics.avgTime")}</div>
            <div className="text-orange-100 text-sm">{t("statistics.avgTimeLabel")}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">{t("statistics.avgAmount")}</div>
            <div className="text-purple-100 text-sm">{t("statistics.avgAmountLabel")}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{t("statistics.dynamicsTitle")}</h3>
          <div className="space-y-6 text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: t.raw("statistics.dynamicsText") }} />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">{t("statistics.trendsTitle")}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />{t("statistics.trend1")}</li>
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-green-500 rounded-full mt-2" />{t("statistics.trend2")}</li>
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />{t("statistics.trend3")}</li>
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />{t("statistics.trend4")}</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">{t("statistics.regulatoryTitle")}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-red-500 rounded-full mt-2" />{t("statistics.regulatory1")}</li>
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />{t("statistics.regulatory2")}</li>
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-green-500 rounded-full mt-2" />{t("statistics.regulatory3")}</li>
                  <li className="flex items-start gap-3"><div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />{t("statistics.regulatory4")}</li>
                </ul>
              </div>
            </div>

            <p dangerouslySetInnerHTML={{ __html: t.raw("statistics.regulatoryNote") }} />
          </div>
        </div>
      </section>

      {/* 11. Глоссарий */}
      <section className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("glossaryTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {glossaryItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-blue-600 text-lg mb-3">{item.term}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Сравнение ставок */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          {t("ratesComparisonTitle")}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full" />
        </h2>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <h3 className="text-xl font-semibold text-center">{t("ratesComparison.subtitle")}</h3>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-2">{t("ratesComparison.firstLoan.rate")}</div>
                <div className="text-gray-700 font-medium mb-2">{t("ratesComparison.firstLoan.title")}</div>
                <div className="text-sm text-gray-600">{t("ratesComparison.firstLoan.description")}</div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600 mb-2">{t("ratesComparison.repeatLoan.rate")}</div>
                <div className="text-gray-700 font-medium mb-2">{t("ratesComparison.repeatLoan.title")}</div>
                <div className="text-sm text-gray-600">{t("ratesComparison.repeatLoan.description")}</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-2">{t("ratesComparison.riskyLoan.rate")}</div>
                <div className="text-gray-700 font-medium mb-2">{t("ratesComparison.riskyLoan.title")}</div>
                <div className="text-sm text-gray-600">{t("ratesComparison.riskyLoan.description")}</div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                {t("ratesComparison.exampleTitle")}
              </h4>
              <div className="space-y-3 text-blue-700">
                <div className="flex justify-between items-center">
                  <span>{t("ratesComparison.amount")}</span>
                  <span className="font-semibold">5 000 ₴</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t("ratesComparison.term")}</span>
                  <span className="font-semibold">30 {t("days")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t("ratesComparison.rate")}</span>
                  <span className="font-semibold">1%</span>
                </div>
                <div className="border-t border-blue-200 pt-3 flex justify-between items-center font-bold text-lg">
                  <span>{t("ratesComparison.toReturn")}</span>
                  <span>6 500 ₴</span>
                </div>
                <div className="text-sm text-blue-600">
                  {t("ratesComparison.overpayment")}: 1 500 ₴ (30%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}