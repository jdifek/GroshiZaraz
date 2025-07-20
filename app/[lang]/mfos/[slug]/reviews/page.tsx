
export default function ReviewsPage() {
  
  return (
    <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Отзывы о Hurma Credit
    </h2>
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Отзывы пока отсутствуют
      </h3>
      <p className="text-gray-600 mb-6">
        Станьте первым, кто оставит отзыв об этой компании
      </p>
      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
        Оставить отзыв
      </button>
    </div>
  </div>
  );
}
