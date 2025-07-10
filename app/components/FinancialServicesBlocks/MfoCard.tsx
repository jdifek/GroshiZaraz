// components/MfoCard.tsx
import React from "react";
import { GrayToBlueButton } from "@/app/ui/Buttons/GrayToBlueButton";
import { renderStars } from "@/app/utils/renderStars"; // адаптируй путь

export type MfoCompany = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  logo: React.ReactNode;
  color: string;
};

type MfoCardProps = {
  mfo: MfoCompany;
  index: number;
};

export const MfoCard: React.FC<MfoCardProps> = ({ mfo, index }) => {
  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 ${mfo.color} rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200`}
        >
          {mfo.logo}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-sm">{mfo.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{renderStars(mfo.rating)}</div>
            <span className="text-gray-800 font-semibold">{mfo.rating}</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-4">Отзывы: {mfo.reviews}</div>
      <GrayToBlueButton text="Задать вопрос" />
    </div>
  );
};
