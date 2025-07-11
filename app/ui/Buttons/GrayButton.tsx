type BlueButtonProps = {
  text: string;
};
export const GrayButton: React.FC<BlueButtonProps> = ({
  text,
}) => {
  return (
    <button className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-200">
    {text}
  </button>
  )
};
