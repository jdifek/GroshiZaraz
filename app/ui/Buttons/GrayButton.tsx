type GrayToGrayButtonProps = {
  text: string;
};
export const GrayButton: React.FC<GrayToGrayButtonProps> = ({
  text,
}) => {
  return (
    <button className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-200">
    {text}
  </button>
  )
};
