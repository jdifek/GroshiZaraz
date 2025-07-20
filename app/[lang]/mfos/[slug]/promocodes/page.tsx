"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PromoCodesPage() {
  const promos = [
    {
      code: "HURMA1000",
      description: "Скидка 1000₽ на первый займ",
      conditions: "Для новых клиентов. Минимальная сумма — 10 000₽.",
      link: "https://hurmacredit.ru",
    },
    {
      code: "FASTZERO",
      description: "0% на 10 дней",
      conditions: "Только для займов до 15 000₽.",
      link: "https://hurmacredit.ru",
    },
    {
      code: "SUMMER15",
      description: "Скидка 15% на комиссию",
      conditions: "Действительно до 31 августа.",
      link: "https://hurmacredit.ru",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Актуальные промокоды</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((promo, index) => (
          <div key={index} className="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Промокод: <span className="text-blue-600">{promo.code}</span>
              </h3>
              <p className="text-gray-700 mb-1">{promo.description}</p>
              <p className="text-sm text-gray-500">{promo.conditions}</p>
            </div>

            <Link
              href={promo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl px-4 py-2 transition"
            >
              Перейти в Hurma Credit
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
