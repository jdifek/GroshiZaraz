// components/StatCard.tsx
import React from "react";

type Stat = {
  value: string;
  label: string;
  color: string;
};

type StatCardProps = {
  stat: Stat;
};

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <div className="text-center min-w-[100px]">
      <span className={`block text-3xl font-bold ${stat.color}`}>
        {stat.value}
      </span>
      <span className="text-gray-600 text-sm font-medium">
        {stat.label}
      </span>
    </div>
  );
};

export default StatCard;
