'use client';

import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 flex items-center gap-2 group"
    >
      <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
      Назад
    </button>
  );
}