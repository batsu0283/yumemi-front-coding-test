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
import { usePopulationCategories } from "./hooks/usePopulationCategories";
import { usePopulations } from "./hooks/usePopulations";
import { usePrefectures } from "./hooks/usePrefectures";
import { populationCategories } from "./utils/constants";

export const App = () => {
  const { prefectures, isError } = usePrefectures();
  const { checkedPrefectures, populations, handlePrefectureCheckBox } =
    usePopulations();
  const { selectedPopulationCategory, handlePopulationCategoryChange } =
    usePopulationCategories();

  if (isError) return <div>都道府県情報の取得に失敗しました。</div>;
  return (
    <>
      <h1>都道府県一覧</h1>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <label>
              <input
                type="checkbox"
                checked={checkedPrefectures.has(prefecture.prefCode)}
                onChange={() => handlePrefectureCheckBox(prefecture.prefCode)}
              />
              {prefecture.prefName}
            </label>
          </li>
        ))}
      </ul>
      <select
        id="data-select"
        value={selectedPopulationCategory}
        onChange={(e) => handlePopulationCategoryChange(e.target.value)}
      >
        {populationCategories.map((populationCategory) => (
          <option
            key={populationCategory.value}
            value={populationCategory.value}
          >
            {populationCategory.label}
          </option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={
            selectedPopulationCategory === "total"
              ? populations.total
              : selectedPopulationCategory === "young"
                ? populations.young
                : selectedPopulationCategory === "workingAge"
                  ? populations.workingAge
                  : populations.elderly
          }
          margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          {Array.from(checkedPrefectures).map((prefCode) => (
            <Line
              key={prefCode}
              type="monotone"
              dataKey={String(prefCode)}
              stroke="#82ca9d"
              name={
                prefectures.find((pref) => pref.prefCode === prefCode)?.prefName
              }
              unit="人"
            />
          ))}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
