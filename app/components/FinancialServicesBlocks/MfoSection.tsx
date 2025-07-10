import { GrayButton } from "@/app/ui/Buttons/GrayButton";
import { MfoCard } from "./MfoCard";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";

export const MfoSection = () => {
  const mfoCompanies = [
    {
      id: 1,
      name: "Хурма Кредит",
      rating: 5.0,
      reviews: 1,
      logo: "🍊",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      id: 2,
      name: "Эквазайм",
      rating: 4.9,
      reviews: 13,
      logo: "🌊",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
    {
      id: 3,
      name: "Джой Мани",
      rating: 5.0,
      reviews: 55,
      logo: "💎",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 4,
      name: "БериБеру",
      rating: 5.0,
      reviews: 1,
      logo: "⚡",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      id: 5,
      name: "Финтерс",
      rating: 4.8,
      reviews: 17,
      logo: "💰",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      id: 6,
      name: "До зарплаты",
      rating: 4.3,
      reviews: 181,
      logo: "📊",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ];
  return (
    <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 relative inline-block">
        Микрофинансовые организации
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mfoCompanies.map((mfo, index) => (
        <MfoCard key={mfo.id} mfo={mfo} index={index} />
      ))}
    </div>

    <div className="text-center space-x-4">
      <GrayButton text="Показать ещё" />

      <BlueButton text="Показать все МФО" />
    </div>
  </div>
  )
}