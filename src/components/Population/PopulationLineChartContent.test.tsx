import { render } from "@testing-library/react";
import type { Populations } from "../../hooks/usePopulations";
import type {
  PopulationCategoriesValue,
  PrefCode,
} from "../../utils/constants";
import type { Prefecture } from "../../utils/resasApi";
import { PopulationLineChartContent } from "./PopulationLineChartContent";

vi.mock("recharts", async () => {
  const actual = await vi.importActual<typeof import("recharts")>("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
      <actual.ResponsiveContainer width={500} height={500}>
        {children}
      </actual.ResponsiveContainer>
    ),
  };
});
describe("PopulationLineChartContent", () => {
  const mockPopulations: Populations = {
    total: [
      { year: 2020, 1: 1000, 2: 1500 },
      { year: 2021, 1: 1100, 2: 1600 },
    ],
    young: [
      { year: 2020, 1: 200, 2: 300 },
      { year: 2021, 1: 210, 2: 310 },
    ],
    workingAge: [
      { year: 2020, 1: 600, 2: 900 },
      { year: 2021, 1: 610, 2: 910 },
    ],
    elderly: [
      { year: 2020, 1: 200, 2: 300 },
      { year: 2021, 1: 210, 2: 310 },
    ],
  };

  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];

  const mockCheckedPrefectures = new Set<PrefCode>([1, 2]);
  const selectedPopulationCategory: PopulationCategoriesValue = "total";
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
  it("正常にレンダリングされること", () => {
    const { container } = render(
      <PopulationLineChartContent
        populations={mockPopulations}
        selectedPopulationCategory={selectedPopulationCategory}
        checkedPrefectures={mockCheckedPrefectures}
        prefectures={mockPrefectures}
      />,
    );
    const rechartsContainer = container.querySelector(
      ".recharts-responsive-container",
    );
    expect(rechartsContainer).toBeInTheDocument();
  });

  it("XAxis、YAxis、Legendがレンダリングされること", () => {
    const { container } = render(
      <PopulationLineChartContent
        populations={mockPopulations}
        selectedPopulationCategory={selectedPopulationCategory}
        checkedPrefectures={mockCheckedPrefectures}
        prefectures={mockPrefectures}
      />,
    );
    expect(
      container.querySelector(".recharts-cartesian-axis.xAxis"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".recharts-cartesian-axis.yAxis"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".recharts-legend-wrapper"),
    ).toBeInTheDocument();
  });

  it("Lineの数がcheckedPrefecturesの個数と合うこと", () => {
    const { container } = render(
      <PopulationLineChartContent
        populations={mockPopulations}
        selectedPopulationCategory={selectedPopulationCategory}
        checkedPrefectures={mockCheckedPrefectures}
        prefectures={mockPrefectures}
      />,
    );
    const lines = container.querySelectorAll(".recharts-line");
    expect(lines).toHaveLength(mockCheckedPrefectures.size);
  });

  it("Snapshot", () => {
    const { container } = render(
      <PopulationLineChartContent
        populations={mockPopulations}
        selectedPopulationCategory={selectedPopulationCategory}
        checkedPrefectures={mockCheckedPrefectures}
        prefectures={mockPrefectures}
      />,
    );
    // innerHTMLを使ってランダムな属性を除外
    expect(container.innerHTML).toMatchSnapshot();
  });
});
