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

export const prefectureColors = {
  1: "#FF6633", // 北海道
  2: "#FFB399", // 青森県
  3: "#FF33FF", // 岩手県
  4: "#FFFF99", // 宮城県
  5: "#00B3E6", // 秋田県
  6: "#E6B333", // 山形県
  7: "#3366E6", // 福島県
  8: "#999966", // 茨城県
  9: "#99FF99", // 栃木県
  10: "#B34D4D", // 群馬県
  11: "#80B300", // 埼玉県
  12: "#809900", // 千葉県
  13: "#E6B3B3", // 東京都
  14: "#6680B3", // 神奈川県
  15: "#66991A", // 新潟県
  16: "#FF99E6", // 富山県
  17: "#CCFF1A", // 石川県
  18: "#FF1A66", // 福井県
  19: "#E6331A", // 山梨県
  20: "#33FFCC", // 長野県
  21: "#66994D", // 岐阜県
  22: "#B366CC", // 静岡県
  23: "#4D8000", // 愛知県
  24: "#B33300", // 三重県
  25: "#CC80CC", // 滋賀県
  26: "#66664D", // 京都府
  27: "#991AFF", // 大阪府
  28: "#E666FF", // 兵庫県
  29: "#4DB3FF", // 奈良県
  30: "#1AB399", // 和歌山県
  31: "#E666B3", // 鳥取県
  32: "#33991A", // 島根県
  33: "#CC9999", // 岡山県
  34: "#B3B31A", // 広島県
  35: "#00E680", // 山口県
  36: "#4D8066", // 徳島県
  37: "#809980", // 香川県
  38: "#E6FF80", // 愛媛県
  39: "#1AFF33", // 高知県
  40: "#999933", // 福岡県
  41: "#FF3380", // 佐賀県
  42: "#CCCC00", // 長崎県
  43: "#66E64D", // 熊本県
  44: "#4D80CC", // 大分県
  45: "#9900B3", // 宮崎県
  46: "#E64D66", // 鹿児島県
  47: "#4DB380", // 沖縄県
} as const;

export type PrefectureColors = typeof prefectureColors;
export type PrefCode = keyof PrefectureColors;
export type PopulationCategoriesValue =
  (typeof populationCategories)[number]["value"];
