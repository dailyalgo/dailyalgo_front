import type { ProblemType } from "src/types/tag";

type ColorMap = {
  [key in ProblemType]: string;
};

const colorMap: ColorMap = {
  timeOut: "#FF4568",
  memoryExceed: "#9D68E7",
  error: "#60B068",
  solution: "#4B79D9",
  counterExample: "#28B7AE",
  whyWrong: "#FF7D45",
  whyRight: "#F6A929",
  etc: "#5B5B5B",
};

export default colorMap;
