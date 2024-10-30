import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PopulationCategoriesValue } from "../../hooks/usePopulationCategories";
import type { Populations } from "../../hooks/usePopulations";
import {
  type PrefCode,
  populationCategories,
  prefectureColors,
} from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";

type PopulationLineChartProps = {
  prefectures: Prefecture[];
  selectedPopulationCategory: PopulationCategoriesValue;
  handlePopulationCategoryChange: (targetValue: string) => void;
  populations: Populations;
  checkedPrefectures: Set<PrefCode>;
};

export const PopulationLineChart = ({
  prefectures,
  selectedPopulationCategory,
  handlePopulationCategoryChange,
  populations,
  checkedPrefectures,
}: PopulationLineChartProps) => (
  <section className="mt-5 mb-10">
    <label className="block text-gray-700 mb-2">
      表示するデータを選択
    <select
      value={selectedPopulationCategory}
      onChange={(e) => handlePopulationCategoryChange(e.target.value)}
      className="block w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
    >
      {populationCategories.map((populationCategory) => (
        <option key={populationCategory.value} value={populationCategory.value}>
          {populationCategory.label}
        </option>
      ))}
    </select>
    </label>
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={populations[selectedPopulationCategory]}
        margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        {Array.from(checkedPrefectures).map((prefCode) => (
          <Line
            key={prefCode}
            type="linear"
            dataKey={prefCode}
            stroke={prefectureColors[prefCode]}
            name={
              prefectures.find((pref) => pref.prefCode === prefCode)?.prefName
            }
            unit="人"
          />
        ))}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  </section>
);
