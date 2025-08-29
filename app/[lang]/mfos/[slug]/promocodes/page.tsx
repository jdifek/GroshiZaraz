import MfoService from "@/app/services/mfos/mfosService";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function PromoCodesPage({ params }: { params: { slug: string } }) {
  let promoCodes = [];

  try {
    const { slug } = params;
    const response = await MfoService.getMfoBySlug(slug);
    promoCodes = response.promoCodes || [];
  } catch (error) {
    console.error("Error loading promo codes:", error);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Актуальные промокоды
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoCodes.length > 0 ? (
          promoCodes.map((promo: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Промокод: <span className="text-blue-600">{promo.code}</span>
                </h3>
                <p className="text-gray-700 mb-1">{promo.discount}</p>
                {promo.condition && (
                  <p className="text-sm text-gray-500">{promo.condition}</p>
                )}
              </div>

              {promo.link && (
                <Link
                  href={promo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl px-4 py-2 transition"
                >
                  Перейти
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">Промокоды не найдены.</p>
        )}
      </div>
    </div>
  );
}
