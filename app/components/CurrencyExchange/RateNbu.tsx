import { Calendar } from "lucide-react";

export const RateNbu = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Учетная ставка НБУ
          </h3>
          <div className="text-3xl font-bold text-orange-600 mb-1">20%</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Действует с 09.06.2025</span>
          </div>
        </div>
        <div className="text-6xl opacity-20">🏦</div>
      </div>
    </div>
  );
};
