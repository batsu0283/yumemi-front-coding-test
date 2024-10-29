import { useState } from "react";
import { type YearlyPopulation, resasApi } from "../utils/resasApi";

type Populations = {
  total: PopulationGraphData[];
  young: PopulationGraphData[];
  workingAge: PopulationGraphData[];
  elderly: PopulationGraphData[];
};
type PopulationGraphData = {
  year: number;
  [prefCode: string]: number;
};

const updatePopulations = (
  prevTotalPopulations: PopulationGraphData[],
  totalData: YearlyPopulation[],
  prefCode: number,
): PopulationGraphData[] => {
  const newTotalPopulations = [...prevTotalPopulations];
  for (const { year, value } of totalData) {
    const existingEntry = newTotalPopulations.find(
      (entry) => entry.year === year,
    );
    if (existingEntry) {
      existingEntry[prefCode] = value;
    } else {
      newTotalPopulations.push({ year, [prefCode]: value });
    }
  }
  return newTotalPopulations;
};

const updateCheckedPrefectures = (
  prevCheckedPrefectures: Set<number>,
  prefCode: number,
): Set<number> => {
  const newCheckedPrefectures = new Set(prevCheckedPrefectures);
  if (newCheckedPrefectures.has(prefCode)) {
    newCheckedPrefectures.delete(prefCode);
  } else {
    newCheckedPrefectures.add(prefCode);
  }
  return newCheckedPrefectures;
};

export const usePopulations = () => {
  const [checkedPrefectures, setCheckedPrefectures] = useState<Set<number>>(
    new Set(),
  );
  const [populations, setPopulations] = useState<Populations>({
    total: [],
    young: [],
    workingAge: [],
    elderly: [],
  });

  const handlePrefectureCheckBox = async (prefCode: number) => {
    const isAlreadyFetched = populations.total[0]?.[prefCode];
    if (isAlreadyFetched) {
      setCheckedPrefectures((prevCheckedPrefectures) =>
        updateCheckedPrefectures(prevCheckedPrefectures, prefCode),
      );
      return;
    }
    const queryParams = new URLSearchParams({
      prefCode: prefCode.toString(),
      cityCode: "-", // 全市区町村
    });
    try {
      const data = await resasApi.getPopulationCompositionPerYear(
        queryParams.toString(),
      );
      setPopulations((prevPopulations) => ({
        total: updatePopulations(
          prevPopulations.total,
          data.result.data[0].data,
          prefCode,
        ),
        young: updatePopulations(
          prevPopulations.young,
          data.result.data[1].data,
          prefCode,
        ),
        workingAge: updatePopulations(
          prevPopulations.workingAge,
          data.result.data[2].data,
          prefCode,
        ),
        elderly: updatePopulations(
          prevPopulations.elderly,
          data.result.data[3].data,
          prefCode,
        ),
      }));
    } catch {
      window.alert("データの取得に失敗しました");
      return;
    }

    setCheckedPrefectures((prevCheckedPrefectures) =>
      updateCheckedPrefectures(prevCheckedPrefectures, prefCode),
    );
  };

  return { checkedPrefectures, populations, handlePrefectureCheckBox };
};
