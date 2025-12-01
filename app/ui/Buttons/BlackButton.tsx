'use client'
type BlackButtonProps = {
  text: string;
};
export const BlackButton: React.FC<BlackButtonProps> = ({ text }) => {
  return (
    <button className="bg-black cursor-pointer hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
      {text}
    </button>
  );
};
