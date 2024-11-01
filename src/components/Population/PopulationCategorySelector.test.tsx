import { fireEvent, render, screen } from "@testing-library/react";
import { populationCategories } from "../../utils/constants";
import { PopulationCategorySelector } from "./PopulationCategorySelector";

describe("PopulationCategorySelector", () => {
  const mockHandlePopulationCategoryChange = vi.fn();
  beforeEach(() => {
    mockHandlePopulationCategoryChange.mockClear();
  });

  it("populationCategoriesがそれぞれ正しくレンダリングされる", () => {
    render(
      <PopulationCategorySelector
        selectedPopulationCategory=""
        handlePopulationCategoryChange={mockHandlePopulationCategoryChange}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    for (const category of populationCategories) {
      expect(screen.getByText(category.label)).toBeInTheDocument();
    }
  });

  it("オプションが選択されたときにhandlePopulationCategoryChangeが呼び出されること", () => {
    render(
      <PopulationCategorySelector
        selectedPopulationCategory=""
        handlePopulationCategoryChange={mockHandlePopulationCategoryChange}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, {
      target: { value: populationCategories[1].value },
    });

    expect(mockHandlePopulationCategoryChange).toHaveBeenCalledTimes(1);
    expect(mockHandlePopulationCategoryChange).toHaveBeenCalledWith(
      populationCategories[1].value,
    );
  });

  it("Snapshot", () => {
    const { container } = render(
      <PopulationCategorySelector
        selectedPopulationCategory=""
        handlePopulationCategoryChange={mockHandlePopulationCategoryChange}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
