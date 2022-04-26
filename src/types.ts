export type Task = {
  id: number;
  title: string;
  createdAt: string;
  isComplete: boolean;
  isArchived?: boolean;
};

export enum TitleSortingType {
  Asc = "Asc",
  Desc = "Desc",
}

export enum DateSortingType {
  Asc = "Asc",
  Desc = "Desc",
}
