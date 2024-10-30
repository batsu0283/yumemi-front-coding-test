import { memo } from "react";
import type { PrefCode } from "../../utils/constants";

type PrefectureCheckboxProps = {
  prefCode: PrefCode;
  prefName: string;
  checked: boolean;
  handlePrefectureCheckBox: (prefCode: PrefCode) => void;
};

export const PrefectureCheckbox = memo(
  ({
    prefCode,
    prefName,
    checked,
    handlePrefectureCheckBox,
  }: PrefectureCheckboxProps) => (
    <label className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow-sm">
      <input
        type="checkbox"
        className="w-5 h-5 text-cyan-600 focus:ring-cyan-500"
        checked={checked}
        onChange={() => handlePrefectureCheckBox(prefCode)}
        aria-label={`都道府県 ${prefName} を選択`}
      />
      <span className="text-gray-700">{prefName}</span>
    </label>
  ),
);
