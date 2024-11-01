import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { usePopulationCategories } from "../../hooks/usePopulationCategories";
import type { Populations } from "../../hooks/usePopulations";
import type { PrefCode } from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";
import { PopulationChart } from "./PopulationLineChart";

vi.mock("../../hooks/usePopulationCategories");

describe("PrefecturePopulationChart", () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];

  const mockPopulations: Populations = {
    total: [{ year: 2020, 1: 1000, 2: 1500 }],
    young: [{ year: 2020, 1: 200, 2: 300 }],
    workingAge: [{ year: 2020, 1: 600, 2: 900 }],
    elderly: [{ year: 2020, 1: 200, 2: 300 }],
  };

  const mockCheckedPrefectures = new Set<PrefCode>([1, 2]);

  const mockedUsePopulationCategories = vi.mocked(usePopulationCategories);
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeAll(() => {
    globalThis.ResizeObserver = class ResizeObserver {
      observe() {
        console.log("observe");
      }
      unobserve() {
        console.log("unobserve");
      }
      disconnect() {
        console.log("disconnect");
      }
    };
  });

  it("PopulationCategorySelector と PopulationLineChartContent が表示されること", () => {
    mockedUsePopulationCategories.mockReturnValue({
      selectedPopulationCategory: "total",
      handlePopulationCategoryChange: vi.fn(),
    });
    const { container } = render(
      <PopulationChart
        prefectures={mockPrefectures}
        populations={mockPopulations}
        checkedPrefectures={mockCheckedPrefectures}
      />,
    );
    expect(screen.getByText("表示するデータを選択")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    const rechartsContainer = container.querySelector(
      ".recharts-responsive-container",
    );
    expect(rechartsContainer).toBeInTheDocument();
  });

  it("カテゴリ変更時に handlePopulationCategoryChange が呼ばれること", () => {
    const mockHandlePopulationCategoryChange = vi.fn();
    mockedUsePopulationCategories.mockReturnValue({
      selectedPopulationCategory: "total",
      handlePopulationCategoryChange: mockHandlePopulationCategoryChange,
    });
    render(
      <PopulationChart
        prefectures={mockPrefectures}
        populations={mockPopulations}
        checkedPrefectures={mockCheckedPrefectures}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "young" } });

    expect(mockHandlePopulationCategoryChange).toHaveBeenCalledWith("young");
    expect(mockHandlePopulationCategoryChange).toHaveBeenCalledTimes(1);
  });

  it("Snapshot", () => {
    const mockHandlePopulationCategoryChange = vi.fn();
    mockedUsePopulationCategories.mockReturnValue({
      selectedPopulationCategory: "total",
      handlePopulationCategoryChange: mockHandlePopulationCategoryChange,
    });
    const { container } = render(
      <PopulationChart
        prefectures={mockPrefectures}
        populations={mockPopulations}
        checkedPrefectures={mockCheckedPrefectures}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
