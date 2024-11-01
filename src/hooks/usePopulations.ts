import { useCallback, useState } from "react";
import type { PrefCode } from "../utils/constants";
import { type YearlyPopulation, resasApi } from "../utils/resasApi";

export type Populations = {
  total: PopulationGraphData[];
  young: PopulationGraphData[];
  workingAge: PopulationGraphData[];
  elderly: PopulationGraphData[];
};

type PopulationGraphData = {
  year: number;
} & {
  [K in PrefCode]?: number;
};

const updatePopulations = (
  prevTotalPopulations: PopulationGraphData[],
  totalData: YearlyPopulation[],
  prefCode: PrefCode,
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
  prevCheckedPrefectures: Set<PrefCode>,
  prefCode: PrefCode,
) => {
  const newCheckedPrefectures = new Set(prevCheckedPrefectures);
  if (newCheckedPrefectures.has(prefCode)) {
    newCheckedPrefectures.delete(prefCode);
  } else {
    newCheckedPrefectures.add(prefCode);
  }
  return newCheckedPrefectures;
};

export const usePopulations = () => {
  const [checkedPrefectures, setCheckedPrefectures] = useState<Set<PrefCode>>(
    new Set(),
  );
  const [populations, setPopulations] = useState<Populations>({
    total: [],
    young: [],
    workingAge: [],
    elderly: [],
  });

  const handlePrefectureCheckBoxChange = useCallback(
    async (prefCode: PrefCode) => {
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
        const responce = await resasApi.getPopulationCompositionPerYear(
          queryParams.toString(),
        );
        const data = responce.result.data;
        setPopulations((prevPopulations) => ({
          total: updatePopulations(
            prevPopulations.total,
            data[0] ? data[0].data : [],
            prefCode,
          ),
          young: updatePopulations(
            prevPopulations.young,
            data[1] ? data[1].data : [],
            prefCode,
          ),
          workingAge: updatePopulations(
            prevPopulations.workingAge,
            data[2] ? data[2].data : [],
            prefCode,
          ),
          elderly: updatePopulations(
            prevPopulations.elderly,
            data[3] ? data[3].data : [],
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
    },
    [populations],
  );

  return { checkedPrefectures, populations, handlePrefectureCheckBoxChange };
};
