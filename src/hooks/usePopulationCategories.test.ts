import { act, renderHook } from "@testing-library/react";
import type { PopulationCategoriesValue } from "../utils/constants";
import { usePopulationCategories } from "./usePopulationCategories";

describe("usePopulationCategories", () => {
  it("初期状態がtotalであること", () => {
    const { result } = renderHook(() => usePopulationCategories());
    expect(result.current.selectedPopulationCategory).toBe("total");
  });

  it("カテゴリが正しく変更されること", () => {
    const { result } = renderHook(() => usePopulationCategories());
    const newCategory: PopulationCategoriesValue = "young";

    act(() => {
      result.current.handlePopulationCategoryChange(newCategory);
    });

    expect(result.current.selectedPopulationCategory).toBe(newCategory);
  });

  it("不正な値が渡された場合、カテゴリが変更されないこと", () => {
    const { result } = renderHook(() => usePopulationCategories());

    act(() => {
      result.current.handlePopulationCategoryChange("invalid_category");
    });

    expect(result.current.selectedPopulationCategory).toBe("total");
  });
});
