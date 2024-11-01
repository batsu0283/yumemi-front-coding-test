import { act, renderHook } from "@testing-library/react";
import type { PrefCode } from "../utils/constants";
import {
  type PopulationCompositionPerYearAPIResponce,
  resasApi,
} from "../utils/resasApi";
import { usePopulations } from "./usePopulations";

describe("usePopulations", () => {
  const initialMockResponse: PopulationCompositionPerYearAPIResponce = {
    message: null,
    result: {
      data: [
        { label: "総人口", data: [{ year: 2020, value: 1000 }] },
        { label: "年少人口", data: [{ year: 2020, value: 200 }] },
        { label: "生産年齢人口", data: [{ year: 2020, value: 600 }] },
        { label: "老年人口", data: [{ year: 2020, value: 200 }] },
      ],
    },
  };
  const updatedMockResponse: PopulationCompositionPerYearAPIResponce = {
    message: null,
    result: {
      data: [
        { label: "総人口", data: [{ year: 2020, value: 1500 }] },
        { label: "年少人口", data: [{ year: 2020, value: 300 }] },
        { label: "生産年齢人口", data: [{ year: 2020, value: 900 }] },
        { label: "老年人口", data: [{ year: 2020, value: 300 }] },
      ],
    },
  };
  const emptyMockResponse: PopulationCompositionPerYearAPIResponce = {
    message: null,
    result: {
      data: [],
    },
  };
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("stateが正しく初期化されていること", () => {
    const { result } = renderHook(() => usePopulations());
    expect(result.current.populations.total).toEqual([]);
    expect(result.current.populations.young).toEqual([]);
    expect(result.current.populations.workingAge).toEqual([]);
    expect(result.current.populations.elderly).toEqual([]);
    expect(result.current.checkedPrefectures.size).toBe(0);
  });

  describe("handlePrefectureCheckBoxChange", () => {
    it("複数回の操作でチェック済みの判定が正常であること", async () => {
      const { result } = renderHook(() => usePopulations());
      const prefCode: PrefCode = 1;
      vi.spyOn(resasApi, "getPopulationCompositionPerYear")
        .mockResolvedValueOnce(initialMockResponse)
        .mockResolvedValueOnce(updatedMockResponse);
      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(prefCode);
      });
      expect(result.current.checkedPrefectures.has(prefCode)).toBe(true);
      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(prefCode);
      });
      expect(result.current.checkedPrefectures.has(prefCode)).toBe(false);
      // 同じprefCodeで再度呼び出しても取得処理は呼ばれない
      expect(resasApi.getPopulationCompositionPerYear).toHaveBeenCalledTimes(1);
    });

    it("正常に人口データを取得し、状態が更新されること", async () => {
      const { result } = renderHook(() => usePopulations());
      const prefCode: PrefCode = 1;
      vi.spyOn(resasApi, "getPopulationCompositionPerYear")
        .mockResolvedValueOnce(initialMockResponse)
        .mockResolvedValueOnce(updatedMockResponse);
      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(prefCode);
      });

      expect(result.current.populations.total).toEqual([
        { year: 2020, [prefCode]: 1000 },
      ]);
      expect(result.current.populations.young).toEqual([
        { year: 2020, [prefCode]: 200 },
      ]);
      expect(result.current.populations.workingAge).toEqual([
        { year: 2020, [prefCode]: 600 },
      ]);
      expect(result.current.populations.elderly).toEqual([
        { year: 2020, [prefCode]: 200 },
      ]);
      const secondPrefCode: PrefCode = 2;
      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(secondPrefCode);
      });
      expect(result.current.populations.total).toEqual([
        { year: 2020, [prefCode]: 1000, [secondPrefCode]: 1500 },
      ]);
      expect(result.current.populations.young).toEqual([
        { year: 2020, [prefCode]: 200, [secondPrefCode]: 300 },
      ]);
      expect(result.current.populations.workingAge).toEqual([
        { year: 2020, [prefCode]: 600, [secondPrefCode]: 900 },
      ]);
      expect(result.current.populations.elderly).toEqual([
        { year: 2020, [prefCode]: 200, [secondPrefCode]: 300 },
      ]);
      expect(resasApi.getPopulationCompositionPerYear).toHaveBeenCalledTimes(2);
    });

    it("人口データ取得がエラーになった際にwindow.alertが表示されること", async () => {
      vi.spyOn(window, "alert").mockImplementation(() => {
        console.log("alertが呼び出されました");
      });
      vi.spyOn(resasApi, "getPopulationCompositionPerYear").mockRejectedValue(
        new Error("API error"),
      );

      const { result } = renderHook(() => usePopulations());
      const prefCode: PrefCode = 1;

      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(prefCode);
      });

      expect(window.alert).toHaveBeenCalledWith("データの取得に失敗しました");
    });

    it("人口データ取得は成功したが、データが空である場合に何も設定されないこと", async () => {
      vi.spyOn(resasApi, "getPopulationCompositionPerYear")
        .mockResolvedValueOnce(initialMockResponse)
        .mockResolvedValueOnce(emptyMockResponse);

      const { result } = renderHook(() => usePopulations());
      const prefCode: PrefCode = 1;

      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(prefCode);
      });
      const secondPrefCode: PrefCode = 2;
      await act(async () => {
        await result.current.handlePrefectureCheckBoxChange(secondPrefCode);
      });
      expect(result.current.populations.total).toEqual([
        { year: 2020, [prefCode]: 1000 },
      ]);
      expect(result.current.populations.young).toEqual([
        { year: 2020, [prefCode]: 200 },
      ]);
      expect(result.current.populations.workingAge).toEqual([
        { year: 2020, [prefCode]: 600 },
      ]);
      expect(result.current.populations.elderly).toEqual([
        { year: 2020, [prefCode]: 200 },
      ]);
    });
  });
});
