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
  activeService: string | number | null;
  setActiveService: React.Dispatch<React.SetStateAction<string | number | null>>
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  activeService,
  setActiveService,
}) => {
  return (
    <div
      className={`group cursor-pointer transform hover:scale-105 transition-all duration-300 ${
        index < 4 ? "animate-fade-in" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setActiveService(service.id)}
      onMouseLeave={() => setActiveService(null)}
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
            className={`w-full h-0.5 rounded-full transition-opacity duration-300 ${
              activeService === service.id
                ? "bg-gradient-to-r from-blue-500 to-yellow-400 opacity-100 animate-pulse"
                : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
