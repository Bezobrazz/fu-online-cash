export const StatisticsView = () => {
  return (
    <div className="p-4 bg-teal-100">
      <p className="font-bold text-lg text-green-700 mb-2">Продажі сьогодні</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-bold text-lg">7001.00₴</p>
          <p className="text-gray-400">Поточний залишок в касі</p>
        </div>
        <div className="mb-2">
          <p className="font-bold text-lg">0.00₴</p>
          <p className="text-gray-400">Всього продажів</p>
        </div>
        <div>
          <p className="font-bold text-lg">7001.00₴</p>
          <p className="text-gray-400">Готівка</p>
        </div>
        <div className="mb-2">
          <p className="font-bold text-lg">0.00₴</p>
          <p className="text-gray-400">Картка</p>
        </div>
        <div className="mb-2">
          <p className="font-bold text-lg">0</p>
          <p className="text-gray-400">Кількість продажів</p>
        </div>
      </div>
    </div>
  );
};
