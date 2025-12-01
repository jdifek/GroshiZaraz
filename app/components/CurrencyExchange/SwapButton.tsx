'use client'
import { ArrowUpDown } from "lucide-react";
import React from "react";
type Props = {
  handleSwapCurrencies: () => Promise<void>;
};
export const SwapButton: React.FC<Props> = ({ handleSwapCurrencies }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleSwapCurrencies}
        className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group"
      >
        <ArrowUpDown className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
      </button>
    </div>
  );
};
