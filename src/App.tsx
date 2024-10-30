import { PopulationLineChart } from "./components/Population/PopulationLineChart";
import { PrefectureCheckboxList } from "./components/Prefecture/PrefectureCheckboxList";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Main } from "./components/layout/Main";
import { usePopulationCategories } from "./hooks/usePopulationCategories";
import { usePopulations } from "./hooks/usePopulations";
import { usePrefectures } from "./hooks/usePrefectures";

export const App = () => {
  const { prefectures, isError } = usePrefectures();
  const { checkedPrefectures, populations, handlePrefectureCheckBox } =
    usePopulations();
  const { selectedPopulationCategory, handlePopulationCategoryChange } =
    usePopulationCategories();

  if (isError) return <div>都道府県情報の取得に失敗しました。</div>;
  return (
    <>
      <Header title="ゆめみフロントエンドコーディングテスト" />
      <Main>
        <PrefectureCheckboxList
          prefectures={prefectures}
          checkedPrefectures={checkedPrefectures}
          handlePrefectureCheckBox={handlePrefectureCheckBox}
        />
        <PopulationLineChart
          prefectures={prefectures}
          selectedPopulationCategory={selectedPopulationCategory}
          handlePopulationCategoryChange={handlePopulationCategoryChange}
          populations={populations}
          checkedPrefectures={checkedPrefectures}
        />
      </Main>
      <Footer />
    </>
  );
};
