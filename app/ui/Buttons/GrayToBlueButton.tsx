export const GrayToBlueButton = ({ text }: { text: string }) => {
  return (
    <button className="cursor-pointer w-full bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
      {text}
    </button>
  );
};
