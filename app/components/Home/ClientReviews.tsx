import React from "react";
import ReviewCard from "../Reviews/ReviewCard";
import StatCard from "../Reviews/StatCard";
import { BlueButton } from "@/app/ui/Buttons/BlueButton";

const reviews = [
  {
    initials: "КМ",
    company: "КарМани",
    reviewer: "Дарья Т.",
    date: "09.07",
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
    title: "Превосходное обслуживание",
    text: "Оформила заявку через мобильное приложение - все интуитивно понятно. Консультант подробно объяснил условия и помог выбрать оптимальный тариф. Деньги поступили в тот же день. Очень довольна сервисом!",
  },
  {
    initials: "Б",
    company: "Быстра",
    reviewer: "Дмитрий С.",
    date: "08.07",
    color: "bg-gradient-to-br from-zinc-900 to-neutral-700",
    title: "Быстро и надежно",
    text: "Попал в сложную ситуацию, срочно нужны были деньги. Здесь помогли без лишних вопросов и бюрократии. Онлайн-заявка, быстрое одобрение, перевод на карту за 15 минут. Рекомендую!",
  },
  {
    initials: "А",
    company: "АДеньги",
    reviewer: "Дарина Щ.",
    date: "08.07",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    title: "Честные условия",
    text: "Прозрачные условия, без скрытых комиссий. Удобная система продления, лояльная поддержка. Пользуюсь уже второй год - всегда помогают решить любые вопросы быстро и профессионально.",
  },
  {
    initials: "Ц",
    company: "Центрофинанс",
    reviewer: "Ирина З.",
    date: "08.07",
    color: "bg-gradient-to-br from-orange-500 to-orange-400",
    title: "Отличный первый опыт",
    text: "Первый раз брала микрозайм - переживала. Но здесь все прошло гладко: понятная анкета, быстрое решение, деньги на карте через полчаса. Личный кабинет удобный, можно отслеживать все операции.",
  },
];

const stats = [
  { label: "Довольных клиентов", value: "98%", color: "text-blue-500" },
  { label: "Минут на одобрение", value: "15", color: "text-yellow-400" },
  { label: "Выданных займов", value: "50K+", color: "text-blue-500" },
  { label: "Поддержка клиентов", value: "24/7", color: "text-yellow-400" },
];

const ClientReviews = () => {
  return (
    <div className="min-h-screen  py-16 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:rounded after:bg-gradient-to-r after:from-blue-500 after:to-yellow-400">
            Отзывы наших клиентов
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            Мы гордимся доверием наших клиентов и стремимся превосходить их
            ожидания каждый день
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} index={i} />
          ))}
        </div>

        <div className="text-center space-x-4 ">

          <BlueButton link="reviews" text="Показать еще отзывы" />
        </div>
        <div className="mt-8 bg-white rounded-xl shadow-md px-8 py-6 flex flex-wrap justify-around items-center gap-6 border border-blue-100">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
