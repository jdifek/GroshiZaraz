'use client';

import Link from "next/link";

type BlueButtonProps = {
  text: string;
  link?: string;
  onClick?: () => void;
};

export const BlueButton: React.FC<BlueButtonProps> = ({ text, link, onClick }) => {
  if (link) {
    return (
      <Link
        href={link}
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 inline-block"
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200"
    >
      {text}
    </button>
  );
};
