import { useEffect, useState } from "react";
import { type Prefecture, resasApi } from "../utils/resasApi";

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const data = await resasApi.getPrefectures();
        setPrefectures(data.result);
      } catch {
        setIsError(true);
      }
    };
    fetchPrefectures();
  }, []);

  return { prefectures, isError };
};
