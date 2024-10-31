import { fireEvent, render, screen } from "@testing-library/react";
import type { PrefCode } from "../../utils/constants";
import { PrefectureCheckbox } from "./PrefectureCheckbox";

describe("PrefectureCheckbox", () => {
  const mockHandleCheckboxChange = vi.fn();
  const prefCode: PrefCode = 1;
  const prefName = "北海道";

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("都道府県名が正しく表示されること", () => {
    render(
      <PrefectureCheckbox
        prefCode={prefCode}
        prefName={prefName}
        checked={false}
        handleCheckboxChange={mockHandleCheckboxChange}
      />,
    );
    expect(screen.getByText(prefName)).toBeInTheDocument();
    const checkbox = screen.getByRole("checkbox", {
      name: `都道府県 ${prefName} を選択`,
    });
    expect(checkbox).not.toBeChecked();
  });

  it("チェック状態が反映されること", () => {
    render(
      <PrefectureCheckbox
        prefCode={prefCode}
        prefName={prefName}
        checked={true}
        handleCheckboxChange={mockHandleCheckboxChange}
      />,
    );
    const checkbox = screen.getByRole("checkbox", {
      name: `都道府県 ${prefName} を選択`,
    });
    expect(checkbox).toBeChecked();
  });

  it("チェックボックスの状態が変わった時に handleCheckboxChange が呼ばれること", () => {
    render(
      <PrefectureCheckbox
        prefCode={prefCode}
        prefName={prefName}
        checked={false}
        handleCheckboxChange={mockHandleCheckboxChange}
      />,
    );
    const checkbox = screen.getByRole("checkbox", {
      name: `都道府県 ${prefName} を選択`,
    });

    fireEvent.click(checkbox);
    expect(mockHandleCheckboxChange).toHaveBeenCalledWith(prefCode);
    expect(mockHandleCheckboxChange).toHaveBeenCalledTimes(1);
  });

  it("Snapshot", () => {
    const { container } = render(
      <PrefectureCheckbox
        prefCode={prefCode}
        prefName={prefName}
        checked={false}
        handleCheckboxChange={mockHandleCheckboxChange}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
