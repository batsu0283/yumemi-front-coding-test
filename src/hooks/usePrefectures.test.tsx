import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { type Prefecture, resasApi } from "../utils/resasApi";
import { usePrefectures } from "./usePrefectures";

describe("usePrefectures", () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("正常に都道府県データを取得し、状態が更新されること", async () => {
    vi.spyOn(resasApi, "getPrefectures").mockResolvedValue({
      message: null,
      result: mockPrefectures,
    });

    const { result } = renderHook(() => usePrefectures());
    waitFor(() => {
      expect(result.current.prefectures).toEqual(mockPrefectures);
      expect(result.current.isError).toBe(false);
    });
  });

  it("API 呼び出しが失敗した場合にisErrorがtrueに設定されること", async () => {
    // モックのエラー設定
    vi.spyOn(resasApi, "getPrefectures").mockRejectedValue(
      new Error("API error"),
    );

    const { result } = renderHook(() => usePrefectures());

    waitFor(() => {
      expect(result.current.prefectures).toEqual([]);
      expect(result.current.isError).toBe(true);
    });
  });
});
