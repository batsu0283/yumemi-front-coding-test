import { populationCategories } from "../../utils/constants";

type PopulationCategorySelectorProps = {
  selectedPopulationCategory: string;
  handlePopulationCategoryChange: (value: string) => void;
};

export const PopulationCategorySelector = ({
  selectedPopulationCategory,
  handlePopulationCategoryChange,
}: PopulationCategorySelectorProps) => (
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
);
