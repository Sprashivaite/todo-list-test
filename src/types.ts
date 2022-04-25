export type Task = {
  id: number;
  title: string;
  createdAt: string;
  isComplete: boolean;
  isArchived?: boolean;
};

export enum TitleSortingType {
  TitleAsc = "TitleAsc",
  TitleDesc = "TitleDesc",
}

export enum DateSortingType {
  DateAsc = "DateAsc",
  DateDesc = "DateDesc",
}
