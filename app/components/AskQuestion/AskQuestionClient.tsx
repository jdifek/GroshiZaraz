"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import SiteQuestionService from "@/app/services/siteQuestion/SiteQuestionService";

interface UserQuestion {
  id: number;
  question: string | undefined;
  author: string;
  date: string;
  category: string;
  hasAnswer: boolean | undefined;
  answersCount: number;
  icon: string;
  color: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  icon: string;
  color: string;
}

interface Props {
  initialUserQuestions: UserQuestion[];
  initialFaqData: FAQItem[];
  categories: string[];
  lang: string;
}

export function AskQuestionClient({
  initialUserQuestions,
  initialFaqData,
  categories,
  lang,
}: Props) {
  const router = useRouter();
  const t = useTranslations("AskQuestionPage");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(t("categories.all"));
  const [faqVisibleCount, setFaqVisibleCount] = useState(6);
  const [userQuestionsVisibleCount, setUserQuestionsVisibleCount] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    text: "",
  });

  const [faqItems, setFaqItems] = useState(initialFaqData);

  const filteredFAQ = faqItems.filter(
    (item) =>
      selectedFilter === t("categories.all") || item.category === selectedFilter
  );

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, email, subject, category, text } = formData;

    if (!name || !email || !subject || !category || !text) {
      toast.error(t("form.validation.fillAll"));
      return;
    }

    try {
      await SiteQuestionService.create({
        name: name,
        email,
        subject,
        category,
        textOriginal: text,
      });

      toast.success(t("form.success"));
      setIsModalOpen(false);
      setFormData({ name: "", email: "", subject: "", category: "", text: "" });
      router.refresh();
    } catch (error) {
      console.error("Ошибка при отправке вопроса:", error);
      toast.error(t("form.error"));
    }
  };

  const toggleFAQ = (id: number) => {
    setFaqItems(
      faqItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const handleQuestionClick = (id: number) => {
    router.push(`/${lang}/ask-question/${id}`);
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <div></div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r cursor-pointer from-blue-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span className="text-xl">?</span>
          {t("buttons.askQuestion")}
        </button>
      </div>

      {/* User Questions Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("userQuestions.title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("userQuestions.subtitle")}
          </p>
        </div>

        <div className="grid gap-4">
          {initialUserQuestions
            .slice(0, userQuestionsVisibleCount)
            .map((question, index) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${question.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    {question.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        {question.author}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-400">
                        {new Date(question.date).toLocaleString(
                          lang === "ru" ? "ru-RU" : "uk-UA",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium bg-gradient-to-r ${question.color} text-white`}
                      >
                        {question.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-3 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {question.question}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm px-3 py-1 rounded-full font-medium ${
                            question.hasAnswer
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {question.hasAnswer
                            ? `✅ ${t("userQuestions.hasAnswer")}`
                            : `⏳ ${t("userQuestions.waitingAnswer")}`}
                        </span>

                        {question.answersCount > 0 && (
                          <span className="text-sm text-gray-500">
                            {question.answersCount}{" "}
                            {t("userQuestions.answersCount", {
                              count: question.answersCount,
                            })}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleQuestionClick(question.id)}
                        className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        {t("buttons.answers")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {userQuestionsVisibleCount < initialUserQuestions.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setUserQuestionsVisibleCount((prev) => prev + 3)}
              className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {t("buttons.showMore", { count: 3 })}
            </button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t("popularQuestions.title")}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("popularQuestions.subtitle")}
          </p>
        </div>

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
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedFilter(category);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl text-gray-700 transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 mt-3">
          {filteredFAQ.slice(0, faqVisibleCount).map((item, index) => (
            <div
              key={item.id}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full duration-700 ease-in-out p-6 text-left cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ease-in-out ${item.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {item.question}
                    </h3>
                    <span
                      className={`text-xs bg-gradient-to-r ${item.color} text-white px-3 py-1 rounded-full font-medium`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${
                        item.isOpen ? "rotate-180" : ""
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
                  </div>
                </button>

                {item.isOpen && (
                  <div className="px-6 pb-6">
                    <div className="ml-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {faqVisibleCount < filteredFAQ.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setFaqVisibleCount((prev) => prev + 6)}
              className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {t("buttons.showMore", { count: 6 })}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full scrollbar-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {t("form.title")}
              </h3>
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
                  {t("form.fields.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("form.placeholders.name")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("form.fields.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("form.placeholders.email")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("form.fields.subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("form.placeholders.subject")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("form.fields.category")}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t("form.placeholders.category")}</option>
                  <option value={t("categories.application")}>
                    {t("categories.application")}
                  </option>
                  <option value={t("categories.terms")}>
                    {t("categories.terms")}
                  </option>
                  <option value={t("categories.documents")}>
                    {t("categories.documents")}
                  </option>
                  <option value={t("categories.creditHistory")}>
                    {t("categories.creditHistory")}
                  </option>
                  <option value={t("categories.cost")}>
                    {t("categories.cost")}
                  </option>
                  <option value={t("categories.repayment")}>
                    {t("categories.repayment")}
                  </option>
                  <option value={t("categories.repaymentProblems")}>
                    {t("categories.repaymentProblems")}
                  </option>
                  <option value={t("categories.security")}>
                    {t("categories.security")}
                  </option>
                  <option value={t("categories.workingHours")}>
                    {t("categories.workingHours")}
                  </option>
                  <option value={t("form.categoryOther")}>
                    {t("form.categoryOther")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("form.fields.question")}
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={t("form.placeholders.question")}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t("form.submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}