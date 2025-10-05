"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface CopyLinkButtonProps {
  link?: string;
}

export default function CopyLinkButton({ link }: CopyLinkButtonProps) {
  const [currentLink, setCurrentLink] = useState("");
  const t = useTranslations("CopyLinkButton"); // namespace в переводах

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentLink(link || window.location.href);
    }
  }, [link]);

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error(t("unsupportedBrowser"));
      return;
    }

    navigator.clipboard
      .writeText(currentLink)
      .then(() => toast.success(t("copied")))
      .catch(() => toast.error(t("copyFailed")));
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t("ariaLabel")}
      title={t("title")}
      className="w-10 cursor-pointer h-10 md:w-12 md:h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg text-sm md:text-base"
    >
      <span aria-hidden="true">🔗</span>
    </button>
  );
}
