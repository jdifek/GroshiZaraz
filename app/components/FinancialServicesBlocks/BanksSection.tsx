import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import BankCard from "./BankCard";

export const BanksSection = () => {
  const banks = [
    {
      id: 1,
      name: "Т-Банк (Тинькофф)",
      rating: 3.1,
      reviews: 995,
      logo: "Т",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    },
    {
      id: 2,
      name: "Совкомбанк",
      rating: 4.3,
      reviews: 857,
      logo: "С",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 3,
      name: "Альфа-Банк",
      rating: 3.5,
      reviews: 574,
      logo: "А",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      id: 4,
      name: "Ozon Банк",
      rating: 1.5,
      reviews: 454,
      logo: "O",
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
    },
    {
      id: 5,
      name: "Почта Банк",
      rating: 1.2,
      reviews: 261,
      logo: "П",
      color: "bg-gradient-to-br from-red-600 to-red-700",
    },
    {
      id: 6,
      name: "Сбербанк",
      rating: 2.6,
      reviews: 234,
      logo: "С",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
          Банки
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.map((bank, index) => (
          <BankCard key={bank.id} bank={bank} index={index} />
        ))}
      </div>

      <div className="text-center space-x-4">

        <BlueButton text="Показать ещё банки" />
      </div>
    </div>
  );
};
