import { defaultHeaders } from "./constants";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefectureAPIResponce = {
  message: string | null;
  result: Prefecture[];
};

export type YearlyPopulation = {
  year: number;
  value: number;
};
export type PopulationData = {
  label: "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
  data: YearlyPopulation[];
};
export type PopulationCompositionPerYearAPIResponce = {
  message: string | null;
  result: {
    data: PopulationData[];
  };
};

const execApi = async <T>(endpoint: string): Promise<T> => {
  const url = `https://opendata.resas-portal.go.jp/${endpoint}`;

  const response = await fetch(url, {
    headers: defaultHeaders,
  });
  if (!response.ok) {
    const message = `HTTP error! status: ${response.status} url: ${url}`;
    console.error(message);
    throw new Error(message);
  }
  const data: T = await response.json();
  return data;
};

export const resasApi = {
  getPrefectures: async () => {
    const res = await execApi<PrefectureAPIResponce>("api/v1/prefectures");
    return res;
  },

  getPopulationCompositionPerYear: async (queryString: string) => {
    const res = await execApi<PopulationCompositionPerYearAPIResponce>(
      `api/v1/population/composition/perYear?${queryString}`,
    );
    return res;
  },
};
