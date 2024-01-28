type ProblemType =
  | "timeOut"
  | "memoryExceed"
  | "error"
  | "solution"
  | "counterExample"
  | "whyWrong"
  | "whyRight"
  | "etc";

type TagItem = {
  id: string;
  label: string;
};

type PlatformType = "BOJ" | "SWEA" | "Programmers";

export type { TagItem, ProblemType };
