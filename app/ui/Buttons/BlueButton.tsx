import Link from "next/link";

type GrayToGrayButtonProps = {
  text: string;
  link?: string;
};
export const BlueButton: React.FC<GrayToGrayButtonProps> = ({ text, link }) => {
  return (
    <>
      {link ? (
        <Link href={link} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200">
          {text}
        </Link>
      ) : (
        <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200">
          {text}
        </button>
      )}
    </>
  );
};
