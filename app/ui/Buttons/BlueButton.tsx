"use client";

import { Link } from "@/app/i18n/navigation";

type BlueButtonProps = {
  text: string;
  link?: string;
  className?: string;
  onClick?: () => void;
};

export const BlueButton: React.FC<BlueButtonProps> = ({
  text,
  className,
  link,
  onClick,
}) => {
  if (link) {
    return (
      <Link
        href={link}
        className={`${className} cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 inline-block`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 ${className}`}
    >
      {text}
    </button>
  );
};
