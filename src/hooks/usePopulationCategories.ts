import { useState } from "react";
import { populationCategories } from "../App";

type PopulationCategoriesValue = (typeof populationCategories)[number]["value"];

const isPopulationCategory = (
  value: string,
): value is PopulationCategoriesValue => {
  return populationCategories.some((category) => category.value === value);
};

export const usePopulationCategories = () => {
  const [selectedPopulationCategory, setSelectedPopulationCategory] =
    useState<PopulationCategoriesValue>("total");

  const handlePopulationCategoryChange = (targetValue: string) => {
    if (!isPopulationCategory(targetValue)) return;
    setSelectedPopulationCategory(targetValue);
  };

  return { selectedPopulationCategory, handlePopulationCategoryChange };
};
