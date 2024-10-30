import type { PrefCode } from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";
import { PrefectureCheckbox } from "./PrefectureCheckbox";

type PrefectureCheckboxListProps = {
  prefectures: Prefecture[];
  checkedPrefectures: Set<PrefCode>;
  handlePrefectureCheckBox: (prefCode: PrefCode) => void;
};

export const PrefectureCheckboxList = ({
  prefectures,
  checkedPrefectures,
  handlePrefectureCheckBox,
}: PrefectureCheckboxListProps) => (
  <section>
    <h2 className="text-xl font-bold mb-4">都道府県人口</h2>
    <fieldset className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
      <legend className="sr-only">都道府県の選択</legend>
      {prefectures.map((prefecture) => (
        <PrefectureCheckbox
          key={prefecture.prefCode}
          prefCode={prefecture.prefCode}
          prefName={prefecture.prefName}
          checked={checkedPrefectures.has(prefecture.prefCode)}
          handlePrefectureCheckBox={handlePrefectureCheckBox}
        />
      ))}
    </fieldset>
  </section>
);
