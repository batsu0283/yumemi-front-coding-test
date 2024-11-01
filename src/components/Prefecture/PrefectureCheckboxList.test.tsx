import { fireEvent, render, screen } from "@testing-library/react";
import type { PrefCode } from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";
import { PrefectureCheckboxList } from "./PrefectureCheckboxList";

describe("PrefectureCheckboxList", () => {
  const mockHandlePrefectureCheckBoxChange = vi.fn();

  const prefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 3, prefName: "岩手県" },
  ];

  const checkedPrefectures = new Set<PrefCode>([1]);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("都道府県のチェックボックスがすべて表示されること", () => {
    render(
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureCheckBoxChange={mockHandlePrefectureCheckBoxChange}
      />,
    );

    for (const prefecture of prefectures) {
      expect(
        screen.getByLabelText(`都道府県 ${prefecture.prefName} を選択`),
      ).toBeInTheDocument();
    }
  });

  it("checkedPrefecturesに基づいてチェックボックスが正しくチェックされること", () => {
    render(
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureCheckBoxChange={mockHandlePrefectureCheckBoxChange}
      />,
    );

    expect(screen.getByLabelText("都道府県 北海道 を選択")).toBeChecked();
    expect(screen.getByLabelText("都道府県 青森県 を選択")).not.toBeChecked();
    expect(screen.getByLabelText("都道府県 岩手県 を選択")).not.toBeChecked();
  });

  it("チェックボックスがクリックされた時に handlePrefectureCheckBoxChange が呼ばれること", () => {
    render(
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureCheckBoxChange={mockHandlePrefectureCheckBoxChange}
      />,
    );

    const checkbox = screen.getByLabelText("都道府県 岩手県 を選択");

    fireEvent.click(checkbox);
    expect(mockHandlePrefectureCheckBoxChange).toHaveBeenCalledWith(3);
    expect(mockHandlePrefectureCheckBoxChange).toHaveBeenCalledTimes(1);
  });

  it("Snapshot", () => {
    const { container } = render(
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureCheckBoxChange={mockHandlePrefectureCheckBoxChange}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
