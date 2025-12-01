'use client'
import { Info } from "lucide-react";
interface InfoButtonProps {
  onClick?: () => void;
}

export const InfoButton: React.FC<InfoButtonProps> = ({ onClick }) => {
  return (
    <button
    onClick={onClick}

      className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
      title="Подробнее"
    >
      <Info className="w-5 h-5" />
    </button>
  );
};
