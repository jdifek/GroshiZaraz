import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="bg-white w-full h-[50px] flex items-center justify-between px-[10px] sm:px-[120px]">
      <div className="flex items-center gap-[30px]">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[#1A4D8F] hover:text-[#00AEEF] transition-colors"
        >
          Groshi<span className="text-[#00AEEF]">Zaraz</span>
        </Link>
        <Link href="/mfo"></Link>
      </div>

      <Search size={20} className="text-gray-600" />
    </header>
  );
};

export default Header;