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
import type { Populations } from "../../hooks/usePopulations";
import {
  type PopulationCategoriesValue,
  type PrefCode,
  prefectureColors,
} from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";

type PopulationLineChartContentProps = {
  populations: Populations;
  selectedPopulationCategory: PopulationCategoriesValue;
  checkedPrefectures: Set<PrefCode>;
  prefectures: Prefecture[];
};

export const PopulationLineChartContent = ({
  populations,
  selectedPopulationCategory,
  checkedPrefectures,
  prefectures,
}: PopulationLineChartContentProps) => (
  <ResponsiveContainer
    width="100%"
    height={500}
    data-testid="recharts-container"
  >
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
);
