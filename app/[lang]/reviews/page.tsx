"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { use } from "react";

// Типизация для params
type ReviewsPageProps = {
  params: Promise<{ lang: string }>;
};

// Функция для асинхронного получения params
async function getResolvedParams(params: Promise<{ lang: string }>) {
  return await params;
}

const ReviewsPage = ({ params }: ReviewsPageProps) => {
  const { lang } = use(getResolvedParams(params));
  console.log(lang);
  
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

  const reviews = [
    {
      initials: "КМ",
      company: t("companies.karmani"),
      reviewer: "Дарья Т.",
      date: "09.07",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      title: t("reviews.karmani.title"),
      text: t("reviews.karmani.text"),
      rating: 5,
    },
    {
      initials: "Б",
      company: t("companies.bystra"),
      reviewer: "Дмитрий С.",
      date: "08.07",
      color: "bg-gradient-to-br from-zinc-900 to-neutral-700",
      title: t("reviews.bystra.title"),
      text: t("reviews.bystra.text"),
      rating: 5,
    },
    {
      initials: "А",
      company: t("companies.adengi"),
      reviewer: "Дарина Щ.",
      date: "08.07",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      title: t("reviews.adengi.title"),
      text: t("reviews.adengi.text"),
      rating: 5,
    },
    {
      initials: "Ц",
      company: t("companies.centrofinance"),
      reviewer: "Ирина З.",
      date: "08.07",
      color: "bg-gradient-to-br from-orange-500 to-orange-400",
      title: t("reviews.centrofinance.title"),
      text: t("reviews.centrofinance.text"),
      rating: 4,
    },
    {
      initials: "МЗ",
      company: t("companies.minizaim"),
      reviewer: "Андрей К.",
      date: "07.07",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      title: t("reviews.minizaim.title"),
      text: t("reviews.minizaim.text"),
      rating: 4,
    },
    {
      initials: "ФК",
      company: t("companies.fincapital"),
      reviewer: "Елена П.",
      date: "06.07",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      title: t("reviews.fincapital.title"),
      text: t("reviews.fincapital.text"),
      rating: 4,
    },
  ];

  const filterOptions = [
    t("filters.all"),
    t("filters.newest"),
    t("filters.oldest"),
    t("filters.highRating"),
    t("filters.lowRating"),
  ];

  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === t("filters.all")) return true;
    if (selectedFilter === t("filters.fiveStars")) return review.rating === 5;
    if (selectedFilter === t("filters.fourStars")) return review.rating === 4;
    if (selectedFilter === t("filters.threeStars")) return review.rating === 3;
    return review.company === selectedFilter;
  });

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
      setIsModalOpen(false);
      setFormData({ name: "", email: "", text: "", company: "" });
    } else {
      alert(t("form.error"));
    }
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
          {filteredReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 ${review.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md`}
                >
                  {review.initials}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{review.company}</h3>
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

export default ReviewsPage;