import React from "react";
type ReviewCardProps = {
  review: {
    initials: string;
    company: string;
    reviewer: string;
    date: string;
    color: string;
    title: string;
    text: string;
  };
  index: number;
};
const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:shadow-xl hover:border-blue-500 transition duration-300 relative overflow-hidden animate-fade-in"
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 animate-[shimmer_3s_infinite_linear]" />
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${review.color}`}
        >
          {review.initials}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-sm">
            {review.company}
          </div>
          <div className="text-gray-500 text-xs flex items-center gap-2">
            <div className="flex text-yellow-400 text-sm">★★★★★</div>
            <span>
              {review.reviewer} • {review.date}
            </span>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-snug">
        {review.title}
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed relative pl-4">
        <span className="text-blue-100 text-5xl absolute -top-4 -left-2 leading-none">
          “
        </span>
        {review.text}
      </p>
    </div>
  );
};

export default ReviewCard;
