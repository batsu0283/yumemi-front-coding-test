import { useEffect, useState } from "react";

type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefectureAPIResponce = {
  message: string | null;
  result: Prefecture[];
};

const defaultHeaders = {
  "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY as string,
};
export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchPrefectures = async () => {
      const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

      const response = await fetch(url, {
        headers: defaultHeaders,
      });
      const data: PrefectureAPIResponce = await response.json();
      setPrefectures(data.result);
    };
    fetchPrefectures();
  }, []);

  return { prefectures };
};
