import { MfoCard, MfoCompany } from "./MfoCard";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";
import MfoService from "@/app/services/mfos/mfosService";

export const MfoSection = async () => {
  let mfos: MfoCompany[] = [];

  try {
    const response = await MfoService.getAllMfos();
console.log(response, 'res');

    mfos = response.map((mfo) => ({
      id: mfo.id,
      name: mfo.name,
      rating: mfo.rating,
      reviews: mfo.reviews,
      logo: mfo.logo || "🏦",
      slug:mfo.slug
    }));
  } catch (error) {
    console.error("Ошибка при загрузке МФО", error);
  }

  console.log(mfos, 'mfosmfos');


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
          Микрофинансовые организации
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mfos.map((mfo, index) => (
          <MfoCard key={mfo.id} mfo={mfo} index={index} />
        ))}
      </div>

      <div className="text-center space-x-4">
        <BlueButton link="/mfos" text="Показать еще МФО" />
      </div>
    </div>
  );
};
