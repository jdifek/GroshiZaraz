import React from "react";

export interface Service {
  id: string | number;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <div
      className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        index < 4 ? "animate-fade-in" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
        <div
          className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}
        >
          {service.icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight">
          {service.name}
        </h3>
        <div className="mt-2 text-center h-[2px]">
          <div
            className={`w-full h-0.5 rounded-full transition-opacity duration-300 bg-gradient-to-r from-blue-500 to-yellow-400 opacity-0 group-hover:opacity-100`}
          ></div>
        </div>
      </div>
    </div>
  );
};


export default ServiceCard;
