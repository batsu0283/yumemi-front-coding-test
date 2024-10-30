import { useState } from "react";
import {
  type PopulationCategoriesValue,
  populationCategories,
} from "../utils/constants";

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
