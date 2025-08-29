
import Link from "next/link";

type BlueButtonProps = {
  text: string;
  link?: string;

};
export const GrayButton: React.FC<BlueButtonProps> = ({
  text,
  link
}) => {
  return (
    <>
    {link ? (
      <Link href={link} className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-200">
        {text}
      </Link>
    ) : (
      <button className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-200">
      {text}
    </button>
    )}
  </>
  
  )
};
