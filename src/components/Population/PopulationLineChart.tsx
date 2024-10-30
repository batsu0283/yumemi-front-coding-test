import {} from "recharts";
import { usePopulationCategories } from "../../hooks/usePopulationCategories";
import type { Populations } from "../../hooks/usePopulations";
import type { PrefCode } from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";
import { PopulationCategorySelector } from "./PopulationCategorySelector";
import { PopulationLineChartContent } from "./PopulationLineChartContent";

type PopulationLineChartProps = {
  prefectures: Prefecture[];
  populations: Populations;
  checkedPrefectures: Set<PrefCode>;
};

export const PrefecturePopulationChart = ({
  prefectures,
  populations,
  checkedPrefectures,
}: PopulationLineChartProps) => {
  const { selectedPopulationCategory, handlePopulationCategoryChange } =
    usePopulationCategories();

  return (
    <section className="mt-5 mb-10">
      <PopulationCategorySelector
        selectedPopulationCategory={selectedPopulationCategory}
        handlePopulationCategoryChange={handlePopulationCategoryChange}
      />
      <PopulationLineChartContent
        populations={populations}
        selectedPopulationCategory={selectedPopulationCategory}
        checkedPrefectures={checkedPrefectures}
        prefectures={prefectures}
      />
    </section>
  );
};
