"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  currentSort: string;
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("sortDropdown");

  const sortOptions: SortOption[] = [
    { value: "rating", label: t("rating") },
    { value: "rate", label: t("rate") },
    { value: "approval", label: t("approval") },
    { value: "responseTime", label: t("responseTime") },
    { value: "maxAmount", label: t("maxAmount") },
  ];

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortValue);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white cursor-pointer border-2 border-gray-200 rounded-2xl px-6 py-3 flex items-center gap-3 hover:border-blue-300 transition-all duration-200 shadow-sm"
      >
        <span className="text-gray-700 font-medium">
          {sortOptions.find((opt) => opt.value === currentSort)?.label || t("sortBy")}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
