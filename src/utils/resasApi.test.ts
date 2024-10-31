import { describe, expect, it, vi } from "vitest";
import { resasApi } from "./resasApi";

describe("resasApi", () => {
  const mockFetch = (data: unknown, status = 200) => {
    const responseBody =
      typeof data === "object" || Array.isArray(data)
        ? JSON.stringify(data)
        : "{}";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(responseBody, { status }),
    );
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getPrefectures", () => {
    const mockResponse = {
      message: null,
      result: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
    };
    it("fetchが正しく行えること", async () => {
      mockFetch(mockResponse);

      const response = await resasApi.getPrefectures();
      expect(response).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "https://opendata.resas-portal.go.jp/api/v1/prefectures",
        {
          headers: expect.any(Object),
        },
      );
    });

    it("APIがエラーだった場合に例外がthrowされること", async () => {
      mockFetch({}, 500);
      await expect(resasApi.getPrefectures()).rejects.toThrow(
        "HTTP error! status: 500",
      );
    });
  });

  describe("getPopulationCompositionPerYear", () => {
    const queryParams = new URLSearchParams({
      prefCode: "2",
      cityCode: "-", // 全市区町村
    });

    it("fetchが正しく行えること", async () => {
      const mockResponse = {
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
      mockFetch(mockResponse);
      const response = await resasApi.getPopulationCompositionPerYear(
        queryParams.toString(),
      );
      expect(response).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${queryParams.toString()}`,
        { headers: expect.any(Object) },
      );
    });

    it("APIがエラーだった場合に例外がthrowされること", async () => {
      mockFetch({}, 500);
      await expect(
        resasApi.getPopulationCompositionPerYear(queryParams.toString()),
      ).rejects.toThrow("HTTP error! status: 500");
    });
  });
});
