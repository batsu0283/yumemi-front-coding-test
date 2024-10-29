export const populationCategories = [
  {
    label: "総人口",
    value: "total",
  },
  {
    label: "年少人口",
    value: "young",
  },
  {
    label: "生産年齢人口",
    value: "workingAge",
  },
  {
    label: "老年人口",
    value: "elderly",
  },
] as const;

export const defaultHeaders = {
  "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY as string,
} as const;
