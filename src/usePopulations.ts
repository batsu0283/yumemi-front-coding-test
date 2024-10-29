import { useState } from "react";

type YearlyPopulation = {
  year: number;
  value: number;
};
type PopulationData = {
  label: "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
  data: YearlyPopulation[];
};
export type PopulationCompositionPerYearAPIResponce = {
  message: string | null;
  result: {
    data: PopulationData[];
  };
};

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

const defaultHeaders = {
  "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY as string,
} as const;

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
    const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${queryParams}`;
    const response = await fetch(url, {
      headers: defaultHeaders,
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} url: ${url}`);
      window.alert("データの取得に失敗しました");
      return;
    }
    const data: PopulationCompositionPerYearAPIResponce = await response.json();

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
    setCheckedPrefectures((prevCheckedPrefectures) =>
      updateCheckedPrefectures(prevCheckedPrefectures, prefCode),
    );
  };

  return { checkedPrefectures, populations, handlePrefectureCheckBox };
};
