"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

type Review =  {
  initials: string;
  companyKey: string;
  reviewer: string;
  date: string;
  color: string;
  title: string;
  text: string | undefined;
  rating: number;
}

type ReviewsClientProps = {
  reviews: Review[];
  lang: string;
};

const renderStars = (rating: number) => {
  return [...Array(5)].map((_, i) => (
    <span
      key={i}
      className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
    >
      ⭐
    </span>
  ));
};

const ReviewsClient = ({ reviews }: ReviewsClientProps) => {
  const t = useTranslations("ReviewsPage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(t("filters.all"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
    company: "",
  });

  // Преобразуем reviews с переводами


  const filterOptions = [
    t("filters.all"),
    t("filters.newest"),
    t("filters.oldest"),
    t("filters.highRating"),
    t("filters.lowRating"),
  ];



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.text && formData.company) {
      console.log("Отзыв отправлен:", formData);
      // Здесь будет API запрос для отправки отзыва
      setIsModalOpen(false);
      setFormData({ name: "", email: "", text: "", company: "" });
    } else {
      alert(t("form.error"));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white cursor-pointer border-2 border-gray-200 rounded-2xl px-6 py-3 flex items-center gap-3 hover:border-blue-300 transition-all duration-200 shadow-sm"
            >
              <span className="text-gray-700 font-medium">{selectedFilter}</span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 z-10">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Review Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">+</span>
            {t("addReview")}
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center gap-4 mb-6">
               
                <div>
                  <p className="text-gray-500 text-sm">
                    {review.reviewer} • {review.date}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                <div className="flex gap-1 mb-3">{renderStars(review.rating)}</div>
              </div>

              <p className="text-gray-600 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">98%</div>
              <div className="text-gray-600">{t("stats.satisfied")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">15</div>
              <div className="text-gray-600">{t("stats.approvalTime")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">50K+</div>
              <div className="text-gray-600">{t("stats.loansIssued")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-600">{t("stats.support")}</div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-40 backdrop-blur-2xl backdrop-brightness-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{t("modal.title")}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modal.nameLabel")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t("modal.namePlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modal.emailLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t("modal.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modal.companyLabel")}
                  </label>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t("modal.companyPlaceholder")}</option>
                    <option value="КарМани">{t("companies.karmani")}</option>
                    <option value="Быстра">{t("companies.bystra")}</option>
                    <option value="АДеньги">{t("companies.adengi")}</option>
                    <option value="Центрофинанс">{t("companies.centrofinance")}</option>
                    <option value="МиниЗайм">{t("companies.minizaim")}</option>
                    <option value="ФинКапитал">{t("companies.fincapital")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modal.textLabel")}
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={t("modal.textPlaceholder")}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {t("modal.submit")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsClient;