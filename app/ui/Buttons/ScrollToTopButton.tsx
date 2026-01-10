"use client";

import React from "react";

type ScrollToTopButtonProps = {
  text: string;
};

export default function ScrollToTopButton({ text }: ScrollToTopButtonProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
    >
      {text}
    </button>
  );
}