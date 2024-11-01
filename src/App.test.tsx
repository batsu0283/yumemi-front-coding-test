import { render, screen } from "@testing-library/react";

import { App } from "./App";
import { type Populations, usePopulations } from "./hooks/usePopulations";
import { usePrefectures } from "./hooks/usePrefectures";

vi.mock("./hooks/usePrefectures");
vi.mock("./hooks/usePopulations");

describe("App Component", () => {
  const mockedUsePrefectures = vi.mocked(usePrefectures);
  const mockedUsePopulations = vi.mocked(usePopulations);
  const mockPopulations: Populations = {
    total: [{ year: 2020, 1: 1000, 2: 1500 }],
    young: [{ year: 2020, 1: 200, 2: 300 }],
    workingAge: [{ year: 2020, 1: 600, 2: 900 }],
    elderly: [{ year: 2020, 1: 200, 2: 300 }],
  };

  beforeEach(() => {
    mockedUsePrefectures.mockReturnValue({
      prefectures: [{ prefCode: 1, prefName: "北海道" }],
      isError: false,
    });

    mockedUsePopulations.mockReturnValue({
      checkedPrefectures: new Set([1]),
      populations: mockPopulations,
      handlePrefectureCheckBoxChange: vi.fn(),
    });
  });

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

  it("設定された値が画面上に描画される", () => {
    render(<App />);
    expect(
      screen.getByText("ゆめみフロントエンドコーディングテスト"),
    ).toBeInTheDocument();
    expect(screen.getByText("北海道")).toBeInTheDocument();
    expect(screen.getByText("batsu0283")).toBeInTheDocument();
  });

  it("都道府県取得がエラーの際にエラーメッセージが表示されること", () => {
    mockedUsePrefectures.mockReturnValue({
      prefectures: [],
      isError: true,
    });

    render(<App />);

    expect(
      screen.getByText("都道府県情報の取得に失敗しました。再度お試しください"),
    ).toBeInTheDocument();
  });
});
