
import Link from "next/link";

export const GrayToBlueButton = ({
  text,
  link,
}: {
  text: string;
  link?: string;
}) => {
  const classes =
    "cursor-pointer w-full bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 text-center block";

  return link ? (
    <Link href={link} className={classes}>
      {text}
    </Link>
  ) : (
    <button className={classes}>{text}</button>
  );
};
