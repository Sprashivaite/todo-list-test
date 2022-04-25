export type Task = {
  id: number;
  title: string;
  createdAt: string;
  isComplete: boolean;
  isArchived?: boolean;
};

export enum SortingType {
  TitleAsc = "TitleAsc",
  TitleDesc = "TitleDesc",
  DateAsc = "DateAsc",
  DateDesc = "DateDesc",
}
