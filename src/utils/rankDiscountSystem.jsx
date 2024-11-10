const RANK_THRESHOLDS = {
  Bronze: 0,
  Silver: 5000,
  Gold: 10000,
  Emerald: 20000,
  Diamond: 40000,
};

const RANK_DISCOUNTS = {
  Bronze: 0,
  Silver: 0.05, // 5% discount
  Gold: 0.1, // 10% discount
  Emerald: 0.15, // 15% discount
  Diamond: 0.2, // 20% discount
};

export const calculateRank = (points) => {
  if (points >= RANK_THRESHOLDS.Diamond) return "Diamond";
  if (points >= RANK_THRESHOLDS.Emerald) return "Emerald";
  if (points >= RANK_THRESHOLDS.Gold) return "Gold";
  if (points >= RANK_THRESHOLDS.Silver) return "Silver";
  return "Bronze";
};

export const getRankDiscount = (rank) => {
  return RANK_DISCOUNTS[rank] || 0;
};

const RankDiscountDisplay = ({ points, rankDiscount }) => {
  const rank = calculateRank(points);
  const discountPercentage = (rankDiscount * 100).toFixed(0);

  return (
    <div className="rank-discount-container bg-gray-100 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Your Rank:</span>
          <span className={`badge ${getRankColorClass(rank)} text-white`}>
            {rank}
          </span>
        </div>
        <div className="text-right">
          <span className="font-semibold">Rank Discount:</span>
          <span className="ml-2 text-green-600">-{discountPercentage}%</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Points: {points.toLocaleString()}
      </div>
    </div>
  );
};

const getRankColorClass = (rank) => {
  const colors = {
    Bronze: "bg-amber-700",
    Silver: "bg-gray-400",
    Gold: "bg-yellow-500",
    Emerald: "bg-emerald-500",
    Diamond: "bg-blue-500",
  };
  return colors[rank] || "bg-gray-500";
};

export { RankDiscountDisplay };
